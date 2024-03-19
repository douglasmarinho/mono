import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/facade.factory";
import { AddClientFacadeInputDto } from "../../../modules/client-adm/facade/client-adm.facade.interface";
import Address from "../../../modules/@shared/domain/value-object/address";

export const clientRoute = express.Router();


clientRoute.post("/", async (req: Request, res: Response) => {

    const facade =  ClientAdmFacadeFactory.create();
    try {
      const productDto: AddClientFacadeInputDto = {
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
        address: new Address(
            req.body.address.street,
            req.body.address.number,
            req.body.address.complement,
            req.body.address.city,
            req.body.address.state,
            req.body.address.zipCode,
          ),
      }
      
      const output = await facade.add(productDto)
      res.send(output)
    } catch (err) {
      res.status(500).send(err)
    }
  })