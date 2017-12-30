export class Config {

    public config: {
        prefix: string,
        token: string,
        owners: string[],
        webhooks: {
            logs: {
                id: string,
                token: string,
            },
        },
    };
    constructor(configFile: string) {
        this.config = require(configFile);
    }
}
