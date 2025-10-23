import fs from "fs-extra";

const cols = 52;
const rows = 7;
const size = 12;
const bg = "#000610";
const snakeColor = "#00FF88";
const trailColor = "#8A2BE2";
const totalFrames = 80;

let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cols * size}" height="${rows * size}" style="background:${bg}" viewBox="0 0 ${cols * size} ${rows * size}">`;
svg += `<rect width="100%" height="100%" fill="${bg}"/>`;

// grid dots
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    svg += `<rect x="${x * size}" y="${y * size}" width="${size - 1}" height="${size - 1}" rx="2" fill="#0a0a12" opacity="0.4"/>`;
  }
}

// snake path animation
const path = [];
for (let i = 0; i < totalFrames; i++) {
  const x = i % cols;
  const y = Math.floor((i / cols) % rows);
  path.push({ x, y });
}

path.forEach((p, i) => {
  const delay = i * 0.15;
  svg += `
    <rect x="${p.x * size}" y="${p.y * size}" width="${size - 1}" height="${size - 1}" rx="2" fill="${snakeColor}">
      <animate attributeName="opacity" values="0;1;0" dur="6s" begin="${delay}s" repeatCount="indefinite"/>
      <animate attributeName="fill" values="${snakeColor};${trailColor};${snakeColor}" dur="6s" begin="${delay}s" repeatCount="indefinite"/>
    </rect>`;
});

// text hacker-style
svg += `
  <text x="10" y="${rows * size - 4}" font-size="10" font-family="monospace"
        fill="${snakeColor}" text-shadow="0 0 6px ${snakeColor}">
    system online ▓▓▓▓▓▓▓▓▓▓
    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
  </text>
`;

svg += `</svg>`;

await fs.writeFile("hacker-snake.svg", svg);
console.log("✅ Generated animated hacker-snake.svg");
