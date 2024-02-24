import ClientAdmFacadeInterface, { AddClientAdmFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";
import UseCaseInterface from "../../@shared/usecase/use-case.interface";


export interface UseCasesProps{
    addUsecase: UseCaseInterface;
    findUsecase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    
    private _addUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(useCasesProps: UseCasesProps){
        this._addUsecase = useCasesProps.addUsecase;
        this._findUsecase = useCasesProps.findUsecase;
    }

    add(input: AddClientAdmFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return this._findUsecase.execute(input);
    }
}