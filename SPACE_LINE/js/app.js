import { createPlanetQrPoster } from "./planet-qr-poster.js?v=91";

const coordinates = [{"lat": 75.638, "lon": 0.0}, {"lat": 64.992, "lon": 137.508}, {"lat": 57.538, "lon": -84.984}, {"lat": 51.375, "lon": 52.523}, {"lat": 45.951, "lon": -169.969}, {"lat": 41.014, "lon": -32.461}, {"lat": 36.424, "lon": 105.047}, {"lat": 32.09, "lon": -117.446}, {"lat": 27.953, "lon": 20.062}, {"lat": 23.969, "lon": 157.57}, {"lat": 20.106, "lon": -64.922}, {"lat": 16.335, "lon": 72.585}, {"lat": 12.636, "lon": -149.907}, {"lat": 8.989, "lon": -12.399}, {"lat": 5.379, "lon": 125.109}, {"lat": 1.791, "lon": -97.384}, {"lat": -1.791, "lon": 40.124}, {"lat": -5.379, "lon": 177.632}, {"lat": -8.989, "lon": -44.86}, {"lat": -12.636, "lon": 92.648}, {"lat": -16.335, "lon": -129.845}, {"lat": -20.106, "lon": 7.663}, {"lat": -23.969, "lon": 145.171}, {"lat": -27.953, "lon": -77.321}, {"lat": -32.09, "lon": 60.186}, {"lat": -36.424, "lon": -162.306}, {"lat": -41.014, "lon": -24.798}, {"lat": -45.951, "lon": 112.71}, {"lat": -51.375, "lon": -109.783}, {"lat": -57.538, "lon": 27.725}, {"lat": -64.992, "lon": 165.233}, {"lat": -75.638, "lon": -57.259}, {"lat": 69.159, "lon": -142.244}, {"lat": -67.639, "lon": 85.148}, {"lat": -50.752, "lon": -62.95}, {"lat": 10.636, "lon": 100.738}, {"lat": 0.28, "lon": 151.452}, {"lat": 51.645, "lon": 5.854}, {"lat": 17.094, "lon": -39.697}, {"lat": -16.51, "lon": -17.399}, {"lat": -10.067, "lon": -157.834}, {"lat": -27.511, "lon": -104.192}, {"lat": -27.637, "lon": 33.315}, {"lat": 28.27, "lon": -90.411}, {"lat": 28.143, "lon": 47.096}, {"lat": -27.763, "lon": 170.823}, {"lat": 28.398, "lon": 132.081}, {"lat": 6.673, "lon": -126.491}, {"lat": -5.998, "lon": -68.113}, {"lat": 21.242, "lon": -172.469}, {"lat": -20.643, "lon": 115.373}, {"lat": 6.561, "lon": 11.017}, {"lat": -6.11, "lon": 69.394}, {"lat": 69.476, "lon": 80.248}, {"lat": -62.343, "lon": -145.008}, {"lat": -35.25, "lon": 88.766}, {"lat": 40.792, "lon": -141.126}, {"lat": 28.525, "lon": -5.427}, {"lat": 44.443, "lon": 158.688}, {"lat": 36.077, "lon": 76.63}, {"lat": -27.89, "lon": -51.669}, {"lat": -43.664, "lon": 144.216}, {"lat": -35.387, "lon": -133.727}, {"lat": 39.186, "lon": -68.54}, {"lat": -43.51, "lon": 6.708}, {"lat": 58.92, "lon": -41.933}, {"lat": -85.613, "lon": 132.935}, {"lat": -8.028, "lon": -112.974}, {"lat": 54.245, "lon": -119.255}, {"lat": 52.007, "lon": 90.839}, {"lat": -60.7, "lon": -27.562}, {"lat": -53.298, "lon": 62.158}, {"lat": 8.593, "lon": 55.877}, {"lat": 85.613, "lon": 137.508}, {"lat": -11.32, "lon": -85.248}, {"lat": 11.891, "lon": 28.152}, {"lat": 8.706, "lon": -81.63}, {"lat": -48.337, "lon": 171.941}, {"lat": 5.436, "lon": -53.905}, {"lat": -8.141, "lon": 24.534}, {"lat": -4.874, "lon": -3.191}, {"lat": -21.964, "lon": -172.042}, {"lat": 22.69, "lon": -22.562}, {"lat": -22.085, "lon": -34.534}, {"lat": 22.569, "lon": 114.946}, {"lat": 49.186, "lon": 130.963}, {"lat": -42.743, "lon": 39.169}, {"lat": 15.927, "lon": -104.62}, {"lat": 64.338, "lon": 35.388}, {"lat": -4.761, "lon": -140.699}, {"lat": -1.623, "lon": -30.916}, {"lat": 43.51, "lon": -96.266}, {"lat": -73.732, "lon": 40.287}, {"lat": 26.007, "lon": -135.272}, {"lat": -62.829, "lon": 130.008}, {"lat": -11.434, "lon": 52.259}, {"lat": 5.323, "lon": 83.603}, {"lat": 9.386, "lon": 173.323}, {"lat": 72.573, "lon": -77.321}, {"lat": -66.49, "lon": -104.883}, {"lat": 27.007, "lon": -155.334}, {"lat": 41.386, "lon": 28.843}, {"lat": 64.081, "lon": 172.896}, {"lat": 4.649, "lon": -171.351}, {"lat": -8.819, "lon": 129.581}, {"lat": -40.645, "lon": -85.939}, {"lat": 30.583, "lon": -45.551}, {"lat": -29.935, "lon": -11.545}, {"lat": -4.088, "lon": 114.255}, {"lat": 15.114, "lon": 137.935}, {"lat": -14.535, "lon": 164.969}, {"lat": 23.542, "lon": 94.884}, {"lat": -22.933, "lon": -151.98}, {"lat": -43.048, "lon": -45.815}, {"lat": 43.819, "lon": -11.281}, {"lat": 53.298, "lon": -151.716}, {"lat": -18.741, "lon": 75.248}, {"lat": -68.235, "lon": 0.163}, {"lat": 46.355, "lon": -51.405}, {"lat": 33.488, "lon": 169.278}, {"lat": -55.608, "lon": -87.748}, {"lat": -14.651, "lon": -57.523}, {"lat": 15.23, "lon": 0.427}, {"lat": -48.845, "lon": -135.536}, {"lat": -48.675, "lon": 86.957}, {"lat": -32.819, "lon": 133.626}, {"lat": -51.286, "lon": -10.427}, {"lat": 61.628, "lon": 107.974}];
function spotCoordinates(slotId) {
  const n = Number(String(slotId).split('-').at(-1)) - 1;
  return coordinates[n] || coordinates[0];
}
function coordinateText(slotId) {
  const {lat, lon} = spotCoordinates(slotId);
  return `${Math.abs(lat).toFixed(3)}° ${lat < 0 ? 'S' : 'N'} / ${Math.abs(lon).toFixed(3)}° ${lon < 0 ? 'W' : 'E'}`;
}
function voyageTime(createdAt) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return '2127 —';
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Tokyo',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));
  return `2127.${parts.month}.${parts.day}  ${parts.hour}:${parts.minute}`;
}
import { resolveRoute } from "./flow.js?v=20261107-5";
const $ = (id) => document.getElementById(id);
const names = {
  mercury: "水星",
  venus: "金星",
  moon: "月",
  mars: "火星",
  jupiter: "木星",
  saturn: "土星",
  uranus: "天王星",
  neptune: "海王星",
};
const avatarNames=["宇宙飛行士・ブルー","宇宙飛行士・グリーン","宇宙飛行士・オレンジ","宇宙飛行士・パープル","エイリアン","宇宙ウサギ","宇宙イヌ","宇宙ネコ","ロボット","クラゲ","タコ","キツネ","土星の子","ほのお","UFO","彗星","星くま","月のフクロウ","宇宙クジラ","探査ドローン","星の旅人","ロケット", "おやすみの月", "月面ローバー", "人工衛星", "搭乗券", "銀河カタツムリ", "太陽", "空飛ぶ円盤", "輪っかの土星", "流星", "宇宙グローブ", "オーロラ", "望遠鏡", "居眠り隕石", "星くじら", "星の旅人", "整備士タコ", "宇宙ブイ", "宇宙クリスタル", "出発のベル","月うさぎ通信士", "犬の船長", "航海士ネコ", "星からの旅人", "ロボット船員", "星の旅行者", "整備士キツネ", "天文学者フクロウ", "UFOパイロット", "土星の子", "青い彗星", "おやすみの月", "月面ローバー", "整備士タコ", "星くじら", "ロケットの乗客"];
const avatarIds=Array.from({ length: 16 }, (_, i) => 42 + i);
const currentAvatarId = (id) => {
  const value = Number(id);
  return value >= 1 && value <= 4 ? value + 4 : Number.isInteger(value) && value >= 5 && value <= avatarNames.length ? value : avatarIds[0];
};
const displayNames = { ...names, earth: "地球" };
const key = "space-line-v2";
let planetViewer = null, viewerRequest = 0;
let selectedPlanet = "moon";
let records = [],
  shared = false,
  ready = false,
  profile = null,
  myRecord = null,
  posterUrl = null;
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const uuid = () =>
  globalThis.crypto?.randomUUID?.() ||
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 3) | 8).toString(16);
  });
