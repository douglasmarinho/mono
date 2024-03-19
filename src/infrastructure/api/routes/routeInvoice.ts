import express, { Request, Response } from "express";
import { FindInvoiceUseCaseInputDTO } from "../../../modules/invoice/usecase/find-invoice/find-invoice.usecase.dto";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";

export const invoiceRoute = express.Router();


invoiceRoute.get("/", async (req: Request, res: Response) => {

    const facade =  InvoiceFacadeFactory.create();
    try {
      const invoiceDto: FindInvoiceUseCaseInputDTO = {
        id: req.body.id
      }

      const output = await facade.find(invoiceDto)
      res.send(output)
    } catch (err) {
      res.status(500).send(err)
    }
  })