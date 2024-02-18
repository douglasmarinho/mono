import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should find all products", async () => {

        await ProductModel.create({
            id:"1",
            name: "Product 1",
            description: "Product 1 Description",
            salesPrice: 1
        })

        await ProductModel.create({
            id:"2",
            name: "Product 2",
            description: "Product 2 Description",
            salesPrice: 2
        })

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("Product 1");
        expect(products[0].description).toBe("Product 1 Description");
        expect(products[0].salesPrice).toBe(1);
        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("Product 2");
        expect(products[1].description).toBe("Product 2 Description");
        expect(products[1].salesPrice).toBe(2);


    });

    it("should find a product", async () => {

      await ProductModel.create({
          id:"1",
          name: "Product 1",
          description: "Product 1 Description",
          salesPrice: 1
      })

      await ProductModel.create({
          id:"2",
          name: "Product 2",
          description: "Product 2 Description",
          salesPrice: 2
      })

      const productRepository = new ProductRepository();
      const product = await productRepository.find("2");

      expect(product.id.id).toBe("2");
      expect(product.name).toBe("Product 2");
      expect(product.description).toBe("Product 2 Description");
      expect(product.salesPrice).toBe(2);

  });
});