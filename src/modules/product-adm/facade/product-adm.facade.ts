import ProductAdmFacadeInterface, { AddProductAdmFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";


export interface UseCasesProps{
    addUsecase: UseCaseInterface;
    stockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    
    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps){
        this._addUsecase = useCasesProps.addUsecase;
        this._checkStockUsecase = useCasesProps.stockUsecase;
    }

    addProduct(input: AddProductAdmFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }
}