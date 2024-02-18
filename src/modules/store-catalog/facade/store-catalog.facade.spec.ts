import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("StoreCatalogFacade test", ()=>{
    let sequelize: Sequelize;

    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "memory",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should find all products", async()=>{
        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id:"1",
            name: "Product 1",
            description: "Product 1 Description",
            salesPrice: 1
        });
  
        await ProductModel.create({
            id:"2",
            name: "Product 2",
            description: "Product 2 Description",
            salesPrice: 2
        });

        const result = await facade.findAll();

        expect(result.products[0].id).toBe("1");
        expect(result.products[0].name).toBe("Product 1");
        expect(result.products[0].description).toBe("Product 1 Description");
        expect(result.products[0].salesPrice).toBe(1);

        expect(result.products[1].id).toBe("2");
        expect(result.products[1].name).toBe("Product 2");
        expect(result.products[1].description).toBe("Product 2 Description");
        expect(result.products[1].salesPrice).toBe(2);


    });

    it("should find a product", async()=>{

        const facade = StoreCatalogFacadeFactory.create();
        
        await ProductModel.create({
            id:"123",
            name: "Product 1",
            description: "Product 1 Description",
            salesPrice: 1
        });

        const input ={
            id: "123",
        };
        const result = await facade.find(input);

        expect(result.id).toBe("123");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Product 1 Description");
        expect(result.salesPrice).toBe(1);
    });
});