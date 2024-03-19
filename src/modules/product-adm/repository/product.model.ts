import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName:"products",
    timestamps: false,
})
export default class ProductModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    description: string;

    @Column({allowNull: true})
    purchasePrice: number;

    @Column({allowNull: false})
    stock: number;

    @Column({allowNull: true})
    salesPrice: number;

    @Column({allowNull: false})
    createdAt: Date;

    @Column({allowNull: false})
    updatedAt: Date;
}