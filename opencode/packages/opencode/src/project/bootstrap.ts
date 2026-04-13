import { Plugin } from "../plugin"
import { Format } from "../format"
import { LSP } from "../lsp"
import { File } from "../file"
import { FileWatcher } from "../file/watcher"
import { Snapshot } from "../snapshot"
import { Project } from "./project"
import { Vcs } from "./vcs"
import { Bus } from "../bus"
import { Command } from "../command"
import { Instance } from "./instance"
import { Log } from "@/util/log"
import { BootstrapRuntime } from "@/effect/bootstrap-runtime"
import { ShareNext } from "@/share/share-next"
import { MCP } from "@/mcp"
import { Config } from "../config/config"

export async function InstanceBootstrap() {
  Log.Default.info("bootstrapping", { directory: Instance.directory })
  await Plugin.init()
  void BootstrapRuntime.runPromise(ShareNext.Service.use((svc) => svc.init()))
  void BootstrapRuntime.runPromise(Format.Service.use((svc) => svc.init()))
  await LSP.init()
  File.init()
  FileWatcher.init()
  Vcs.init()
  Snapshot.init()

  // Auto-connect MCP servers from global config
  const config = await Config.get()
  if (config.mcp) {
    for (const [name, mcpConfig] of Object.entries(config.mcp)) {
      if (mcpConfig.enabled !== false) {
        Log.Default.info("auto-connecting MCP", { name })
        await MCP.connect(name).catch((err: unknown) => {
          Log.Default.warn("MCP auto-connect failed", { name, error: String(err) })
        })
      }
    }
  }

  Bus.subscribe(Command.Event.Executed, async (payload) => {
    if (payload.properties.name === Command.Default.INIT) {
      Project.setInitialized(Instance.project.id)
    }
  })
}
