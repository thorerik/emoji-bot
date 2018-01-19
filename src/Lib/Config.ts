import { readFileSync } from "fs";

export class Config {

    public config: {
        database: {
            host: string,
            database: string,
            username: string,
            password: string,
            port: number,
            dialect: string,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        },
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
        const buffer = readFileSync(configFile);
        this.config = JSON.parse(buffer.toString());
    }
}
