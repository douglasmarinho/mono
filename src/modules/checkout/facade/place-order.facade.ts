import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PlaceOrderFacadeInterface, { AddPlaceOrderInputDto, AddPlaceOrderOutputDto } from "./place-order.facade.interface";

export interface UseCaseProps {
    addUsecase: UseCaseInterface;
  }

export default class PlaceOrderFacade implements PlaceOrderFacadeInterface{

    private _addUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
      this._addUsecase = usecaseProps.addUsecase;
    }
  
    async add(input: AddPlaceOrderInputDto): Promise<AddPlaceOrderOutputDto> {
      return await this._addUsecase.execute(input);
    }

}