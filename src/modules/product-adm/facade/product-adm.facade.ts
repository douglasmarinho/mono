import ProductAdmFacadeInterface, { AddProductAdmFacadeInputDto, AddProductAdmFacadeOutputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.interface";
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

    async addProduct(input: AddProductAdmFacadeInputDto): Promise<AddProductAdmFacadeOutputDto> {
        return await this._addUsecase.execute(input);
    }
    async checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        return await this._checkStockUsecase.execute(input);
    }
}