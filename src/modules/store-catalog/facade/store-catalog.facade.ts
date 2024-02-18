import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import FindAllProductUseCase from "../usecase/find-all-products/find-all-products.usecase";

export interface UseCaseProps{
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProductUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{
    
    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductUseCase;

    constructor(useCaseProps: UseCaseProps){
        this._findUseCase = useCaseProps.findUseCase;
        this._findAllUseCase = useCaseProps.findAllUseCase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(id);
    }

    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute();
    }

}