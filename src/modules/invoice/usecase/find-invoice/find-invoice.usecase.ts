import invoiceGateway from "../../gateway/invoce.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";


export default class FindInvoiceUseCase{


    constructor(private _invoiceRepository: invoiceGateway) {}

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO>{

        const invoice = await this._invoiceRepository.find(input.id);

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
            address:{
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
            },
            items: itemsOutput,
            total: invoice.total(),
            createdAt: invoice.createdAt
        };
    }
}