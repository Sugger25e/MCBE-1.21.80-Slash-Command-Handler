import { world, system, CommandPermissionLevel as Permission } from "@minecraft/server";
import { Command } from "../structures/Command";

export default {
  data: new Command()
  .setName("ping")
  .setDescription("Ping pong")
  .addStringOption("name", true) //option_name, required: true/false
  .addIntegerOption("amount", false)
  .setPermission(Permission.Any),
  run: (system, origin, args) => {
  //when adding options, it must be in a correct sequence for args to be accurately working. 
  // suggestion: add mandatory options first before optional ones.
    
    console.warn(JSON.stringify(origin.name))
    world.sendMessage(`Hello, ${origin.sourceType === "Entity" ? origin.name : origin.sourceType}!`);

      world.sendMessage(`another ${args[0]}`)
    
    if (args[1]) {
      world.sendMessage(`yo ${args[1]}`)
    }
    
    return { status: 0 }; 
  }
};
