#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import gradient from "gradient-string";
import open from "open";
import link from "terminal-link";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Print text with a retro modem feel - character by character with variable timing
 * 9600 baud = 960 chars/sec = ~1ms per char, but we slow it down for effect
 */
async function modemPrint(text: string, charsPerSec = 800) {
  const baseDelay = 1000 / charsPerSec;
  for (const char of text) {
    process.stdout.write(char);
    // Add slight randomness for that authentic modem feel
    const jitter = Math.random() * 0.5 + 0.75; // 0.75x to 1.25x
    await sleep(baseDelay * jitter);
  }
}

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

const badassGradient = gradient(["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3"]);

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
await sleep(300);

const choice = await select({
  message: "Want to go deeper?",
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
    { name: `${chalk.red("👋")} Nah, I'm good`, value: "exit" },
  ],
});

if (choice !== "exit") {
  console.log(chalk.dim(`\nOpening ${choice}...\n`));
  await open(choice);
}

console.log(badassGradient("\n  Stay badass. 💀\n"));
