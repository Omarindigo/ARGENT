#!/usr/bin/env node

const childProcess = require("child_process")
const fs = require("fs")
const path = require("path")
const os = require("os")

function run(target, args) {
  const result = childProcess.spawnSync(target, args, {
    stdio: "inherit",
  })
  if (result.error) {
    console.error(result.error.message)
    process.exit(1)
  }
  const code = typeof result.status === "number" ? result.status : 0
  process.exit(code)
}

// Check for custom bin
const envPath = process.env.OPENCODE_BIN_PATH
if (envPath) {
  run(envPath, process.argv.slice(2))
}

const scriptPath = fs.realpathSync(__filename)
const scriptDir = path.dirname(scriptPath)

// Check for cached binary
const cached = path.join(scriptDir, ".opencode")
if (fs.existsSync(cached)) {
  run(cached, process.argv.slice(2))
}

// Find native binary
const platform = os.platform()
const arch = os.arch()
const base = "opencode-" + platform + "-" + arch
const binary = platform === "windows" ? "opencode.exe" : "opencode"

function findBinary(startDir) {
  let current = startDir
  for (;;) {
    const modules = path.join(current, "node_modules")
    if (fs.existsSync(modules)) {
      const candidate = path.join(modules, base, "bin", binary)
      if (fs.existsSync(candidate)) return candidate
      const baseline = path.join(modules, base + "-baseline", "bin", binary)
      if (fs.existsSync(baseline)) return baseline
    }
    const parent = path.dirname(current)
    if (parent === current) return
    current = parent
  }
}

const resolved = findBinary(scriptDir)
if (resolved) {
  run(resolved, process.argv.slice(2))
}

// Fallback to bun run start
const bunCmd = os.platform() === "win32" ? "bun.cmd" : "bun"
run(bunCmd, ["run", "start", ...process.argv.slice(2)])
