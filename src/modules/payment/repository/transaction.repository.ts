import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction.entity";
import PaymentGateway from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway{

    async save(input: Transaction): Promise<Transaction> {
        
        const transaction = await TransactionModel.create({
            id: input.id.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return new Transaction({
            id: new Id(transaction.id),
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        });
    }
}