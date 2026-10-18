const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const hint = document.getElementById("hint");
const askCard = document.getElementById("ask-card");
const success = document.getElementById("success");
const hearts = document.querySelector(".hearts");
const burst = document.querySelector(".burst");

const excuses = [
  "再想想？",
  "真的不考虑吗？",
  "点错了吧",
  "这个按钮坏了",
  "还是同意吧",
  "逃不掉的哦",
  "只能同意～",
];

let dodgeCount = 0;

function spawnHearts() {
  for (let i = 0; i < 14; i += 1) {
    const span = document.createElement("span");
    span.textContent = ["❤", "♥", "♡"][i % 3];
    span.style.left = `${Math.random() * 100}%`;
    span.style.animationDuration = `${7 + Math.random() * 8}s`;
    span.style.animationDelay = `${Math.random() * 6}s`;
    span.style.fontSize = `${16 + Math.random() * 18}px`;
    hearts.appendChild(span);
  }
}

function moveNoButton() {
  dodgeCount += 1;
  noBtn.classList.add("escaped");
  noBtn.textContent = excuses[Math.min(dodgeCount - 1, excuses.length - 1)];

  const padding = 16;
  const maxX = window.innerWidth - noBtn.offsetWidth - padding;
  const maxY = window.innerHeight - noBtn.offsetHeight - padding;
  const x = padding + Math.random() * Math.max(maxX - padding, 0);
  const y = padding + Math.random() * Math.max(maxY - padding, 0);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  hint.textContent = dodgeCount >= 4 ? "看吧，不同意是点不到的。" : "哼，想拒绝可没那么容易。";

  if (dodgeCount >= 8) {
    noBtn.textContent = "同意";
    noBtn.style.background = "#ff4d7a";
    noBtn.style.color = "#fff";
    noBtn.style.borderColor = "#ff4d7a";
  }
}

function celebrate() {
  askCard.classList.add("hidden");
  noBtn.classList.add("hidden");
  success.classList.remove("hidden");

  const colors = ["#ff4d7a", "#ff8fab", "#ffd166", "#fff"];
  for (let i = 0; i < 28; i += 1) {
    const dot = document.createElement("i");
    const angle = (Math.PI * 2 * i) / 28;
    const dist = 80 + Math.random() * 160;
    dot.style.setProperty("--x", `${Math.cos(angle) * dist}px`);
    dot.style.setProperty("--y", `${Math.sin(angle) * dist}px`);
    dot.style.background = colors[i % colors.length];
    burst.appendChild(dot);
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  if (dodgeCount >= 8) {
    celebrate();
    return;
  }
  moveNoButton();
});

noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (dodgeCount >= 8) {
    celebrate();
    return;
  }
  moveNoButton();
});

yesBtn.addEventListener("click", celebrate);

spawnHearts();
