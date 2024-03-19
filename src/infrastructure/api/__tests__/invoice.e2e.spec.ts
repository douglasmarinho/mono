import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { checkoutRoute } from "../routes/routeCheckout";
import { invoiceRoute } from "../routes/routeInvoice";
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
  salesPrice: 400,
};

const productProps2 = {
  id: "2",
  name: "Product 2",
  description: "Product 2 description",
  purchasePrice: 200,
  stock: 20,
  salesPrice: 600,
};

describe("E2E test for invoice", () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/invoice", invoiceRoute)

    const appCheckout: Express = express()
    appCheckout.use(express.json())
    appCheckout.use("/checkout", checkoutRoute)

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


    it("Should create a invoice", async()=>{

      const clientFacade = ClientAdmFacadeFactory.create();
      const productFacade =  ProductAdmFacadeFactory.create();
      await productFacade.addProduct(productProps);
      await productFacade.addProduct(productProps2);

      await clientFacade.add(clientProps);

      const responseCheckout = await request(appCheckout)
            .post("/checkout")
            .send({
              clientId: "1",
              products:[
                {productId: "1"},
                {productId: "2"},
              ]
            });

      expect(responseCheckout.status).toBe(200);

      const response = await request(app)
            .get("/invoice")
            .send({
              id: responseCheckout.body.invoiceId
            });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(responseCheckout.body.invoiceId);
      expect(response.body.name).toBe(clientProps.name);
      expect(response.body.document).toBe(clientProps.document);
      expect(response.body.address.street).toBe(clientProps.address.street);
      expect(response.body.address.number).toBe(clientProps.address.number);
      expect(response.body.address.complement).toBe(clientProps.address.complement);
      expect(response.body.address.city).toBe(clientProps.address.city);
      expect(response.body.address.state).toBe(clientProps.address.state);
      expect(response.body.address.zipCode).toBe(clientProps.address.zipCode);
      expect(response.body.items.length).toBe(2);
      expect(response.body.items[0].id).toBe("1");
      expect(response.body.items[0].name).toBe("Product 1");
      expect(response.body.items[0].price).toBe(400);
      expect(response.body.items[1].id).toBe("2");
      expect(response.body.items[1].name).toBe("Product 2");
      expect(response.body.items[1].price).toBe(600);
      expect(response.body.total).toBe(1000);
      expect(response.body.createdAt).toBeDefined();
      
    });
});
