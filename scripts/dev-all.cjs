const { spawn } = require("node:child_process");

const isWindows = process.platform === "win32";

const processes = [
  ["users", ["run", "dev:users"]],
  ["products", ["run", "dev:products"]],
  ["gateway", ["run", "dev:gateway"]]
];

const children = [];

for (const [name, args] of processes) {
  const command = isWindows ? "cmd.exe" : "npm";
  const commandArgs = isWindows ? ["/d", "/s", "/c", "npm.cmd", ...args] : args;

  const child = spawn(command, commandArgs, {
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
