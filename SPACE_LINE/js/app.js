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
const displayNames = { ...names, earth: "地球" };
const key = "space-line-v2";
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
function message(text) {
  $("dialog").innerHTML =
    `<p>${escape(text)}</p><button id="close">閉じる</button>`;
  $("close").onclick = () => $("dialog").close();
  $("dialog").showModal();
}

// 共通サーバーがない場合は、明示したローカルデモとして動作します。
async function connect() {
  try {
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
    $("mode").textContent = "この端末だけのデモ";
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
  window.SpaceSolar?.setRecords(records);
  for (const [id, name] of Object.entries(names)) {
    const btn = document.querySelector(`[data-planet="${id}"]`);
    if (btn) {
      const free = 64 - records.filter((r) => r.planetId === id).length;
      btn.textContent = `${name} ${free === 0 ? "満員" : "空き " + free}`;
    }
  }
}
window.addEventListener("space-error", () => {
  const start = $("start");
  if (start) {
    start.disabled = true;
    start.textContent = "このブラウザでは3Dを表示できません";
  }
});
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
  const id = e.target.dataset.planet;
  if (id) {
    window.SpaceSolar?.focus(id);
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
$("overview").onclick = () => window.SpaceSolar?.overview();
$("routes").onclick = () => {
  const show = $("routes").getAttribute("aria-pressed") !== "true";
  $("routes").setAttribute("aria-pressed", String(show));
  $("routes").textContent = show ? "航路を隠す" : "航路を表示";
  window.SpaceSolar?.setRoutes(show);
  if (show) window.SpaceSolar?.overview();
};
$("my-poster").onclick = () => showPoster();
// 入力が終わってから3Dを読み込み、スマホの初期負荷を抑えます。
let solarLoading;
function setView(view) {
  document.body.dataset.view = view;
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
      import("../solar/solar.bundle.js").catch(reject);
    });
  }
  await solarLoading;
}
async function explore(overview = true) {
  setView("space");
  $("panel").innerHTML = "";
  $("panel").className = "panel";
  $("my-poster").hidden = !myRecord;
  try {
    await ensureSolar();
    if (overview) window.SpaceSolar?.overview();
    else window.SpaceSolar?.focus("moon");
    renderRecords();
  } catch (err) {
    registration();
    if ($("loader")) $("loader").hidden = true;
    message(err.message);
  }
}
$("back-form").onclick = registration;
// 過去の記録を残したまま、新しい参加者の受付を始めます。
function newParticipant() {
  clientId = uuid();
  localStorage.setItem(key + "-client", clientId);
  localStorage.removeItem(key + "-record");
  sessionStorage.removeItem(key + "-profile");
  profile = null;
  myRecord = null;
  posterUrl = null;
  registration();
}
function confirmNewParticipant() {
  $("dialog").innerHTML =
    '<h2>新しい参加者として始めますか？</h2><p>今のポスターを保存してから進んでください。これまでのチェックインは残ります。</p><div class="actions"><button id="cancel-new">戻る</button><button id="confirm-new" class="primary">新しく始める</button></div>';
  $("cancel-new").onclick = () => $("dialog").close();
  $("confirm-new").onclick = () => {
    $("dialog").close();
    newParticipant();
  };
  $("dialog").showModal();
}
function registration() {
  setView("form");
  $("panel").className = "panel";
  $("panel").innerHTML =
    `<h1 class="brand-heading">SPACE LINE</h1><p class="brand-subtitle">22世紀の宇宙交通</p>
  <form id="form"><label for="nickname">ニックネーム *</label><input id="nickname" required maxlength="20" placeholder="例：そら" autocomplete="nickname">
  <label>アバター *</label><div class="avatars">${[1, 2, 3, 4].map((i) => `<label><img src="assets/avatar-${i}.svg" alt="宇宙飛行士 ${i}"><input type="radio" name="avatar" value="${i}" ${i === (profile?.avatarId || 1) ? "checked" : ""}></label>`).join("")}</div>
  <label id="birthday-label">生年月日（任意）</label><div class="birthday-fields" role="group" aria-labelledby="birthday-label"><select id="birth-year" aria-label="年"><option value="">年</option>${Array.from(
    { length: 121 },
    (_, i) => new Date().getFullYear() - i,
  )
    .map((year) => `<option value="${year}">${year}年</option>`)
    .join(
      "",
    )}</select><select id="birth-month" aria-label="月"><option value="">月</option>${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}月</option>`).join("")}</select><select id="birth-day" aria-label="日"><option value="">日</option></select></div><p id="birth-error" class="error" role="alert"></p>
  <p class="hint">生年月日は公開されません。</p>
  <label for="region">出発地（任意）</label><input id="region" maxlength="30" placeholder="例：東京 / 成都">
  <p class="hint">ニックネーム・アバター・メッセージは公開されます。</p>
  <div class="actions"><button id="start" class="primary">星を選ぶ</button></div></form>
  <footer class="credits-footer"><a href="credits.html" target="_blank" rel="noopener">クレジット</a></footer>`;
  if (myRecord) {
    $("panel").innerHTML =
      `<h1>おかえりなさい。</h1><p>${escape(myRecord.username)}さんの旅の記録が残っています。</p><div class="actions"><button id="resume-poster" class="primary">作成済みのポスターを見る</button><button id="resume-space">みんなの宇宙を見る</button><button id="new-person">新しい参加者として始める</button></div><footer class="credits-footer"><a href="credits.html" target="_blank" rel="noopener">クレジット</a></footer>`;
    $("resume-poster").onclick = showPoster;
    $("resume-space").onclick = () => explore(true);
    $("new-person").onclick = confirmNewParticipant;
    return;
  }
  $("nickname").value = profile?.username || "";
  const birthdayParts = (profile?.birthday || "").split("-");
  $("birth-year").value = birthdayParts[0] || "";
  $("birth-month").value = birthdayParts[1] ? Number(birthdayParts[1]) : "";
  const updateDays = () => {
    const current = $("birth-day").value;
    const year = Number($("birth-year").value) || 2000;
    const month = Number($("birth-month").value) || 1;
    const total = new Date(year, month, 0).getDate();
    $("birth-day").innerHTML =
      '<option value="">日</option>' +
      Array.from(
        { length: total },
        (_, i) => `<option value="${i + 1}">${i + 1}日</option>`,
      ).join("");
    $("birth-day").value = Number(current) <= total ? current : "";
  };
  $("birth-year").onchange = updateDays;
  $("birth-month").onchange = updateDays;
  updateDays();
  $("birth-day").value = birthdayParts[2] ? Number(birthdayParts[2]) : "";
  $("region").value = profile?.region || "";
  $("form").onsubmit = (e) => {
    e.preventDefault();
    const username = $("nickname").value.trim();
    if (!username) return;
    const parts = [
      $("birth-year").value,
      $("birth-month").value,
      $("birth-day").value,
    ];
    if (parts.some(Boolean) && !parts.every(Boolean)) {
      $("birth-error").textContent =
        "年・月・日をすべて選ぶか、すべて空欄にしてください。";
      return;
    }
    const birthday = parts.every(Boolean)
      ? parts.map((v, i) => (i ? v.padStart(2, "0") : v)).join("-")
      : "";
    if (birthday && new Date(birthday + "T00:00:00") > new Date()) {
      $("birth-error").textContent = "生年月日を確認してください。";
      return;
    }
    profile = {
      username,
      avatarId: Number(new FormData(e.target).get("avatar")),
      birthday,
      region: $("region").value.trim(),
    };
    sessionStorage.setItem(key + "-profile", JSON.stringify(profile));
    explore(false);
  };
}
window.addEventListener("space-spot", async (e) => {
  const { planetId, slotId, record } = e.detail;
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
  $("dialog").innerHTML =
    `<small>${names[planetId]} · ${escape(slotId.split("-")[1])}</small><h2>ここにチェックインしますか？</h2><div class="actions"><button id="cancel">戻る</button><button id="confirm" class="primary">ここに決める</button></div><p id="error" class="error"></p>`;
  $("cancel").onclick = () => $("dialog").close();
  $("confirm").onclick = async () => {
    $("confirm").disabled = true;
    try {
      const data = {
        clientId,
        username: profile.username,
        avatarId: profile.avatarId,
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
          throw Error("この地点は選ばれました。別の白い点を選んでください。");
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
  setView("form");
  $("panel").className = "panel";
  $("panel").innerHTML =
    `<h1>未来へ、一言。</h1><p>${displayNames[myRecord.planetId]}の${escape(myRecord.slotId.split("-")[1])}番地点にチェックインしました。</p><form id="message-form"><label for="message">未来へのメッセージ（任意・60文字以内）</label><textarea id="message" maxlength="60" rows="4" placeholder="100年後も、この星を大切に。"></textarea><div class="actions"><button class="primary">記念ポスターをつくる</button></div><p id="save-error" class="error"></p></form>`;
  $("message").value = myRecord.message || "";
  $("message-form").onsubmit = async (e) => {
    e.preventDefault();
    const button = e.target.querySelector("button");
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

// 海報内のQR生成だけを王さんの実装に差し替えられます。
async function makePoster() {
  const r = myRecord;
  if (!names[r.planetId]) throw Error("Unknown poster destination");
  const c = document.createElement("canvas"); c.width=1080; c.height=1980;
  const x=c.getContext("2d");
  if(document.fonts?.ready)await document.fonts.ready;
  const art=await loadImage(`assets/poster-${r.planetId}-approved.jpg`);
  const orange="#ff7900", ink="#291307", paper="#fff0d8";
  // Apart from the brand artwork, all text uses one sans-serif family.
  const family='"Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif';
  const font=(size,weight=400)=>{x.font=`${weight} ${size}px ${family}`;};
  const text=(value,px,py,size,weight=400,color=ink)=>{
    font(size,weight);x.fillStyle=color;x.fillText(value,px,py);
  };
  const graphemes=value=>typeof Intl.Segmenter==="function"
    ? [...new Intl.Segmenter("ja",{granularity:"grapheme"}).segment(value)].map(v=>v.segment)
    : Array.from(value);
  const wrap=(value,width,size,weight=400)=>{
    font(size,weight);const lines=[];let line="";
    for(const ch of graphemes(value)){
      if(ch==="\n"){lines.push(line);line="";continue;}
      if(line && x.measureText(line+ch).width>width){
        // Japanese punctuation stays with the preceding phrase.
        if(/^[、。，．！？!?：:；;）)」』】〉》]$/.test(ch)){
          const parts=graphemes(line);const tail=parts.pop();
          lines.push(parts.join(""));line=tail+ch;continue;
        }
        const parts=graphemes(line);
        if(/[（(「『【〈《]$/.test(line)){const tail=parts.pop();lines.push(parts.join(""));line=tail;}
        else{lines.push(line);line="";}
      }
      line+=ch;
    }
    if(line)lines.push(line);
    return lines;
  };
  x.fillStyle=orange;x.fillRect(0,0,1080,1980);
  x.save();x.beginPath();x.rect(0,0,1080,1080);x.clip();
  x.drawImage(art,0,0,1080,art.height*1080/art.width);x.restore();
  // Shared grid: destination, full-width message, then identity + QR.
  text(names[r.planetId],64,1186,84,700,paper);
  text(r.planetId.toUpperCase(),66,1240,32,600,paper);
  x.textAlign="right";
  text(`地点 ${r.slotId.split("-").at(-1)}`,1016,1180,42,600,paper);
  text("2127",1016,1240,32,600,paper);
  x.textAlign="left";
  let message=(r.message||"").trim().replace(/\n{3,}/g,"\n\n");
  if(message.split("\n").length>4)message=message.replace(/\n+/g," ");
  let messageSize=message.length<=18?64:54, messageLines;
  do{
    messageLines=wrap(message,952,messageSize,500);
    if(messageLines.length*messageSize*1.4<=282||messageSize<=30)break;
    messageSize--;
  }while(true);
  messageLines.forEach((line,i)=>text(line,64,1345+i*messageSize*1.4,messageSize,500));
  x.fillStyle="#29130755";x.fillRect(64,1640,952,2);
  let nameSize=52,nameLines;
  do{nameLines=wrap(r.username,590,nameSize,700);if(nameLines.length<=2||nameSize<=30)break;nameSize--;}while(true);
  nameLines.forEach((line,i)=>text(line,64,1716+i*nameSize*1.25,nameSize,700));
  const metaY=nameLines.length>1?1840:1796;
  text(r.ticketId,64,metaY,30,500);
  const details=[profile?.region,profile?.birthday?.replaceAll("-",".")].filter(Boolean).join(" / ");
  let detailSize=30,detailLines;
  do{detailLines=wrap(details,590,detailSize);if(detailLines.length<=2||detailSize<=22)break;detailSize--;}while(true);
  detailLines.forEach((line,i)=>text(line,64,metaY+48+i*detailSize*1.3,detailSize));
  const qrX=736,qrY=1680;
  const payload = {
    version: 1,
    id: r.id,
    ticketId: r.ticketId,
    username: r.username,
    avatarId: r.avatarId,
    checkin: { planetId: r.planetId, spotId: r.slotId },
    message: r.message,
  };
  let qr=null;
  try{
    qr=await window.SpaceLineQR.generate(payload);
    if(qr&&!/^data:image\/png;base64,/.test(qr))throw Error("QR must be PNG");
    if(qr){const img=await loadImage(qr);x.fillStyle="#fff";x.fillRect(qrX-10,qrY-10,290,290);
      x.imageSmoothingEnabled=false;x.drawImage(img,qrX,qrY,270,270);x.imageSmoothingEnabled=true;}
  }catch(err){console.error(err);qr=null;}
  if(!qr){x.strokeStyle="#29130755";x.lineWidth=2;
    for(const [px,py,dx,dy] of [[qrX,qrY,1,1],[qrX+270,qrY,-1,1],[qrX,qrY+270,1,-1],[qrX+270,qrY+270,-1,-1]]){
      x.beginPath();x.moveTo(px+dx*18,py);x.lineTo(px,py);x.lineTo(px,py+dy*18);x.stroke();}}
  return {url:c.toDataURL("image/png"),hasQR:!!qr};
}
async function showPoster() {
  if (!myRecord) return;
  setView("form");
  $("panel").className = "panel poster";
  $("panel").innerHTML = "<p>ポスターを作成しています…</p>";
  try {
    const result = await makePoster();
    posterUrl = result.url;
    $("panel").innerHTML =
      `<img class="poster-image" id="poster" alt="宇宙旅行記念ポスター"><div class="actions poster-actions"><a class="button primary" id="download" download="${myRecord.ticketId}.png">画像を保存</a><button id="all">宇宙に戻る</button><button id="edit-message">メッセージを編集</button><button id="next-person">新しくはじめる</button></div><p class="hint">保存できない場合は画像を長押ししてください。</p>`;
    $("poster").src = posterUrl;
    $("download").href = posterUrl;
    $("all").onclick = () => explore(true);
    $("next-person").onclick = confirmNewParticipant;
    $("edit-message").onclick = writeMessage;
    $("my-poster").hidden = false;
  } catch (err) {
    $("panel").innerHTML =
      '<p>画像を読み込めませんでした。</p><button id="retry">再試行</button>';
    $("retry").onclick = showPoster;
    console.error(err);
  }
}
await connect();
registration();
