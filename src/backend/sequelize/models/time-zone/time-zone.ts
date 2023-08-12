import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Country } from ".";
import { User } from "..";

@Table
export class TimeZone extends Model {
    @PrimaryKey
    @Column
    id!: number

    @Unique
    @Column
    tzIdentifier!: string

    @BelongsTo(() => Country)
    country!: Country
    @ForeignKey(() => Country)
    @Column
    countryId!: string

    @HasMany(() => User)
    users?: User[]
}