import { system } from "@minecraft/server"; 
import { slashRegistry } from "./slash/index.js"

const COMMAND_PREFIX = "cmd:" //Required

system.beforeEvents.startup.subscribe((init) => {
  
  for (const cmd of slashRegistry) {
    const def = {
      ...cmd.data,
      name: `${COMMAND_PREFIX}${cmd.data.name}`
    };
    
    init.customCommandRegistry.registerCommand(def, cmd.run);
  }
});