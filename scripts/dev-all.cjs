const { spawn } = require("node:child_process");

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  ["products", ["run", "dev:products"]],
  ["gateway", ["run", "dev:gateway"]]
];

const children = [];

for (const [name, args] of processes) {
  const child = spawn(npmCommand, args, {
    stdio: "inherit",
    shell: false
  });

  children.push(child);

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
    }
  });
}

const stopChildren = () => {
  for (const child of children) {
    child.kill();
  }
};

process.on("SIGINT", stopChildren);
process.on("SIGTERM", stopChildren);
