import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName:"invoiceitems",
    timestamps: false,
})
export default class InvoiceItemsModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel;

    @Column({allowNull: false})
    name: string;

    @Column({allowNull: false})
    price: number;
}