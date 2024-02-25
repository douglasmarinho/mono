import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../domain/invoice.items.entity";
import InvoiceGateway from "../gateway/invoce.gateway";
import Address from "../value-object/address";
import InvoiceItemsModel from "./invoice.items.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway{

    async genarate(invoice: Invoice): Promise<void> {
          await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map((item)=>({
                id: item.id.id,
                invoice_id: invoice.id.id,
                name: item.name,
                price: item.price,
            })),   
        },
        {
         include:[{model: InvoiceItemsModel}],
        }
        );
    }
   
    async find(id: string): Promise<Invoice> {
        const invoiceModel = await InvoiceModel.findOne({
            where: { id: id }, 
            include: ["items"]
        });

        let itemsDb: InvoiceItems[] = [];
          
        invoiceModel.items.forEach((item) => {
            itemsDb.push(new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            }))    
        });

        return new Invoice({
            id: new Id(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: new Address(
                invoiceModel.street,
                invoiceModel.number,
                invoiceModel.complement,
                invoiceModel.state,
                invoiceModel.city,
                invoiceModel.zipCode,
            ),
            items: itemsDb,
            createdAt: invoiceModel.createdAt,
        });
    }

}