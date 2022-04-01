import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

//https://stackoverflow.com/questions/39587767/disable-updatedat-update-date-field-in-sequelize-js
@Table({
    tableName: "user",
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
})
export default class UserModel extends Model {

    @PrimaryKey
    @Column
    declare id: string

    @Column({ allowNull: false })
    declare name: string

    @Column({ allowNull: false })
    declare email: string

    @Column({ allowNull: false })
    declare createdAt: Date;

}