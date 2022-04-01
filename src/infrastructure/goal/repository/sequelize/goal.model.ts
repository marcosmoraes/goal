
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
// import UserModel from "../../../../../user/infrastructure/database/sequelize/model/user.model";

//https://stackoverflow.com/questions/39587767/disable-updatedat-update-date-field-in-sequelize-js
@Table({
    tableName: "goal",
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
})
export default class GoalModel extends Model {

    @PrimaryKey
    @Column
    declare id: string

   // @ForeignKey(() => UserModel)
    @Column({ allowNull: false })
    declare userId: string

    // @BelongsTo(()=> UserModel)
    // declare user: UserModel

    @Column({ allowNull: false })
    declare description: string

    @Column({ allowNull: false })
    declare goalLevel: string

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: true })
    declare finishedAt: Date;

    @Column({ allowNull: false })
    declare status: string

}