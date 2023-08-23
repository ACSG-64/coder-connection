import {
    Column,
    CreatedAt,
    DataType,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'

@Table
export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataType.UUIDV4 })
    id!: string

    @Column(DataType.STRING(25))
    name!: string

    @Column(DataType.STRING(25))
    surname!: string

    @Column(DataType.STRING(35))
    username!: string

    @Column(DataType.STRING(500))
    description?: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @Column
    gitHubProfileImg!: string

    @Unique
    @Column(DataType.STRING(10))
    slackId!: string

    @Column
    lastSeenAt!: Date

    @CreatedAt
    createdAt!: Date
}
