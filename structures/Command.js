import {
  CustomCommandParamType as CommandType,
  CommandPermissionLevel as Permission,
} from "@minecraft/server";

/**
 * @typedef {Object} CommandParameter
 * @property {string} name
 * @property {number} type
 * @property {boolean} required
 */

export class Command {
  constructor() {
    /** @type {string} */
    this.name = "";

    /** @type {string} */
    this.description = "";

    /** @type {number} */
    this.permissionLevel = 0;

    /** @type {CommandParameter[]} */
    this.mandatoryParameters = [];

    /** @type {CommandParameter[]} */
    this.optionalParameters = [];
    
    this.enums = new Map();
  }

  /**
   * Sets the name of the command.
   * @param {string} name - Command name.
   * @returns {Command}
   */
  setName(name) {
    this.name = name;
    return this;
  }

  /**
   * Sets the description of the command.
   * @param {string} desc - Command description.
   * @returns {Command}
   */
  setDescription(desc) {
    this.description = desc;
    return this;
  }

  /**
   * Sets the required permission level for the command.
   * Accepts a number (0–4) or a string ("Any", "GameDirectors", "Admin", "Host", "Owner").
   * @param {number | "Any" | "GameDirectors" | "Admin" | "Host" | "Owner"} level
   * @returns {Command}
   */
  setPermission(level) {
    const map = {
      Any: Permission.Any,
      GameDirectors: Permission.GameDirectors,
      Admin: Permission.Admin,
      Host: Permission.Host,
      Owner: Permission.Owner,
    };

    if (typeof level === "string") {
      const resolved = map[level];
      if (resolved === undefined)
        throw new Error(`Invalid permission level string: ${level}`);
      this.permissionLevel = resolved;
    } else if (typeof level === "number") {
      if (level < 0 || level > 4)
        throw new Error(`Invalid permission level number: ${level}`);
      this.permissionLevel = level;
    } else {
      throw new Error("Permission level must be a string or number.");
    }

    return this;
  }
  
  /**
   * Registers a custom enum for use in enum parameters.
   * @param {string} enumName - Must be prefixed (e.g. "stk:my_enum")
   * @param {string[]} values - Enum values
   * @returns {Command}
   */
  registerEnum(enumName, values) {
    if (!Array.isArray(values) || values.length === 0)
      throw new Error("Enum values must be a non-empty array.");
    this.enums.set(enumName, values);
    return this;
  }
  
    /**
   * Adds an enum option (parameter that refers to a previously registered enum).
   * @param {string} enumName - Must match the name used in registerEnum
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addEnumOption(enumName, required = false) {
    if (!this.enums.has(enumName)) {
      throw new Error(`Enum "${enumName}" is not registered.`);
    }
    const param = { type: CommandType.Enum, name: enumName };
    if (required) {
      this.mandatoryParameters.push(param);
    } else {
      this.optionalParameters.push(param);
    }
    return this;
  }

  /**
   * Adds a string parameter to the command.
   * @param {string} name - Name of the parameter.
   * @param {boolean} [required=false] - Whether the parameter is required.
   * @returns {Command}
   */
  addStringOption(name, required = false) {
    return this._addOption(name, CommandType.String, required);
  }

  /**
   * Adds a boolean parameter to the command.
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addBooleanOption(name, required = false) {
    return this._addOption(name, CommandType.Boolean, required);
  }

  /**
   * Adds an integer parameter to the command.
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addIntegerOption(name, required = false) {
    return this._addOption(name, CommandType.Integer, required);
  }

  /**
   * Adds a float parameter to the command.
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addFloatOption(name, required = false) {
    return this._addOption(name, CommandType.Float, required);
  }

  /**
   * Adds an entity selector parameter (e.g., @e, @a).
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addEntitySelectorOption(name, required = false) {
    return this._addOption(name, CommandType.EntitySelector, required);
  }

  /**
   * Adds a player selector parameter (e.g., @a, @s).
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addPlayerSelectorOption(name, required = false) {
    return this._addOption(name, CommandType.PlayerSelector, required);
  }

  /**
   * Adds a position (x y z) parameter to the command.
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addPositionOption(name, required = false) {
    return this._addOption(name, CommandType.Position, required);
  }

  /**
   * Adds a block type parameter to the command.
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addBlockTypeOption(name, required = false) {
    return this._addOption(name, CommandType.BlockType, required);
  }

  /**
   * Adds an item type parameter to the command.
   * @param {string} name
   * @param {boolean} [required=false]
   * @returns {Command}
   */
  addItemTypeOption(name, required = false) {
    return this._addOption(name, CommandType.ItemType, required);
  }

  /**
   * Internal method to register a parameter.
   * @private
   * @param {string} name
   * @param {number} type
   * @param {boolean} required
   * @returns {Command}
   */
  _addOption(name, type, required) {
    const param = { name, type };
    if (required) {
      this.mandatoryParameters.push(param);
    } else {
      this.optionalParameters.push(param);
    }
    return this;
  }
}
