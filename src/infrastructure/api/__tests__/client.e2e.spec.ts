import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { Umzug } from "umzug";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import { clientRoute } from "../routes/routeClient";
import ClientModel from "../../../modules/client-adm/repository/client.model";

describe("E2E test for client", () => {

    const app: Express = express()
    app.use(express.json())
    app.use("/client", clientRoute)

    let sequelize: Sequelize;
    let migration: Umzug<any>;

    beforeEach(async () => {
        sequelize = new Sequelize({
          dialect: 'sqlite',
          storage: ":memory:",
          logging: false,
        })
        
        sequelize.addModels([ClientModel])
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


    it("Should create a client", async()=>{

        const response = await request(app)
            .post("/client")
            .send({
                name: "Teste 1",
                email: "teste1@email",
                document: "123456",
                address:{
                    street: "Street",
                    number: "1",
                    complement: "Complement",
                    city: "City",
                    state: "State",
                    zipCode: "12345678"
                }
                
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe("Teste 1");
        expect(response.body.email).toBe("teste1@email");
        expect(response.body.document).toBe("123456");
        expect(response.body.address._street).toBe("Street");
        expect(response.body.address._number).toBe("1");
        expect(response.body.address._complement).toBe("Complement");
        expect(response.body.address._city).toBe("City");
        expect(response.body.address._state).toBe("State");
        expect(response.body.address._zipCode).toBe("12345678");

    });
});