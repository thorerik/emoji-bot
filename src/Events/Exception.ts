import * as log from "fancy-log";

import { EventBase } from "../Lib/EventBase";
import { LogError } from "../Lib/LogError";

export class Exception extends EventBase {
    public subscribe = "error";
    private logger = new LogError();
    constructor() {
        super();
    }
    public run(error: Error) {
        log.error(error);
        this.logger.Log(error);
    }
}
