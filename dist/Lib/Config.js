"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Config {
    constructor(configFile) {
        const buffer = fs_1.readFileSync(configFile);
        this.config = JSON.parse(buffer.toString());
    }
}
exports.Config = Config;
