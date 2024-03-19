import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import OrderModel from "./order.model";
import Product from "../domain/product.entity";
import ClientModel from "../../client-adm/repository/client.model";
import ProductModel from "../../product-adm/repository/product.model";
import OrderRepository from "./order.repository";
import Order from "../domain/order.entity";
import Address from "../../@shared/domain/value-object/address";

describe("Order sequelize repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([OrderModel, ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "client@email.com",
      address: new Address("Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888") ,
    });

    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      salesPrice: 20,
    });

    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 30,
    });

    const orderprops  = {
      client: client,
      products: [product1, product2],
    }
    const order = new Order(orderprops);

    const orderRepository = new OrderRepository();
    await orderRepository.addOrder(order);

    const result = await OrderModel.findOne({
      where: { id: order.id.id },
    });
    
    expect(order.id.id).toEqual(result.id);
    
    expect(result.client).toBeDefined();
    expect(order.client).toEqual({
      ...result.client,
      _id: expect.any(Object),
      _address: expect.any(Object),
      _createdAt: expect.any(Date),
      _updatedAt: expect.any(Date),
    });
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(result.products.length).toEqual(2);

    expect(order.status).toBe("pending");
  });

  /*it("should find a order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      address: new Address("Rua 123",
      "99",
      "Casa Verde",
      "Criciúma",
      "SC",
      "88888-888") ,
    });

    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Description 1",
      salesPrice: 20,
    });

    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 20,
    });

    await OrderModel.create({
      id: new Id("1").id,
      client: client,
      products: [product1, product2],
      status: "pending",
    });

    const orderRepository = new OrderRepository();
    const result = await orderRepository.findOrder("1");

    expect(result.id.id).toEqual("1");
    expect(result.client.id).toEqual(client.id.id);
    expect(result.client.id).toBeDefined();
    expect(result.client.name).toEqual(client.name);
    expect(result.client.email).toEqual(client.email);
    expect(result.client.address.street).toEqual(client.address.street);
    expect(result.client.address.number).toEqual(client.address.number);
    expect(result.client.address.complement).toEqual(client.address.complement);
    expect(result.client.address.city).toEqual(client.address.city);
    expect(result.client.address.state).toEqual(client.address.state);
    expect(result.client.address.zipCode).toEqual(client.address.zipCode);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(result.products.length).toEqual(2);
  });*/
});