import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "Cliente 1",
    email: "cliente1@email.com",
    address: "Rua 1 Cidade 1",
});


const MockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

describe("Add Client UseCase unit teste",() =>{

    it("Should add a client", async()=>{

        const clientRepository = MockRepository();
        const useCase = new FindClientUseCase(clientRepository);

        const input ={
            id: "1",
        }

        const output = await useCase.execute(input);

        expect(clientRepository.find).toHaveBeenCalled();
        expect(output.name).toBe("Cliente 1");
        expect(output.email).toBe("cliente1@email.com");
        expect(output.address).toBe("Rua 1 Cidade 1");
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });

});