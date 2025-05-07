import { world, system, CommandPermissionLevel as Permission } from "@minecraft/server";
import { Command } from "../structures/Command";

export default {
  data: new Command()
  .setName("ping")
  .setDescription("Ping pong")
  .addStringOption("name", true)
  .addIntegerOption("amount", false)
  .setPermission(Permission.Any),
  run: (origin, amount, name) => {
    world.sendMessage("Hello Custom Command!");

    if(name) {
      world.sendMessage(`another ${name}`)
    }
    
    if (amount) {
      world.sendMessage(`yo ${amount}`)
    }
    
    return { status: 0 }; 
  }
};