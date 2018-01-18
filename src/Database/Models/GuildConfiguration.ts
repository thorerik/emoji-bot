import {
    AutoIncrement,
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from "sequelize-typescript";

@Table
export class GuildConfiguration extends Model<GuildConfiguration> {

    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Unique
    @Column
    public guildID: string;

    @Column
    public settings: string;

}