let clientId = localStorage.getItem(key + "-client");
if (!clientId) {
  clientId = uuid();
  localStorage.setItem(key + "-client", clientId);
}
try {
  profile = JSON.parse(sessionStorage.getItem(key + "-profile"));
} catch {}
if (profile) profile.avatarId = currentAvatarId(profile.avatarId);
const pendingMessage = () => !!myRecord && localStorage.getItem(key + '-pending-record') === myRecord.id;
let restoringRoute = false;
function rememberRoute(route, replace = false) {
  const value = { route, planetId: selectedPlanet, participant: clientId };
  sessionStorage.setItem(key + '-route', JSON.stringify(value));
  const same = history.state?.spaceLine?.route === route && history.state?.spaceLine?.planetId === selectedPlanet && history.state?.spaceLine?.participant === clientId;
  if (replace || restoringRoute || !history.state?.spaceLine || same) history.replaceState({ spaceLine: value }, '');
  else history.pushState({ spaceLine: value }, '');
}
async function restoreRoute(value) {
  const requested = value?.participant === clientId ? value.route : 'form';
  const route = resolveRoute(requested, { hasProfile: !!profile?.username, hasRecord: !!myRecord, pending: pendingMessage() });
  if (names[value?.planetId]) selectedPlanet = value.planetId;
  restoringRoute = true;
  if ($('dialog').open) $('dialog').close();
  try {
    if (route === 'picker') explore();
    else if (route === 'planet') await enterPlanet(selectedPlanet);
    else if (route === 'overview') await exploreOverview(true);
    else if (route === 'message') writeMessage();
    else if (route === 'poster') await showPoster();
    else registration();
  } finally { restoringRoute = false; }
}
window.addEventListener('popstate', e => { void restoreRoute(e.state?.spaceLine); });
function message(text) {
  $("dialog").innerHTML =
    `<p>${escape(text)}</p><button id="close">閉じる</button>`;
  $("close").onclick = () => $("dialog").close();
  $("dialog").showModal();
}

