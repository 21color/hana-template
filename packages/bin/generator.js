#! /usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const degit = require("degit");

// project-name 미입력
if (process.argv.length < 3) {
  console.log("[ERROR]: Enter as in the example below");
  console.log("ex) npx vite-create-21color [project-name]");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = "21color/21color-template/template";


async function main() {
  try {
    // project-name 경로 확인

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath);
    } else {
      console.log(`[ERROR]: ${projectName} is already exist in the directory`);
      process.exit(1);
    }

  // degit을 이용하여 git repo clone
  console.log("[INFO]: downloading template...");
  const emitter = degit(GIT_REPO, { cache: false, force: true, verbose: true });
  await emitter.clone(projectPath);

  process.chdir(projectPath);

  console.log("[INFO]: installing dependencies...");
  execSync("yarn install", { stdio: "inherit" });

  console.log("[SUCCESS]: Project created successfully");

  } catch (error) {
  console.error("[ERROR]: Project creation failed", error);
  }
}

main();