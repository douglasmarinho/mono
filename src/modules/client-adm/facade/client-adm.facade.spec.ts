import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/facade.factory";
import ClientModel from "../repository/client.model";


describe("ClientAdmFacade test", () => {
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

    const clientFacade = ClientAdmFacadeFactory.create();

    const input ={
        id: "1",
        name: "Cliente 1",
        email: "cliente1@email.com",
        address: "Rua 1 Cidade 1",
    }

    await clientFacade.add(input);

    const clientDB = await ClientModel.findOne({ where: { id: "1" } });

    expect(clientDB).toBeDefined();
    expect(clientDB?.id).toBe(input.id);
    expect(clientDB?.name).toBe(input.name);
    expect(clientDB?.address).toBe(input.address);
    expect(clientDB?.createdAt).toBeDefined();
    expect(clientDB?.updatedAt).toBeDefined();
  });

  it("should find a client", async () => {

    const clientFacade = ClientAdmFacadeFactory.create();
    const input ={
        id: "1",
        name: "Cliente 1",
        email: "cliente1@email.com",
        address: "Rua 1 Cidade 1",
    }
    await clientFacade.add(input);

    const result = await clientFacade.find({ id: "1" });

    expect(result).toBeDefined();
    expect(result.id).toBe(input.id);
    expect(result.name).toBe(input.name);
    expect(result.address).toBe(input.address);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});