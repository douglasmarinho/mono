import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { checkoutRoute } from "../routes/routeCheckout";
import OrderModel from "../../../modules/checkout/repository/order.model";
import ClientModel from "../../../modules/client-adm/repository/client.model";
import TransactionModel from "../../../modules/payment/repository/transaction.model";
import InvoiceItemsModel from "../../../modules/invoice/repository/invoice.items.model";
import InvoiceModel from "../../../modules/invoice/repository/invoice.model";
import ProductAdmModel from "../../../modules/product-adm/repository/product.model";
import StorageModel from "../../../modules/store-catalog/repository/product.model";
import Address from "../../../modules/@shared/domain/value-object/address";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";


const clientProps = {
  id: "1",
  name: "Client 1",
  email: "Client@teste.com",
  document: "1234-5678",
  address: new Address(
    "Rua 123",
    "99",
    "Casa Verde",
    "Criciúma",
    "SC",
    "88888-888"
  )
};

const productProps = {
  id: "1",
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 100,
  stock: 10,
  salesPrice: 150,
};

const productProps2 = {
  id: "2",
  name: "Product 2",
  description: "Product 2 description",
  purchasePrice: 200,
  stock: 20,
  salesPrice: 350,
};

describe("E2E test for checkout", () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/checkout", checkoutRoute)

    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: 'sqlite',
          storage: ":memory:",
          logging: false,
        })
        
        sequelize.addModels([OrderModel, ClientModel, ProductAdmModel, StorageModel, TransactionModel, InvoiceModel, InvoiceItemsModel])
        migration = migrator(sequelize)
        migration = migrator(sequelize)
        await migration.up()
      })
    
      afterEach(async () => {
        if (!migration || !sequelize) {
          return 
        }
        migration = migrator(sequelize)
        await migration.down()
        await sequelize.close()
      })


    it("Should create a checkout", async()=>{

      const clientFacade = ClientAdmFacadeFactory.create();
      const productFacade =  ProductAdmFacadeFactory.create();
      await productFacade.addProduct(productProps);
      await productFacade.addProduct(productProps2);

      await clientFacade.add(clientProps);


      const response = await request(app)
            .post("/checkout")
            .send({
              clientId: "1",
              products:[
                {productId: "1"},
                {productId: "2"},
              ]
            });

      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
      expect(response.body.status).toBe("approved");
      expect(response.body.invoiceId).toBeDefined();
      expect(response.body.total).toBe(500);
      expect(response.body.products.length).toBe(2);

    });
});