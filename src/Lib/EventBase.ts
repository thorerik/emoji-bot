import { Properties } from "../Lib/Properties";

export class EventBase {
    public subscribe = "message";

    protected props: Properties;

    constructor() {
        this.props = Properties.getInstance();
    }
}
