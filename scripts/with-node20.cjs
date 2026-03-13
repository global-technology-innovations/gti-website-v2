#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

function findRepoRoot(startDir) {
  let current = startDir;

  while (true) {
    if (fs.existsSync(path.join(current, ".nvmrc"))) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return startDir;
    }

    current = parent;
  }
}

function parseDesiredMajor(rootDir) {
  const nvmrcPath = path.join(rootDir, ".nvmrc");

  if (!fs.existsSync(nvmrcPath)) {
    return 20;
  }

  const raw = fs.readFileSync(nvmrcPath, "utf8").trim();
  const match = raw.match(/(\d+)/);

  return match ? Number(match[1]) : 20;
}

function compareVersionsDesc(a, b) {
  const aParts = a.replace(/^v/, "").split(".").map(Number);
  const bParts = b.replace(/^v/, "").split(".").map(Number);
  const length = Math.max(aParts.length, bParts.length);

  for (let index = 0; index < length; index += 1) {
    const diff = (bParts[index] || 0) - (aParts[index] || 0);
    if (diff !== 0) {
      return diff;
    }
  }

  return 0;
}

function findNodeBinDir(major) {
  const candidates = [
    process.env.NVM_DIR && path.join(process.env.NVM_DIR, "versions", "node"),
    process.env.HOME && path.join(process.env.HOME, ".nvm", "versions", "node"),
  ].filter(Boolean);

  for (const baseDir of candidates) {
    if (!fs.existsSync(baseDir)) {
      continue;
    }

    const versions = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name.startsWith(`v${major}.`))
      .map((entry) => entry.name)
      .sort(compareVersionsDesc);

    for (const version of versions) {
      const binDir = path.join(baseDir, version, "bin");
      const nodePath = path.join(binDir, "node");
      if (fs.existsSync(nodePath)) {
        return { binDir, version };
      }
    }
  }

  return null;
}

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error("Usage: node scripts/with-node20.cjs <command> [...args]");
  process.exit(1);
}

const repoRoot = findRepoRoot(process.cwd());
const desiredMajor = parseDesiredMajor(repoRoot);
const currentMajor = Number(process.versions.node.split(".")[0]);

let env = { ...process.env };

if (currentMajor !== desiredMajor) {
  const target = findNodeBinDir(desiredMajor);

  if (!target) {
    console.error(
      `This workspace requires Node ${desiredMajor}.x. Install it via nvm and retry.`
    );
    process.exit(1);
  }

  env = {
    ...env,
    PATH: `${target.binDir}${path.delimiter}${env.PATH || ""}`,
  };

  console.error(
    `Switching ${command} to Node ${target.version} (current process is ${process.version}).`
  );
}

const child = spawn(command, args, {
  stdio: "inherit",
  env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(`Failed to start ${command}: ${error.message}`);
  process.exit(1);
});
