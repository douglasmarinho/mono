import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment.facade.interface";


export default class PaymentFacade implements PaymentFacadeInterface {
    
    constructor(private _processPaymentUseCase: UseCaseInterface){
    }

    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this._processPaymentUseCase.execute(input);
    }
}