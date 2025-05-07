import { world, system } from "@minecraft/server"; 
import { eventRegistry } from "./events/index.js";
import { slashRegistry } from "./slash/index.js"

system.run(() => {
  for (const event of eventRegistry) {
    const eventGroup = event.type === 0 ? world.beforeEvents : world.afterEvents;

    eventGroup[event.name].subscribe((...args) => {
      event.run(...args);
    });
  }
});

const COMMAND_PREFIX = "stk:"

system.beforeEvents.startup.subscribe((init) => {
  for (const cmd of slashRegistry) {
    const def = {
      ...cmd.data,
      name: `${COMMAND_PREFIX}${cmd.data.name}`,
    };

init.customCommandRegistry.registerCommand(def, (origin, ...args) => {
    let base = null;

  switch (origin.sourceType) {
    case "Entity":
      base = origin.sourceEntity;
      break;
    case "Block":
      base = origin.sourceBlock;
      break;
    case "NPCDialogue":
      base = origin.sourceInitiator;
      break;
    case "Server":
      base = origin.sourceEntity; 
      break;
  }

  const orig = {
    source: base,
    sourceType: origin.sourceType
  };

  return cmd.run(system, orig, args);
});
  }
});
