import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItems from "../../domain/invoice.items.entity";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";


const item1 = new InvoiceItems({
    id: new Id("1"),
    name: "Item 1",
    price: 10
});

const item2 = new InvoiceItems({
    id: new Id("2"),
    name: "Item 2",
    price: 20
});

const invoice = new Invoice({
    id: new Id("1"),
    name: "Cliente 1",
    document: "1234567891",
    address: new Address(
        "Street",
        "1",
        "complement",
        "state",
        "city",
        "12345",
    ),
    items:[item1, item2],
    createdAt: new Date()

});

const MockRepository = () =>{
    return {
        genarate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Find Invoice UseCase unit teste",() =>{

    it("Should find a invoice", async()=>{

        const invoiceRepository = MockRepository();
        const useCase = new FindInvoiceUseCase(invoiceRepository);

        const input ={
            id:"1",
        }

        const output = await useCase.execute(input);

        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(output.id).toBe("1");
        expect(output.name).toBe("Cliente 1");
        expect(output.document).toBe("1234567891");
        expect(output.address.street).toBe("Street");
        expect(output.address.number).toBe("1");
        expect(output.address.complement).toBe("complement");
        expect(output.address.city).toBe("city");
        expect(output.address.state).toBe("state");
        expect(output.address.zipCode).toBe("12345");
        expect(output.items.length).toBe(2);
        expect(output.items[0].id).toBe("1");
        expect(output.items[0].name).toBe("Item 1");
        expect(output.items[0].price).toBe(10);
        expect(output.items[1].id).toBe("2");
        expect(output.items[1].name).toBe("Item 2");
        expect(output.items[1].price).toBe(20);
        expect(output.createdAt).toBe(invoice.createdAt);
        expect(output.total).toBe(30);
    });

});