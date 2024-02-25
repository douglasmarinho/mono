import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemsModel from "./invoice.items.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "../domain/invoice.items.entity";
import InvoiceRepository from "./invoice.repository";

const invoiceProps = {
  id: new Id("1"),
  name: "Cliente 1",
  document: "1234567891",
  address: new Address(
      "Street",
      "1",
      "complement",
      "state",
      "city",
      "12345",
  ),
  items:[new InvoiceItems({
    id: new Id("1"),
    name: "Item 1",
    price: 10
})],
};

const invoiceProps2 = {
  id: new Id("2"),
  name: "Cliente 2",
  document: "1234567899",
  address: new Address(
      "Street 2",
      "2",
      "complement 2",
      "state 2 ",
      "city 2",
      "123",
  ),
  items:[new InvoiceItems({
    id: new Id("2"),
    name: "Item 2",
    price: 100
})],
};

describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([InvoiceModel,InvoiceItemsModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should generate a invoice", async () => {

      const invoice = new Invoice(invoiceProps);
      const invoiceRepository = new InvoiceRepository();
      await invoiceRepository.genarate(invoice);
  
      const invoiceDb = await InvoiceModel.findOne({
        where: { id: invoiceProps.id.id }, 
        include: ["items"]
      });

      let itemsDb: InvoiceItems[] = [];
          
      invoiceDb.items.forEach((item) => {
        itemsDb.push(new InvoiceItems({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
        }))    
      });
  
      expect(invoiceDb.id).toBe(invoiceProps.id.id);
      expect(invoiceDb.name).toBe(invoiceProps.name);
      expect(invoiceDb.document).toBe(invoiceProps.document);
      expect(invoiceDb.street).toBe(invoiceProps.address.street);
      expect(invoiceDb.number).toBe(invoiceProps.address.number);
      expect(invoiceDb.complement).toBe(invoiceProps.address.complement);
      expect(invoiceDb.state).toBe(invoiceProps.address.state);
      expect(invoiceDb.city).toBe(invoiceProps.address.city);
      expect(invoiceDb.zipCode).toBe(invoiceProps.address.zipCode);
      expect(invoiceDb.items.length).toEqual(1);
      expect(itemsDb[0].id.id).toBe(invoiceProps.items[0].id.id);
      expect(itemsDb[0].name).toBe(invoiceProps.items[0].name);
      expect(itemsDb[0].price).toBe(invoiceProps.items[0].price);
    });
  
    it("should find a invoice", async () => {
      
      const invoice = new Invoice(invoiceProps);
      const invoice2 = new Invoice(invoiceProps2);
      const invoiceRepository = new InvoiceRepository();
      await invoiceRepository.genarate(invoice);
      await invoiceRepository.genarate(invoice2);

      const invoiceDb = await invoiceRepository.find("2");
  
      expect(invoiceDb.id.id).toBe(invoiceProps2.id.id);
      expect(invoiceDb.name).toBe(invoiceProps2.name);
      expect(invoiceDb.document).toBe(invoiceProps2.document);
      expect(invoiceDb.address.street).toBe(invoiceProps2.address.street);
      expect(invoiceDb.address.number).toBe(invoiceProps2.address.number);
      expect(invoiceDb.address.complement).toBe(invoiceProps2.address.complement);
      expect(invoiceDb.address.state).toBe(invoiceProps2.address.state);
      expect(invoiceDb.address.city).toBe(invoiceProps2.address.city);
      expect(invoiceDb.address.zipCode).toBe(invoiceProps2.address.zipCode);
      expect(invoiceDb.items.length).toEqual(1);
      expect(invoiceDb.items[0].id.id).toBe(invoiceProps2.items[0].id.id);
      expect(invoiceDb.items[0].name).toBe(invoiceProps2.items[0].name);
      expect(invoiceDb.items[0].price).toBe(invoiceProps2.items[0].price);
      
    });
  });