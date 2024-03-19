export interface AddPlaceOrderInputDto{
    clientId: string;
    products:{
        productId: string
    }[];
}

export interface AddPlaceOrderOutputDto{
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products:{
        productId: string
    }[];
}

export default interface PlaceOrderFacadeInterface {
    add(input: AddPlaceOrderInputDto): Promise<AddPlaceOrderOutputDto>;
  }