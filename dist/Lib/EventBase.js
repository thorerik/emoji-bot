"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Properties_1 = require("../Lib/Properties");
class EventBase {
    constructor() {
        this.subscribe = "message";
        this.props = Properties_1.Properties.getInstance();
    }
}
exports.EventBase = EventBase;
