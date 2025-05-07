import { system } from "@minecraft/server"; 
import { slashRegistry } from "./slash/index.js"

const COMMAND_PREFIX = "cmd:" //Required

system.beforeEvents.startup.subscribe((init) => {
  for (const cmd of slashRegistry) {
    const def = {
      ...cmd.data,
      name: `${COMMAND_PREFIX}${cmd.data.name}`,
    };

    init.customCommandRegistry.registerCommand(def, (origin, ...args) => {
     let source;
     switch(origin.sourceType) {
       case "Entity":
         source = {
           ...origin.sourceEntity,
           sourceType: origin.sourceType
           };
         break;
       case "Block":
         source = {
           ...origin.sourceBlock,
           sourceType: origin.sourceType
           }
         break;
       case "NPCDialogue":
         source = {
           ...origin.sourceInitiator,
           sourceType: origin.sourceType
           }
         break;
       case "Server": 
         source = {
           ...origin.sourceEntity,
           sourceType: origin.sourceType
           }
         break;
     }

      return cmd.run(system, source, args);
    });
  }
});
