function setupPosterSave(link, hint, url) {
  link.href = url;
  const apple = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  link.textContent = "画像をダウンロード";
  if (!apple || !navigator.canShare || !navigator.share) return;

  const bytes = Uint8Array.from(atob(url.slice(url.indexOf(",") + 1)), c => c.charCodeAt(0));
  const file = new File([bytes], link.download, { type: "image/png" });
  if (!navigator.canShare({ files: [file] })) return;

  link.textContent = "写真に保存";
  hint.textContent = "共有メニューで「画像を保存」を選んでください。";
  link.onclick = async event => {
    event.preventDefault();
    try {
      await navigator.share({ files: [file] });
    } catch (err) {
      if (err.name === "AbortError") return;
      link.onclick = null;
      link.textContent = "画像をダウンロード";
      hint.textContent = "もう一度タップするとPNGをダウンロードできます。";
    }
  };
}

export function displayPoster(panel, { url, qrDataUrl, ticketId, testMode, onReturn, onRestart }) {
  panel.innerHTML = `
    <button type="button" class="poster-preview" aria-label="QRコードを拡大" aria-haspopup="dialog">
      <img class="poster-image" alt="宇宙旅行記念ポスター">
    </button>
    <div class="actions poster-actions ${testMode ? "" : "poster-live"}">
      <a class="button primary" id="download">画像を保存</a>
      <a class="button" id="experience-3d" aria-disabled="true">3D体験（準備中）</a>
      <button id="all">宇宙に戻る</button>
      ${testMode ? '<button id="next-person">もう一度体験する</button>' : ""}
    </div>
    <button type="button" class="show-qr">QRコードを表示</button>
    <p class="hint" id="save-hint" aria-live="polite"></p>
    <dialog class="scan-dialog" aria-label="読み取り用QRコード">
      <canvas role="img" aria-label="読み取り用QRコード"></canvas>
      <form method="dialog"><button>閉じる</button></form>
    </dialog>`;

  panel.querySelector(".poster-image").src = url;
  const dialog = panel.querySelector(".scan-dialog");
  const qr = new Image();
  qr.onload = () => {
    const canvas = dialog.querySelector("canvas");
    canvas.width = qr.naturalWidth;
    canvas.height = qr.naturalHeight;
    canvas.getContext("2d").drawImage(qr, 0, 0);
  };
  qr.src = qrDataUrl;
  const openQr = () => dialog.showModal();
  panel.querySelector(".poster-preview").onclick = openQr;
  panel.querySelector(".show-qr").onclick = openQr;

  const download = panel.querySelector("#download");
  download.download = ticketId + ".png";
  setupPosterSave(download, panel.querySelector("#save-hint"), url);

  const experienceUrl = document.querySelector('meta[name="space-line-3d-url"]').content.trim();
  if (/^https:\/\//i.test(experienceUrl)) {
    const link = panel.querySelector("#experience-3d");
    link.href = experienceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.removeAttribute("aria-disabled");
    link.textContent = "3D体験へ ↗";
  }
  panel.querySelector("#all").onclick = onReturn;
  if (testMode) panel.querySelector("#next-person").onclick = onRestart;
}

