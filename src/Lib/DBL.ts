import { request } from "https";
import { stringify } from "querystring";

import { Properties } from "./Properties";

export class DBL {
    public static postStats() {
        const props = Properties.getInstance();
        if (!props.config.config.dblToken) {
            return;
        }
        const data = stringify({ server_count: props.client.guilds.size });
        const req = request({
            headers: {
                "Authorization": props.config.config.dblToken,
                "Content-Length": Buffer.byteLength(data),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            host: "discordbots.org",
            method: "POST",
            path: `/api/bots/${props.client.user.id}/stats`,
        });
        req.write(data);
        req.end();
    }
}
