import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemsModel from "../repository/invoice.items.model";
import InvoiceFacadeFactory from "../factory/facade.factory";

describe("InvoiceFacade test", () => {
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

        const invoiceFacade = InvoiceFacadeFactory.create();

        const input ={
            name: "Cliente 1",
            document: "123456",
            street: "Street",
            number: "1",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "12345",
            items: [{
                id: "1",
                name: "Item 1",
                price: 10,
            },
            {
                id: "2",
                name: "Item 2",
                price: 40,
            }],
        }

        const output = await invoiceFacade.generate(input);
        
        expect(output.id).toBeDefined();
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.street);
        expect(output.number).toBe(input.number);
        expect(output.complement).toBe(input.complement);
        expect(output.state).toBe(input.state);
        expect(output.city).toBe(input.city);
        expect(output.zipCode).toBe(input.zipCode);
        expect(output.items.length).toEqual(2);
        expect(output.items[0].id).toBe(input.items[0].id);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
        expect(output.items[1].id).toBe(input.items[1].id);
        expect(output.items[1].name).toBe(input.items[1].name);
        expect(output.items[1].price).toBe(input.items[1].price);
    });
  
    it("should find a invoice", async () => {
      
        const invoiceFacade = InvoiceFacadeFactory.create();

        const inputGenerate ={
            name: "Cliente 1",
            document: "123456",
            street: "Street",
            number: "1",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "12345",
            items: [{
                id: "1",
                name: "Item 1",
                price: 10,
            },
            {
                id: "2",
                name: "Item 2",
                price: 40,
            },
            {
                id: "3",
                name: "Item 3",
                price: 50,
            }],
        }

        const outputGenerate = await invoiceFacade.generate(inputGenerate);

        const input = {
            id: outputGenerate.id,
        }
        const output = await invoiceFacade.find(input);
        
        expect(output.id).toBe(outputGenerate.id);
        expect(output.name).toBe(inputGenerate.name);
        expect(output.document).toBe(inputGenerate.document);
        expect(output.address.street).toBe(inputGenerate.street);
        expect(output.address.number).toBe(inputGenerate.number);
        expect(output.address.complement).toBe(inputGenerate.complement);
        expect(output.address.state).toBe(inputGenerate.state);
        expect(output.address.city).toBe(inputGenerate.city);
        expect(output.address.zipCode).toBe(inputGenerate.zipCode);
        expect(output.items.length).toEqual(3);
        expect(output.items[0].id).toBe(inputGenerate.items[0].id);
        expect(output.items[0].name).toBe(inputGenerate.items[0].name);
        expect(output.items[0].price).toBe(inputGenerate.items[0].price);
        expect(output.items[1].id).toBe(inputGenerate.items[1].id);
        expect(output.items[1].name).toBe(inputGenerate.items[1].name);
        expect(output.items[1].price).toBe(inputGenerate.items[1].price);
        expect(output.items[2].id).toBe(inputGenerate.items[2].id);
        expect(output.items[2].name).toBe(inputGenerate.items[2].name);
        expect(output.items[2].price).toBe(inputGenerate.items[2].price);
      
    });
});