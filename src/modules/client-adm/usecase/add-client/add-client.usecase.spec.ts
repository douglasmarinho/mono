import AddClientUseCase from "./add-client.usecase";

const MockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add Client UseCase unit teste",() =>{

    it("Should add a client", async()=>{

        const clientRepository = MockRepository();
        const useCase = new AddClientUseCase(clientRepository);

        const input ={
            name: "Cliente 1",
            email: "cliente1@email.com",
            address: "Rua 1 Cidade 1",
        }

        const output = await useCase.execute(input);

        expect(clientRepository.add).toHaveBeenCalled();
        expect(output.name).toBe("Cliente 1");
        expect(output.email).toBe("cliente1@email.com");
        expect(output.address).toBe("Rua 1 Cidade 1");
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });

});