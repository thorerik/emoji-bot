"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const querystring_1 = require("querystring");
const Properties_1 = require("./Properties");
class DBL {
    static postStats() {
        const props = Properties_1.Properties.getInstance();
        if (!props.config.config.dblToken) {
            return;
        }
        const data = querystring_1.stringify({ server_count: props.client.guilds.size });
        const req = https_1.request({
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
exports.DBL = DBL;
