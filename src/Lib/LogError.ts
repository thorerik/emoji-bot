import { Message, Util, WebhookClient } from "discord.js";
import * as moment from "moment";
import { Properties } from "./Properties";

export class LogError {

    private props = Properties.getInstance();

    /**
     * Log
     */
    public async Log(error: Error) {
        const webhookContent = {
            content: `:x: ** ERROR **`,
            embeds: [{
                color: Util.resolveColor("RED"),
                fields: [
                    { name: "Exception", value: error.message, inline: false },
                    { name: "Stack", value: error.stack, inline: false},
                ],
                title: moment().format("ddd, Do of MMM @ HH:mm:ss"),
            }],
        };

        await this.props.getLogWebhookInstance().send(webhookContent);
    }
}
