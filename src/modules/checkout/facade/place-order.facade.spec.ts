import { Sequelize } from "sequelize-typescript"
import OrderModel from "../repository/order.model"
import Address from "../../@shared/domain/value-object/address";
import ClientModel from "../../client-adm/repository/client.model";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import ProcessPaymentFacadeFactory from "../../payment/factory/facade.factory";
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";
import PlaceOrderFacade from "./place-order.facade";
import OrderRepository from "../repository/order.repository";
import ProductAdmModel from "../../product-adm/repository/product.model";
import StorageModel from "../../store-catalog/repository/product.model";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { Umzug } from "umzug";
import TransactionModel from "../../payment/repository/transaction.model";
import InvoiceItemsModel from "../../invoice/repository/invoice.items.model";
import InvoiceModel from "../../invoice/repository/invoice.model";


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
    salesPrice: 250,
};


describe("Place Order Facade test", () => {

    let sequelize: Sequelize;
    let migration: Umzug<any>;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([OrderModel, ClientModel, ProductAdmModel, StorageModel, TransactionModel, InvoiceModel, InvoiceItemsModel])
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
  
    it("should  a place order", async () => {
      const clientFacade = ClientAdmFacadeFactory.create();
      const productFacade =  ProductAdmFacadeFactory.create();
      const catalogFacade = StoreCatalogFacadeFactory.create();
      const repository = new OrderRepository();
      const invoiceFacade = InvoiceFacadeFactory.create();
      const paymentFacade = ProcessPaymentFacadeFactory.create();

      const placeOrderUsecase = new PlaceOrderUsecase(clientFacade,
        productFacade,
        catalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
      );

      const facade = new PlaceOrderFacade({
         addUsecase: placeOrderUsecase,
      });

      await productFacade.addProduct(productProps);
      await productFacade.addProduct(productProps2);

      await clientFacade.add(clientProps);
        
  
      const input = {
        clientId: "1",
        products:[
          {productId: "1"},
          {productId: "2"},
        ]
      }

      const output = await facade.add(input)


      expect(output.id).toBeDefined();
      expect(output.status).toBe("approved");
      expect(output.invoiceId).toBeDefined();
      expect(output.total).toBe(400);
      expect(output.products.length).toBe(2);
  });

});
