import express, { Request, Response } from "express";
import PlaceOrderFacadeFactory from "../../../modules/checkout/factory/facade.factory";
import { AddPlaceOrderInputDto } from "../../../modules/checkout/facade/place-order.facade.interface";


export const checkoutRoute = express.Router();


checkoutRoute.post("/", async (req: Request, res: Response) => {

    const facade =  PlaceOrderFacadeFactory.create();
    try {
      const placeOrderDto: AddPlaceOrderInputDto = {
        clientId: req.body.clientId,
        products: req.body.products,
      }
      
      
      const output = await facade.add(placeOrderDto)
      res.send(output)
    } catch (err) {
      res.status(500).send(err)
    }
  })