async function connect() {
  try {
    if (location.hostname.endsWith(".github.io")) throw Error("Static hosting");
    const response = await fetch("./api/state", {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw Error();
    const data = await response.json();
    if (data.service !== "space-line") throw Error();
    shared = true;
    records = data.records;
    $("mode").textContent = "共有モード · 2秒ごとに更新";
    setInterval(refresh, 2000);
  } catch {
    try {
      records = JSON.parse(localStorage.getItem(key + "-records")) || [];
    } catch {
      records = [];
    }
    $("mode").textContent = "";
    window.addEventListener("storage", () => {
      try {
        records = JSON.parse(localStorage.getItem(key + "-records")) || [];
        renderRecords();
      } catch {}
    });
  }
  myRecord =
    records.find((r) => r.id === localStorage.getItem(key + "-record")) || null;
  renderRecords();
}
async function refresh() {
  try {
    const response = await fetch("./api/state", {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw Error();
    const data = await response.json();
    records = data.records;
    renderRecords();
    $("mode").textContent = "共有モード · 2秒ごとに更新";
  } catch {
    $("mode").textContent = "接続が不安定です · 再接続中";
  }
}
function renderRecords() {
  for (const record of records) record.avatarId = currentAvatarId(record.avatarId);
  if (myRecord) myRecord.avatarId = currentAvatarId(myRecord.avatarId);
  window.SpaceSolar?.setRecords(records);
  planetViewer?.setRecords(records);
  for (const [id, name] of Object.entries(names)) {
    const btn = document.querySelector(`[data-planet="${id}"]`);
    if (btn) {
      const free = 128 - records.filter((r) => r.planetId === id).length;
      btn.textContent = name;
    }
  }
}
window.addEventListener("space-ready", () => {
  ready = true;
  renderRecords();
  const start = $("start");
  if (start) {
    start.disabled = false;
    start.textContent = "星を選ぶ";
  }
});
$("planet-nav").innerHTML = Object.entries(names)
  .map(([id, name]) => `<button data-planet="${id}">${name}</button>`)
  .join("");
$("planet-nav").onclick = (e) => {
  const id = e.target.closest("[data-planet]")?.dataset.planet;
  if (id) {
    if (myRecord) { selectedPlanet=id; window.SpaceSolar?.focus(id); }
    else enterPlanet(id);
    document
      .querySelectorAll("[data-planet]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.planet === id),
        ),
      );
  }
};
$("overview").onclick = () => exploreOverview(true);
$("routes").onclick = () => {
  const show = $("routes").getAttribute("aria-pressed") !== "true";
  $("routes").setAttribute("aria-pressed", String(show));
  $("routes").textContent = show ? "航路を隠す" : "航路を表示";
  window.SpaceSolar?.setRoutes(show);
  if (show) exploreOverview(true);
};
$("my-poster").onclick = () => showPoster();

let solarLoading;
function setView(view) {
  viewerRequest++;
  $("loader").hidden = true;
  planetViewer?.dispose();
  planetViewer = null;
  document.body.dataset.view = view;
  window.scrollTo(0, 0);
  $("planet-nav").hidden = view !== "space";
  $("guide").hidden = view !== "space";
}
async function ensureSolar() {
  if (ready) return;
  if (!solarLoading) {
    $("loader").hidden = false;
    solarLoading = new Promise((resolve, reject) => {
      window.addEventListener("space-ready", resolve, { once: true });
      window.addEventListener(
        "space-error",
        () =>
          reject(Error("3Dを表示できません。別のブラウザでお試しください。")),
        { once: true },
      );
      import("../solar/solar.bundle.js?v=20261115-84").catch(reject);
    });
  }
  await solarLoading;
}
async function exploreOverview(overview = true, planetId = selectedPlanet) {
  if(pendingMessage()) return writeMessage();
  rememberRoute(overview || myRecord ? 'overview' : 'planet');
  setView("space");
  const request=viewerRequest;
  if(!ready) $("loader").hidden=false;
  $("panel").innerHTML = "";
  $("panel").className = "panel";
  $("my-poster").hidden = !myRecord;
  document.body.dataset.browseOnly=String(!!myRecord);
  $("planet-nav").hidden=false;
  $("space-checkin").hidden=true;
  $("space-find-free").hidden=true;
  $("back-form").textContent=myRecord?'もう一度体験する':'星を選び直す';
  document.querySelector(".space-target-caption small").textContent=myRecord?"SOLAR SYSTEM":"LANDING POINT";
  $("space-target-name").textContent=myRecord?'太陽系を見渡す':'星を選んで、近づこう';
  try {
    await ensureSolar();
    if(request!==viewerRequest)return;
    $("loader").hidden=true;
    window.SpaceSolar?.setBrowseOnly(!!myRecord);
    if (overview || myRecord) window.SpaceSolar?.overview();
    else window.SpaceSolar?.focus(planetId);
    renderRecords();
  } catch (err) {
    if(request!==viewerRequest)return;
    if(myRecord || overview){
      $("panel").innerHTML='<div class="overview-fallback"><h2>太陽系</h2><p>この端末では3Dを表示できません。</p><div class="overview-planets">'+Object.entries(names).map(([id,name])=>`<figure><img src="assets/planet-preview-hd/${id}.webp" alt=""><figcaption>${name}</figcaption></figure>`).join('')+'</div></div>';
    }else enterFlatPlanet(planetId);
    if ($("loader")) $("loader").hidden = true;
    console.warn(err.message);
  }
}
const planetCopy = {
  mercury: "太陽にいちばん近い、小さな岩石の星。", venus: "厚い雲に包まれた、明るく輝く星。",
  moon: "地球のすぐそばから、宇宙の旅を。", mars: "赤い大地に、自分だけの足跡を。",
  jupiter: "縞模様が広がる、太陽系最大の惑星。", saturn: "美しい環を眺める、遠い旅へ。",
  uranus: "淡い青緑に包まれた、静かな氷の惑星。", neptune: "深い青の、その先へ。"
};
function explore() {
  if(myRecord) return exploreOverview(true);
  rememberRoute("picker");
  setView("picker");
  $("panel").className="planet-picker";
  const ids=Object.keys(names);
  let index=Math.max(0,ids.indexOf(selectedPlanet)),drag=null;
  $("panel").innerHTML=`<div class="picker-heading"><span class="section-code">01 / DESTINATION</span><h1>行き先を選ぶ</h1></div>
    <div class="destination-stage" tabindex="0" aria-label="左右にスワイプして星を選択"><div class="stage-orbit" aria-hidden="true"></div>
    ${ids.map((id,i)=>`<button type="button" class="destination-card" data-id="${id}" aria-label="${names[id]}を選ぶ"><div class="portal-outline" aria-hidden="true"></div><span class="destination-no">SL / ${String(i+1).padStart(2,'0')}</span><div class="destination-world ${id==='saturn'?'saturn-world':''}"><img src="assets/planet-preview-hd/${id}.webp" alt="" draggable="false" width="768" height="768" decoding="async"></div><span class="destination-en">${id.toUpperCase()}</span><strong>${names[id]}</strong></button>`).join('')}</div>
    <div class="destination-info"><span id="planet-count"></span><p id="destination-copy"></p></div>
    <div class="destination-dock"><button id="previous-planet" aria-label="前の星">←</button><button id="enter-planet" class="primary">この星へ進む <span aria-hidden="true">↗</span></button><button id="next-planet" aria-label="次の星">→</button></div>
    <div class="destination-pagination" aria-label="星の一覧">${ids.map(id=>`<button data-jump="${id}" aria-label="${names[id]}"></button>`).join('')}</div>
    <div class="picker-secondary"><button id="solar-overview" class="quiet">宇宙を見渡す</button>${myRecord?'<button id="picker-poster" class="quiet">自分のポスター</button>':''}<button id="picker-back" class="quiet">戻る</button></div>`;
  const stage=document.querySelector('.destination-stage'),cards=[...document.querySelectorAll('.destination-card')];
  function move(next){index=Math.max(0,Math.min(ids.length-1,next));selectedPlanet=ids[index];
    rememberRoute("picker",true);
    cards.forEach((card,i)=>{const offset=i-index;card.style.setProperty('--offset',offset);card.style.setProperty('--distance',Math.abs(offset));card.classList.toggle('selected',i===index);card.hidden=Math.abs(offset)>2;card.tabIndex=i===index?0:-1;card.setAttribute('aria-pressed',String(i===index));});
    document.querySelectorAll('[data-jump]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.jump===selectedPlanet)));
    $("planet-count").textContent=`${String(index+1).padStart(2,'0')} — ${String(ids.length).padStart(2,'0')}`;$("destination-copy").textContent=planetCopy[selectedPlanet];
    $("previous-planet").disabled=index===0;$("next-planet").disabled=index===ids.length-1;
  }
  let suppressClick=false;
  stage.addEventListener('pointerdown',e=>{if(e.button!==0||drag)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,card:e.target.closest("[data-id]")?.dataset.id};suppressClick=false;stage.setPointerCapture(e.pointerId);stage.classList.add('dragging');});
  stage.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>8)suppressClick=true;stage.style.setProperty('--drag',`${Math.max(-100,Math.min(100,dx))}px`);});
  const finish=e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y,card=drag.card;drag=null;stage.style.setProperty('--drag','0px');stage.classList.remove('dragging');if(e.type!=='pointercancel'&&Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy))move(index+(dx<0?1:-1));else if(e.type!=='pointercancel'&&Math.abs(dx)<8&&Math.abs(dy)<8&&card)move(ids.indexOf(card));};
  stage.addEventListener('pointerup',finish);stage.addEventListener('pointercancel',finish);
  stage.addEventListener('click',e=>{if(suppressClick){suppressClick=false;return;}const card=e.target.closest('[data-id]');if(card)move(ids.indexOf(card.dataset.id));});
  stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(index+(e.key==='ArrowRight'?1:-1));}});
  let lastWheel=0;stage.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.preventDefault();if(performance.now()-lastWheel>400){move(index+(e.deltaX>0?1:-1));lastWheel=performance.now();}}},{passive:false});
  document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>move(ids.indexOf(b.dataset.jump)));
  $("previous-planet").onclick=()=>move(index-1);$("next-planet").onclick=()=>move(index+1);
  $("enter-planet").onclick=()=>enterPlanet(selectedPlanet);$("solar-overview").onclick=()=>exploreOverview(true);
  $("picker-back").onclick=registration;if($("picker-poster"))$("picker-poster").onclick=showPoster;move(index);
}
async function enterPlanet(id){selectedPlanet=id;await exploreOverview(false,id);}
async function enterFlatPlanet(id) {
  if(myRecord)return exploreOverview(true);
  rememberRoute("planet");
  selectedPlanet=id;setView("inspect");const request=viewerRequest;
  $("panel").className="planet-inspector";
  $("panel").innerHTML=`<div class="inspect-heading"><small>${id.toUpperCase()}</small><h1>${names[id]}</h1></div><div id="planet-stage"><div class="aim-guide" aria-hidden="true"></div></div><div class="inspect-actions"><p id="planet-status" class="hint" role="status">星を準備しています…</p><strong id="target-name" aria-live="polite">場所を探しています</strong><button id="choose-target" class="primary" disabled>ここにチェックイン</button><button id="find-free" class="quiet" hidden disabled>空き地点を探す</button><button id="choose-another" class="quiet">星を選び直す</button></div>`;
  $("choose-another").onclick=explore;
  let target=null;
  try {
    const createViewer=createFlatViewer;
    if(request!==viewerRequest)return;
    const mount=(factory)=>factory($("planet-stage"),id,value=>{target=value;$("target-name").textContent=value?`${names[id]} · ${coordinateText(value.slotId)}${value.record?' · '+value.record.username:''}`:'星を回して場所を探そう';$("find-free").hidden=!value?.record;$("choose-target").hidden=!!value?.record;$("choose-target").disabled=!value;$("choose-target").textContent=value?.record?'メッセージを見る':'ここにチェックイン';},text=>{$("planet-status").textContent=text;});
    try{planetViewer=mount(createViewer);}catch(error){console.warn("3D unavailable; using point selector",error);planetViewer=mount(createFlatViewer);}
    planetViewer.setRecords(records);$("find-free").disabled=false;
    $("choose-target").onclick=()=>{if(target)window.dispatchEvent(new CustomEvent('space-spot',{detail:target}));};
    $("find-free").onclick=()=>{if(!planetViewer.findFree())message('この星は満員です。別の星を選んでください。');};
  }catch(err){if(request!==viewerRequest)return;$("planet-status").textContent='読み込めませんでした。再試行してください。';$("choose-target").disabled=false;$("choose-target").textContent='再試行';$("choose-target").onclick=()=>enterFlatPlanet(id);console.error(err);}
}
function createFlatViewer(host,id,onTarget,onStatus){
  host.innerHTML=`<img src="assets/planet-preview-hd/${id}.webp" alt="${names[id]}" style="height:75%;max-width:100%;object-fit:contain;display:block;margin:auto"><div class="picker-controls"><button id="spot-prev" aria-label="前の地点">←</button><span>地点を選択</span><button id="spot-next" aria-label="次の地点">→</button></div>`;
  let index=0,rows=[];
  const detail=()=>{const slotId=`${id}-${String(index+1).padStart(2,'0')}`;return {planetId:id,slotId,record:rows.find(r=>r.slotId===slotId)};};
  const update=()=>onTarget(detail());
  $("spot-prev").onclick=()=>{index=(index+127)%128;update();};
  $("spot-next").onclick=()=>{index=(index+1)%128;update();};
  onStatus('この端末では矢印で地点を選べます。');
  return {setRecords(value){rows=value;update();},findFree(){for(let n=1;n<=128;n++){const i=(index+n)%128;if(!rows.some(r=>r.slotId===`${id}-${String(i+1).padStart(2,'0')}`)){index=i;update();return true;}}return false;},dispose(){host.replaceChildren();}};
}
$("back-form").onclick = () => myRecord ? confirmNewParticipant() : explore();
let spaceTarget=null;
window.addEventListener('space-target',e=>{
  spaceTarget=myRecord?null:e.detail;const target=spaceTarget;
  if(myRecord){$("space-checkin").hidden=true;$("space-find-free").hidden=true;return;}
  $("space-target-name").textContent=target?`${names[target.planetId]} / ${coordinateText(target.slotId)}`:'星を選んで、近づこう';
  $("space-checkin").hidden=!target || !!target.record;$("space-checkin").textContent='ここにチェックイン';
  $("space-find-free").hidden=!target?.record;
});
$("space-checkin").onclick=()=>{if(spaceTarget)window.dispatchEvent(new CustomEvent('space-spot',{detail:spaceTarget}));};
$("space-find-free").onclick=()=>{if(!window.SpaceSolar?.findFree())message('この星は満員です。別の星を選んでください。');};

