import { world, CommandPermissionLevel as Permission } from "@minecraft/server";
import { Command } from "../structures/Command";

export default {
  data: new Command()
  .setName("ping")
  .setDescription("Ping pong")
  .addStringOption("name", true)
  .addIntegerOption("amount", false)
  .setPermission(Permission.Any), //or just "Any"
  run: (system, origin, args) => {
  
    world.sendMessage(`Hello, ${origin.sourceType === "Entity" ? origin.source.name : origin.sourceType}!`);

      world.sendMessage(`another ${args[0]}`)
    
    if (args[1]) {
      world.sendMessage(`yo ${args[1]}`)
    }
  }
};
