"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const EventBase_1 = require("../Lib/EventBase");
const LogError_1 = require("../Lib/LogError");
class Exception extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "error";
        this.logger = new LogError_1.LogError();
    }
    run(error) {
        log.error(error);
        this.logger.Log(error);
    }
}
exports.Exception = Exception;
