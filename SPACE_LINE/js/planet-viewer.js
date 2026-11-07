import * as THREE from 'three';

// 既存の地点番号と球面上の位置を維持します。
function directions() {
  const point=(i,n)=>{const y=1-2*(i+.5)/n,a=i*Math.PI*(3-Math.sqrt(5));return new THREE.Vector3(Math.cos(a)*Math.sqrt(1-y*y),y,Math.sin(a)*Math.sqrt(1-y*y));};
  const result=Array.from({length:32},(_,i)=>point(i,32));
  const candidates=Array.from({length:1024},(_,i)=>point(i,1024));
  while(result.length<64){let best,dist=-1;for(const p of candidates){const d=Math.min(...result.map(q=>q.distanceToSquared(p)));if(d>dist){dist=d;best=p;}}result.push(best.clone());}
  return result;
}
const points=directions();
export function createViewer(host, planetId, onTarget, onStatus) {
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(40,1,.1,100);camera.position.z=4;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.domElement.className='planet-canvas';renderer.domElement.setAttribute('aria-label','ドラッグして星を回す');host.append(renderer.domElement);
  const group=new THREE.Group();scene.add(group);
  const material=new THREE.MeshStandardMaterial({color:0xc9ad92,roughness:1});
  group.add(new THREE.Mesh(new THREE.SphereGeometry(1,48,32),material));
  scene.add(new THREE.AmbientLight(0xffffff,2));const sun=new THREE.DirectionalLight(0xffffff,2.3);sun.position.set(-3,3,5);scene.add(sun);
  if(planetId==='saturn'){
    const ring=new THREE.Mesh(new THREE.RingGeometry(1.25,1.8,80),new THREE.MeshStandardMaterial({color:0xc5aa7b,side:THREE.DoubleSide,transparent:true,opacity:.65}));ring.rotation.x=1.1;group.add(ring);
  }
  const marker=document.createElement('div');marker.className='target-marker';marker.setAttribute('aria-hidden','true');host.append(marker);
  let disposed=false,active=-1,drag=null,snap=null,records=[],raf,texture;
  const loader=new THREE.TextureLoader();onStatus('星の画像を読み込んでいます…');
  loader.load(`textures/mobile/${planetId}.webp`,t=>{if(disposed){t.dispose();return;}texture=t;t.colorSpace=THREE.SRGBColorSpace;material.map=t;material.color.set(0xffffff);material.needsUpdate=true;onStatus('星をドラッグして、場所を選ぼう');},undefined,()=>{if(!disposed)onStatus('画像を読み込めませんでした。場所は選べます。');});
  function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.position.z=Math.max(3.8,2.8/camera.aspect);camera.updateProjectionMatrix();}
  const ro=new ResizeObserver(resize);ro.observe(host);resize();
  function detail(i){const slotId=`${planetId}-${String(i+1).padStart(2,'0')}`;return {planetId,slotId,record:records.find(r=>r.slotId===slotId)};}
  function choose(){let best=-1,score=.82;points.forEach((p,i)=>{const z=p.clone().applyQuaternion(group.quaternion).z;if(z>score){score=z;best=i;}});return best;}
  function emit(i){if(i!==active){active=i;onTarget(i<0?null:detail(i));}}
  function align(i){const world=points[i].clone().applyQuaternion(group.quaternion);snap=new THREE.Quaternion().setFromUnitVectors(world,new THREE.Vector3(0,0,1)).multiply(group.quaternion);}
  const el=renderer.domElement;
  el.addEventListener('pointerdown',e=>{if(drag)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};snap=null;el.setPointerCapture(e.pointerId);});
  el.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;const q=new THREE.Quaternion().setFromEuler(new THREE.Euler(dy*.008,dx*.008,0));group.quaternion.premultiply(q);});
  const end=e=>{if(!drag||e.pointerId!==drag.id)return;drag=null;const i=choose();if(i>=0)align(i);};
  el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
  el.tabIndex=0;el.addEventListener('keydown',e=>{const d={ArrowLeft:[0,-.15],ArrowRight:[0,.15],ArrowUp:[-.15,0],ArrowDown:[.15,0]}[e.key];if(d){e.preventDefault();snap=null;group.quaternion.premultiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(d[0],d[1],0)));}});
  let previous=performance.now();
  function frame(now){if(disposed)return;const dt=Math.min((now-previous)/1000,.1);previous=now;if(snap){group.quaternion.slerp(snap,1-Math.exp(-14*dt));if(group.quaternion.angleTo(snap)<.002){group.quaternion.copy(snap);snap=null;}}
    const i=choose();emit(i);marker.hidden=i<0;if(i>=0){const v=points[i].clone().applyQuaternion(group.quaternion).multiplyScalar(1.015).project(camera);marker.style.left=`${(v.x+1)*host.clientWidth/2}px`;marker.style.top=`${(1-v.y)*host.clientHeight/2}px`;marker.classList.toggle('occupied',!!detail(i).record);}
    renderer.render(scene,camera);raf=requestAnimationFrame(frame);
  }raf=requestAnimationFrame(frame);
  return {setRecords(value){records=value;const i=active;active=-1;if(i>=0)emit(i);},findFree(){const free=points.map((_,i)=>i).filter(i=>!detail(i).record);if(!free.length)return false;const i=free.find(i=>i>active)??free[0];align(i);return true;},dispose(){disposed=true;cancelAnimationFrame(raf);ro.disconnect();scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});texture?.dispose();renderer.dispose();renderer.forceContextLoss();el.remove();marker.remove();}};
}
