import invoiceGateway from "../../gateway/invoce.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";
import Invoice from "../../domain/invoice.entity"
import InvoiceItems from "../../domain/invoice.items.entity"
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";

export default class GenerateInvoiceUseCase{


    constructor(private _invoiceRepository: invoiceGateway) {}

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>{

        const items = await input.items.map((item) =>{
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            });
        });

        const props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,   
                input.state,             
                input.zipCode,
            ),
            items: items
        };

        const invoice = new Invoice(props);

        await this._invoiceRepository.genarate(invoice);

        let itemsOutput: {
            id: string;
            name: string;
            price: number;
          }[] = [];

        invoice.items.forEach((item) => {
            itemsOutput.push({
                id: item.id.id,
                name: item.name,
                price: item.price
            });
        });

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: itemsOutput,
            total: invoice.total(),
        };
    }
}