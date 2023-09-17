import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    IsUUID,
    Model,
    Table,
    Unique
} from 'sequelize-typescript'
import { WorkingGroup } from '..'

@Table
export class GroupInvitation extends Model {
    @IsUUID(4)
    @Unique
    @Column({ defaultValue: DataType.UUIDV4 })
    invitationCode!: string

    @Default(false)
    @Column
    isPublic!: boolean

    @BelongsTo(() => WorkingGroup)
    workingGroup!: any
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number
}
