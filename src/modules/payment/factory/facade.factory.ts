import PaymentFacade from "../facade/payment.facade";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPayment from "../usecase/process-payment/process-payment.usecase";

export default class ProcessPaymentFacadeFactory{
    static create(){
        const transactionRepository = new TransactionRepository();
        const processPayment = new ProcessPayment(transactionRepository);
        const clientFacade = new PaymentFacade(processPayment);
        return clientFacade;
    };

}