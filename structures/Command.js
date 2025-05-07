import { CustomCommandParamType as CommandType } from "@minecraft/server";

export class Command {
  constructor() {
    this.name = "";
    this.description = "";
    this.permissionLevel = 0;
    this.mandatoryParameters = [];
    this.optionalParameters = [];
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setDescription(desc) {
    this.description = desc;
    return this;
  }

  setPermission(level) {
    this.permissionLevel = level;
    return this;
  }

  addStringOption(name, required=false) {
    return this._addOption(name, CommandType.String, required);
  }

  addBooleanOption(name, required=false) {
    return this._addOption(name, CommandType.Boolean, required);
  }

  addIntegerOption(name, required=false) {
    return this._addOption(name, CommandType.Integer, required);
  }

  addFloatOption(name, required=false) {
    return this._addOption(name, CommandType.Float, required);
  }

  addEntitySelectorOption(name, required=false) {
    return this._addOption(name, CommandType.EntitySelector, required);
  }

  addPlayerSelectorOption(name, required=false) {
    return this._addOption(name, CommandType.PlayerSelector, required);
  }

  addPositionOption(name, required=false) {
    return this._addOption(name, CommandType.Position, required);
  }

  addBlockTypeOption(name, required=false) {
    return this._addOption(name, CommandType.BlockType, required);
  }

  addItemTypeOption(name, required=false) {
    return this._addOption(name, CommandType.ItemType, required);
  }

  _addOption(name, type, required) {
    const param = { name, type, required };
    if (required) {
      this.mandatoryParameters.push(param);
    } else {
      this.optionalParameters.push(param);
    }
    return this;
  }
}
