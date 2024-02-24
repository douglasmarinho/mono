import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ClientModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should create a client", async () => {
      const clientProps = {
        id: new Id("1"),
        name: "Cliente 1",
        email: "cliente1@email.com",
        address: "Rua 1",
      };
      const client = new Client(clientProps);
      const clientRepository = new ClientRepository();
      await clientRepository.add(client);
  
      const clientDb = await ClientModel.findOne({
        where: { id: clientProps.id.id },
      });
  
      expect(clientDb.id).toEqual(clientProps.id.id);
      expect(clientDb.name).toEqual(clientProps.name);
      expect(clientDb.email).toEqual(clientProps.email);
      expect(clientDb.address).toEqual(clientProps.address);
    });
  
    it("should find a client", async () => {
      const clientRepository = new ClientRepository();
  
      ClientModel.create({
        id: "123",
        name: "Cliente 1",
        email: "cliente1@email.com",
        address: "Rua",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      const client = await clientRepository.find("123");
  
      expect(client.id.id).toEqual("123");
      expect(client.name).toEqual("Cliente 1");
      expect(client.email).toEqual("cliente1@email.com");
      expect(client.address).toEqual("Rua");
      
    });
  });