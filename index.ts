#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import gradient from "gradient-string";
import open from "open";
import link from "terminal-link";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const badassGradient = gradient(["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3"]);

/** Cute goodbye messages */
const goodbyes = [
  "Stay badass. 💀",
  "Keep shipping. 🚀",
  "Go build something cool. ✨",
  "Later, friend. 👋",
  "May your builds be green. 🌱",
  "Until next time. 🍄",
];

/** Get a random goodbye */
const getGoodbye = () => goodbyes[Math.floor(Math.random() * goodbyes.length)];

/** Graceful exit with cute message */
function sayGoodbye(reason?: string) {
  console.log("\n");
  if (reason) {
    console.log(chalk.dim(`  ${reason}`));
  }
  console.log(badassGradient(`  ${getGoodbye()}\n`));
  process.exit(0);
}

// Handle ctrl-c and other exits gracefully
process.on("SIGINT", () => sayGoodbye("Caught you sneaking out..."));
process.on("SIGTERM", () => sayGoodbye());
process.on("uncaughtException", () =>
  sayGoodbye("Oops, something broke. But hey..."),
);

/**
 * Print lines with modem effect, but line-by-line for better performance on larger blocks
 */
async function modemPrintLines(text: string, msPerLine = 50) {
  const lines = text.split("\n");
  for (const line of lines) {
    console.log(line);
    await sleep(msPerLine);
  }
}

/** Cute tamagotchi-style animation frames */
const tamagotchiFrames = [
  "   ᘛ⁐̤ᕐᐷ   ",
  "   ᘛ⁐̤ᕐᐷ   ",
  "   ᘛ⁐ᕐᐷ    ",
  "   ᘛ⁐̤ᕐᐷ   ",
  "    ᘛ⁐̤ᕐᐷ  ",
  "   ᘛ⁐̤ᕐᐷ   ",
];

/** Nyan-style cat animation */
const nyanFrames = [
  "≋≋≋≋≋🐱",
  "≋≋≋≋🐱 ",
  "≋≋≋🐱  ",
  "≋≋🐱   ",
  "≋🐱    ",
  "🐱     ",
  "≋🐱    ",
  "≋≋🐱   ",
  "≋≋≋🐱  ",
  "≋≋≋≋🐱 ",
];

/** Cute loading animation with message */
async function cuteSpinner(message: string, durationMs: number) {
  const frames = Math.random() > 0.5 ? nyanFrames : tamagotchiFrames;
  const frameDelay = 120;
  const totalFrames = Math.ceil(durationMs / frameDelay);

  process.stdout.write("\n");
  for (let i = 0; i < totalFrames; i++) {
    const frame = frames[i % frames.length];
    process.stdout.write(`\r  ${chalk.cyan(frame)} ${chalk.dim(message)}`);
    await sleep(frameDelay);
  }
  process.stdout.write("\r" + " ".repeat(60) + "\r"); // Clear the line
}

const header = `
     ██╗ ██████╗ ███████╗██╗         ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗███████╗
     ██║██╔═══██╗██╔════╝██║         ██║  ██║██╔═══██╗██╔═══██╗██║ ██╔╝██╔════╝
     ██║██║   ██║█████╗  ██║         ███████║██║   ██║██║   ██║█████╔╝ ███████╗
██   ██║██║   ██║██╔══╝  ██║         ██╔══██║██║   ██║██║   ██║██╔═██╗ ╚════██║
╚█████╔╝╚██████╔╝███████╗███████╗    ██║  ██║╚██████╔╝╚██████╔╝██║  ██╗███████║
 ╚════╝  ╚═════╝ ╚══════╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
`;

// Show name line by line with modem effect
await modemPrintLines(badassGradient(header), 80);
await sleep(400);

const bio = `
I build tools for people who teach developers.

Co-founder ${chalk.yellow("@egghead")} · Education at ${chalk.cyan("Vercel")} · Building ${chalk.magenta("Badass Courses")}

The platform I create powers courses from world-class educators:
  ${chalk.red("→")} ${link(chalk.bold("AI Hero"), "https://aihero.dev")} - Matt Pocock's AI engineering course
  ${chalk.red("→")} ${link(chalk.bold("Epic AI"), "https://epicai.pro")} - Kent C. Dodds on MCP & intelligent experiences  
  ${chalk.red("→")} ${link(chalk.bold("Total TypeScript"), "https://totaltypescript.com")} - The industry standard for TS

${chalk.dim("Currently obsessed with:")}
  ${chalk.green("•")} AI-assisted development (not vibe coding, structured multi-agent workflows)
  ${chalk.green("•")} MCP & agent architecture
  ${chalk.green("•")} Next.js + RSC (the whole beautiful mess)

${chalk.dim("Vancouver, WA")}
`;

// Show bio with modem effect
const boxedBio = boxen(bio.trim(), {
  padding: 1,
  margin: 1,
  borderStyle: "round",
  borderColor: "cyan",
});
await modemPrintLines(boxedBio, 40);

// Cute spinner pause to let them read
await cuteSpinner("take a moment...", 2500);

let choice: string;

try {
  choice = await select({
    message: "Want to go deeper?",
    theme: {
      style: {
        help: (text: string) => chalk.dim(text),
        keysHelpTip: (keys: [string, string][]) => {
          const formatted = keys
            .map(([key, label]) => `${chalk.bold(key)} ${chalk.dim(label)}`)
            .join(chalk.dim(" • "));
          return `${formatted} ${chalk.dim("•")} ${chalk.bold("esc")} ${chalk.dim("exit")}`;
        },
      },
    },
    choices: [
      {
        name: `${chalk.yellow("🍳")} egghead.io - where it all started`,
        value: "https://egghead.io",
      },
      {
        name: `${chalk.magenta("💀")} badass.dev - the course business`,
        value: "https://badass.dev",
      },
      {
        name: `${chalk.cyan("📝")} joelhooks.com - digital garden`,
        value: "https://joelhooks.com",
      },
      {
        name: `${chalk.blue("🦋")} Bluesky`,
        value: "https://bsky.app/profile/joelhooks.com",
      },
      {
        name: `${chalk.gray("𝕏")} Twitter/X`,
        value: "https://twitter.com/joelhooks",
      },
      {
        name: `${chalk.white("💻")} GitHub - you're probably here`,
        value: "https://github.com/joelhooks",
      },
      {
        name: `${chalk.green("🔧")} course-builder - the platform`,
        value: "https://github.com/skillrecordings/course-builder",
      },
    ],
  });
} catch {
  // User cancelled (ctrl-c during prompt)
  sayGoodbye();
  process.exit(0);
}

if (choice) {
  console.log(chalk.dim(`\nOpening ${choice}...\n`));
  await open(choice);
  sayGoodbye("Thanks for stopping by!");
}