function newParticipant() {
  clientId = uuid();
  localStorage.setItem(key + "-client", clientId);
  if(myRecord)sessionStorage.removeItem(key + "-message-" + myRecord.id);
  localStorage.removeItem(key + "-pending-record");
  localStorage.removeItem(key + "-record");
  sessionStorage.removeItem(key + "-profile");
  profile = null;
  myRecord = null;
  posterUrl = null;
  selectedPlanet="moon";
  window.SpaceSolar?.setBrowseOnly(false);
  document.body.dataset.browseOnly="false";
  restoringRoute=true;registration();restoringRoute=false;
}
function confirmNewParticipant() {
  $("dialog").innerHTML =
    '<h2>もう一度体験しますか？</h2><p>入力画面からやり直します。これまでのチェックインは残ります。</p><div class="actions"><button id="confirm-new" class="primary">もう一度体験する</button><button id="cancel-new">戻る</button></div>';
  $("cancel-new").onclick = () => $("dialog").close();
  $("confirm-new").onclick = () => {
    $("dialog").close();
    newParticipant();
  };
  $("dialog").showModal();
}
const visitDates = ["2127-01-23", "2127-01-24"];

function registration() {
  rememberRoute("form");
  setView("form");
  $("panel").className = "panel";
  $("panel").innerHTML =
    `<h1 class="brand-heading"><img src="assets/space-line-logo.png" width="2040" height="186" alt="SPACE LINE"></h1><p class="brand-subtitle">22世紀の宇宙交通</p>
  <form id="form"><label for="nickname">ニックネーム *</label><input id="nickname" required maxlength="40" placeholder="例：そら" autocomplete="nickname">
  <fieldset class="visit-days"><legend>来場予約日 *</legend>
    ${visitDates.map(date => `<label><input type="radio" name="visitDate" value="${date}" required ${profile?.visitDate === date ? "checked" : ""}>2127年1月${date.slice(-2)}日</label>`).join("")}
  </fieldset><p class="hint">当日は会場にお並びください。お並びいただいた順にご案内します。</p>
  <label>アバター *</label><div class="avatars">${avatarIds.map((i) => `<label><img src="assets/avatar-${i}.svg" alt="${avatarNames[i-1]}"><input type="radio" name="avatar" value="${i}" ${i === (avatarIds.includes(profile?.avatarId) ? profile.avatarId : avatarIds[0]) ? "checked" : ""}></label>`).join("")}</div>
  <label for="region">出発地（任意）</label><input id="region" maxlength="30" placeholder="例：東京 / 大阪">
  <p class="hint">ニックネーム・アバター・メッセージは公開されます。</p>
  <div class="actions"><button id="start" class="primary">星を選ぶ</button></div></form>
  `;
  if (myRecord) {
    $("panel").innerHTML =
      `<h1>おかえりなさい。</h1><p>${escape(myRecord.username)}さんの旅の記録が残っています。</p><div class="actions"><button id="resume-poster" class="primary">${pendingMessage()?"続きからポスターをつくる":"作成済みのポスターを見る"}</button>${pendingMessage()?"":'<button id="resume-space">みんなの宇宙を見る</button>'}<button id="new-person">もう一度体験する</button></div>`;
    $("resume-poster").onclick = pendingMessage()?writeMessage:showPoster;
    if($("resume-space")) $("resume-space").onclick = () => exploreOverview(true);
    $("new-person").onclick = confirmNewParticipant;
    return;
  }
  $("nickname").value = profile?.username || "";
  $("region").value = profile?.region || "";
  const saveProfile=()=>{
    profile={visitDate:new FormData($("form")).get("visitDate"),username:$("nickname").value.trim(),avatarId:Number(new FormData($("form")).get("avatar")),region:$("region").value.trim()};
    sessionStorage.setItem(key + "-profile", JSON.stringify(profile));
  };
  $("form").oninput=saveProfile;
  $("form").onchange=saveProfile;
  $("form").onsubmit = (e) => {
    e.preventDefault();
    const username = $("nickname").value.trim();
    if (!username) return;
    profile = {
      username,
      visitDate: new FormData(e.target).get("visitDate"),
      avatarId: Number(new FormData(e.target).get("avatar")),
      region: $("region").value.trim(),
    };
    sessionStorage.setItem(key + "-profile", JSON.stringify(profile));
    explore(false);
  };
}
window.addEventListener("space-spot", async (e) => {
  const { planetId, slotId } = e.detail;
  const record = records.find(r => r.slotId === slotId);
  if (record) {
    $("dialog").innerHTML =
      `<img src="assets/avatar-${record.avatarId}.svg" alt=""><h2>${escape(record.username)}</h2><p>${escape(record.message || "未来への旅を楽しもう。")}</p><p class="hint">${escape(record.ticketId)} · ${names[planetId]} / ${escape(slotId)}</p><button id="close">閉じる</button>`;
    $("close").onclick = () => $("dialog").close();
    $("dialog").showModal();
    return;
  }
  if (!names[planetId])
    return message("地球は出発地です。別の目的地を選んでください。");
  if (!profile) return message("先に参加フォームを入力してください。");
  if (myRecord)
    return message(
      "チェックイン済みです。自分のポスターから旅の記録をご覧ください。",
    );
  if (!visitDates.includes(profile.visitDate)) return registration();
  $("dialog").innerHTML =
    `<small>${names[planetId]} · ${coordinateText(slotId)}</small><h2>ここにチェックインしますか？</h2><p>来場予約日　2127年1月${profile.visitDate.slice(-2)}日</p><div class="actions"><button id="confirm" class="primary">ここにチェックイン</button><button id="cancel">戻る</button></div><p id="error" class="error"></p>`;
  $("cancel").onclick = () => $("dialog").close();
  $("confirm").onclick = async () => {
    $("confirm").disabled = true;
    try {
      const data = {
        clientId,
        visitDate: profile.visitDate,
        username: profile.username,
        avatarId: profile.avatarId,
        region: profile.region || "",
        planetId,
        slotId,
      };
      if (shared) {
        const res = await fetch("./api/checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (!res.ok) throw Error(result.error || "登録に失敗しました。");
        myRecord = result;
        await refresh();
      } else {
        records = JSON.parse(localStorage.getItem(key + "-records") || "[]");
        if (records.some((r) => r.slotId === slotId))
          throw Error("この地点は選ばれました。別の地点を選んでください。");
        myRecord = {
          ...data,
          id: uuid(),
          ticketId: "SL-" + String(records.length + 1).padStart(4, "0"),
          createdAt: new Date().toISOString(),
          message: "",
        };
        records.push(myRecord);
        localStorage.setItem(key + "-records", JSON.stringify(records));
        renderRecords();
      }
      localStorage.setItem(key + "-record", myRecord.id);
      localStorage.setItem(key + "-pending-record", myRecord.id);
      $("dialog").close();
      writeMessage();
    } catch (error) {
      $("error").textContent = error.message;
      $("confirm").disabled = false;
    }
  };
  $("dialog").showModal();
});
function writeMessage() {
  if(!myRecord)return registration();
  if(!pendingMessage())return showPoster();
  rememberRoute("message");
  setView("form");
  $("panel").className = "panel";
  const planetMessages = {
    mercury: "水星から見る太陽って大きいね。",
    venus: "あの明るい金星まで来ちゃった！",
    moon: "月から地球を眺めてみたかったんだ。",
    mars: "火星って、ほんとに赤いんだね。",
    jupiter: "木星のしま模様、ずっと見てられる。",
    saturn: "土星の輪、近くで見るとすごい！",
    uranus: "天王星のこの色、好きだな。",
    neptune: "海王星まで来たよ。地球はどっちだろう。",
  };
  const presets = [
    planetMessages[myRecord.planetId] ?? "宇宙まで来ちゃった！",
    "まさかここまで来るとは！",
    "もう少しここにいたいな。",
    "一緒に来られてよかったね。",
    "次はどの星に行こうかな。",
  ];
  $("panel").innerHTML = `
    <h1>旅のひとこと</h1>
    <p>${displayNames[myRecord.planetId]}の${coordinateText(myRecord.slotId)}にチェックインしました。</p>
    <form id="message-form">
      <p class="hint">ひとこと選ぶか、自由に書いてください。</p>
      <div class="message-presets" role="group" aria-label="メッセージの例文">
        ${presets.map((line, i) => `<button type="button" data-preset="${i}" aria-pressed="false">${line}</button>`).join("")}
      </div>
      <label for="message">メッセージ（任意・60文字以内）</label>
      <textarea id="message" maxlength="60" rows="3" placeholder="ここに入力"></textarea>
      <div class="actions"><button type="submit" id="create-poster" class="primary"></button></div>
      <p id="save-error" class="error" role="alert"></p>
    </form>`;
  const messageInput = $("message");
  const posterButton = $("create-poster");
  const draftKey = key + "-message-" + myRecord.id;
  const presetButtons = $("message-form").querySelectorAll("[data-preset]");
  messageInput.value = sessionStorage.getItem(draftKey) ?? myRecord.message ?? "";
  function updateMessageControls() {
    const current = messageInput.value;
    for (const preset of presetButtons) {
      preset.setAttribute("aria-pressed", String(current === presets[preset.dataset.preset]));
    }
    posterButton.textContent = current.trim() ? "記念ポスターをつくる" : "メッセージなしでポスターをつくる";
  }
  messageInput.oninput = () => {
    sessionStorage.setItem(draftKey, messageInput.value);
    updateMessageControls();
  };
  for (const preset of presetButtons) {
    preset.onclick = () => {
      const selected = presets[preset.dataset.preset];
      messageInput.value = messageInput.value === selected ? "" : selected;
      messageInput.oninput();
    };
  }
  updateMessageControls();
  $("message-form").onsubmit = async (e) => {
    e.preventDefault();
    const button = posterButton;
    button.disabled = true;
    try {
      const text = $("message").value.trim();
      if (shared) {
        const res = await fetch("./api/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId, id: myRecord.id, message: text }),
        });
        if (!res.ok)
          throw Error("保存できませんでした。もう一度お試しください。");
        myRecord = await res.json();
        await refresh();
      } else {
        myRecord.message = text;
        records = records.map((r) => (r.id === myRecord.id ? myRecord : r));
        localStorage.setItem(key + "-records", JSON.stringify(records));
        renderRecords();
      }
      localStorage.removeItem(key + "-pending-record");
      sessionStorage.removeItem(key + "-message-" + myRecord.id);
      await showPoster();
    } catch (err) {
      $("save-error").textContent = err.message;
      button.disabled = false;
    }
  };
}
const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

