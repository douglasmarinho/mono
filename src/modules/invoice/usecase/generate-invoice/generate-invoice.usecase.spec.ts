import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () =>{
    return {
        genarate: jest.fn(),
        find: jest.fn(),
    };
};

describe("Generate Invoice UseCase unit teste",() =>{

    it("Should generate a invoice", async()=>{

        const invoiceRepository = MockRepository();
        const useCase = new GenerateInvoiceUseCase(invoiceRepository);

        const input ={
            name: "Cliente 1",
            document: "123456",
            street: "Street",
            number: "1",
            complement: "complement",
            city: "city",
            state: "state",
            zipCode: "12345",
            items: [{
                id: "1",
                name: "Item 1",
                price: 10,
            },
            {
                id: "2",
                name: "Item 2",
                price: 40,
            }],
        }

        const output = await useCase.execute(input);

        expect(invoiceRepository.genarate).toHaveBeenCalled();
        expect(output.id).toBeDefined();
        expect(output.name).toBe("Cliente 1");
        expect(output.document).toBe("123456");
        expect(output.street).toBe("Street");
        expect(output.number).toBe("1");
        expect(output.complement).toBe("complement");
        expect(output.city).toBe("city");
        expect(output.state).toBe("state");
        expect(output.zipCode).toBe("12345");
        expect(output.items.length).toBe(2);
        expect(output.items[0].id).toBe("1");
        expect(output.items[0].name).toBe("Item 1");
        expect(output.items[0].price).toBe(10);
        expect(output.items[1].id).toBe("2");
        expect(output.items[1].name).toBe("Item 2");
        expect(output.items[1].price).toBe(40);
        expect(output.total).toBe(50);
    });

});