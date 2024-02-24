import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPayment from "./process-payment.usecase";

const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved",
});
const MockRepository = () =>{
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    };
};

const transactionError = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",
    status: "declined",
});
const MockRepositoryError = () =>{
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionError)),
    };
};

describe("Process payment usecase unit teste",() =>{

    it("Should approve a transaction", async()=>{

        const paymentRepository = MockRepository();
        const useCase = new ProcessPayment(paymentRepository);

        const input = {
            orderId: "1",
            amount: 100,
        }

        const output = await useCase.execute(input);

        expect(paymentRepository.save).toHaveBeenCalled();
        expect(output.transactionId).toBe(transaction.id.id);
        expect(output.amount).toBe(100);
        expect(output.status).toBe("approved");
        expect(output.orderId).toBe(transaction.orderId);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });

    it("Should decline a transaction", async()=>{

        const paymentRepository = MockRepositoryError();
        const useCase = new ProcessPayment(paymentRepository);

        const input = {
            orderId: "1",
            amount: 50,
        }

        const output = await useCase.execute(input);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(output.transactionId).toBe(transactionError.id.id);
        expect(output.amount).toBe(50);
        expect(output.status).toBe("declined");
        expect(output.orderId).toBe(transactionError.orderId);
        expect(output.createdAt).toBeDefined();
        expect(output.updatedAt).toBeDefined();
    });
});