export interface AddProductAdmFacadeInputDto{
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface AddProductAdmFacadeOutputDto{
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckStockFacadeInputDto{
    productId: string;
}

export interface CheckStockFacadeOutputDto{
    productId: string;
    stock: number;
}


export default interface ProductAdmFacadeInterface{

    addProduct(input: AddProductAdmFacadeInputDto): Promise<AddProductAdmFacadeOutputDto>;

    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;

}