async function makePoster() {
  const r = myRecord;
  if (!r || !names[r.planetId]) throw Error("Unknown poster destination");

  const payload = {
    version: 1,
    id: r.id,
    ticketId: r.ticketId,
    visitDate: r.visitDate,
    username: r.username,
    avatarId: r.avatarId,
    checkin: {
      planetId: r.planetId,
      spotId: r.slotId,
      ...spotCoordinates(r.slotId),
    },
    message: r.message,
  };

  const qrDataUrl = await window.SpaceLineQR.generate(payload);

  return createPlanetQrPoster({
    record: { ...r, region: r.region ?? profile?.region ?? '' },
    qrDataUrl,
    coordinates: coordinateText(r.slotId),
    voyageDate: voyageTime(r.createdAt),
    planetJapaneseName: names[r.planetId],
  });
}
async function showPoster() {
  if (!myRecord) return registration();
  if(pendingMessage())return writeMessage();
  rememberRoute("poster");
  setView("form");
  const request=viewerRequest;
  $("panel").className = "panel poster";
  $("panel").innerHTML = "<p>ポスターを作成しています…</p>";
  try {
    const result = await makePoster();
    if(request!==viewerRequest)return;
    posterUrl = result.url;
    $("panel").innerHTML =
      `<img class="poster-image" id="poster" alt="宇宙旅行記念ポスター"><div class="actions poster-actions"><a class="button primary" id="download" download="${myRecord.ticketId}.png">画像を保存</a><button id="all">宇宙に戻る</button><button id="next-person">もう一度体験する</button></div><p class="hint">保存できない場合は画像を長押ししてください。</p>`;
    $("poster").src = posterUrl;
    $("download").href = posterUrl;
    $("all").onclick = () => exploreOverview(true);
    $("next-person").onclick = confirmNewParticipant;
    $("my-poster").hidden = false;
  } catch (err) {
    if(request!==viewerRequest)return;
    $("panel").innerHTML =
      '<p>画像を読み込めませんでした。</p><button id="retry">再試行</button>';
    $("retry").onclick = showPoster;
    console.error(err);
  }
}
await connect();
let savedRoute;
try { savedRoute=JSON.parse(sessionStorage.getItem(key+'-route')); } catch {}
await restoreRoute(savedRoute);
