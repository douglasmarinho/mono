import Transaction from "../domain/transaction.entity";

export default interface PaymentGateway{
    save(transaction: Transaction): Promise<Transaction>;
}