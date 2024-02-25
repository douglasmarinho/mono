import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";


export interface UseCasesProps{
    generateUsecase: UseCaseInterface;
    findUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _generateUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;
    constructor(useCasesProps : UseCasesProps){
        this._generateUsecase = useCasesProps.generateUsecase;
        this._findUsecase = useCasesProps.findUsecase;
    }
    generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateUsecase.execute(input);
    }
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findUsecase.execute(input);
    }

}