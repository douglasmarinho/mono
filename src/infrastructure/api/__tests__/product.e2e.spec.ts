import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import ProductModel from "../../../modules/product-adm/repository/product.model";
import ProductModelCatalog  from "../../../modules/store-catalog/repository/product.model";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { productRoute } from "../routes/routeProduct";

describe("E2E test for product", () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/product", productRoute)

    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: 'sqlite',
          storage: ":memory:",
          logging: false,
        })
        
        sequelize.addModels([ProductModel, ProductModelCatalog])
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


    it("Should create a product", async()=>{

        const response = await request(app)
            .post("/product")
            .send({
                name: "Teste 1",
                description: "Product 1 description",
                purchasePrice: 100,
                stock: 10,
                
            });
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Teste 1");
        expect(response.body.description).toBe("Product 1 description");
        expect(response.body.purchasePrice).toBe(100);
        expect(response.body.stock).toBe(10);

    });
});