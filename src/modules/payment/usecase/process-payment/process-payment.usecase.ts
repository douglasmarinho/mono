import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.usecase.dto";

export default class ProcessPayment{
    constructor(private _paymentRepository :PaymentGateway)
    {}

    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto>{

        const props = {
            id: new Id(),
            orderId: input.orderId,
            amount: input.amount,
        };

        const transaction = new Transaction(props);
        transaction.process();

        const persistTransaction = await this._paymentRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        };

    }
}