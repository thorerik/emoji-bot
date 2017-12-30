"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(configFile) {
        this.config = require(configFile);
    }
}
exports.Config = Config;
