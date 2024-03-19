import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import { AddProductAdmFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const facade =  ProductAdmFacadeFactory.create();
    try {
      const productDto: AddProductAdmFacadeInputDto = {
        name: req.body.name,
        description: req.body.description,
        purchasePrice: req.body.purchasePrice,
        stock: req.body.stock,
      };
      
      const output = await facade.addProduct(productDto);
      res.send(output)
    } catch (err) {
      res.status(500).send(err)
    }
})