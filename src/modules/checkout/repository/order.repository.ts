import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    try {
      await OrderModel.create({
        id: order.id.id,
        client: order.client,
        products: order.products,
        status: order.status,
      });
    } catch (e) {
      console.log("OrderRepository",e);
    }
  }

  async findOrder(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id } });

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    return new Order({
        id: new Id(order.id),
        client: new Client({
            id: new Id(order.client.id),
            name: order.client.name,
            email: order.client.email,
            address: new Address(order.client.street, 
                order.client.number, 
                order.client.complement, 
                order.client.city,
                order.client.state,
                order.client.zipCode),
        }),
        products: order.products.map((product)=>
            new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice?? (product.purchasePrice * 2.5),
        })),
        status: order.status,
    });
  }
}