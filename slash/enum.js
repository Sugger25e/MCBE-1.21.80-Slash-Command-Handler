import { world } from "@minecraft/server";
import { Command } from "../structures/Command";

export default {
  data: new Command()
  .setName("enum")
  .setDescription("Lorem ipsum")
  .registerEnum("foo_enum", ["foo", "bar", "doe"])
  .addEnumOption("cmd:foo_enum", true) //PREFIX IS A MUST! Format: prefix:enumName
  .setPermission("Any"),
  run: (system, origin, args) => {  
    world.sendMessage(`Selected enum: ${args[0]}`);      
  }
};
