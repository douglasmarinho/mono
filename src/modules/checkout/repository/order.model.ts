import {
  BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
  } from "sequelize-typescript";
import ClientModel from "../../client-adm/repository/client.model";
import ProductModel from "./product.model";
  
  @Table({
    tableName: "orders",
    timestamps: false,
  })
  export default class OrderModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;
  
    @Column({ allowNull: true })
    declare invoiceId: string;
  
    @Column({ allowNull: false })
    declare status: string;
  
    @Column({ allowNull: true })
    declare createdAt: Date;
  
    @Column({ allowNull: true })
    declare updatedAt: Date;

   /* @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    declare client_id: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;*/

    @Column({ allowNull: false, type: DataType.JSON })
    declare client: ClientModel;

    @Column({ allowNull: false, type: DataType.JSON })
    declare products: ProductModel[];
  }