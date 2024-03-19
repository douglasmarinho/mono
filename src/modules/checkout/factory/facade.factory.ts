import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/facade.factory";
import ProcessPaymentFacadeFactory from "../../payment/factory/facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import PlaceOrderFacade from "../facade/place-order.facade"
import OrderRepository from "../repository/order.repository";
import PlaceOrderUsecase from "../usecase/place-order/place-order.usecase";


export default class PlaceOrderFacadeFactory{
    static create(){
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade =  ProductAdmFacadeFactory.create();
        const catalogFacade = StoreCatalogFacadeFactory.create();
        const repository = new OrderRepository();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = ProcessPaymentFacadeFactory.create();

        const placeOrderUsecase = new PlaceOrderUsecase(clientFacade,
            productFacade,
            catalogFacade,
            repository,
            invoiceFacade,
            paymentFacade
            );

        const placeOrderFacade = new PlaceOrderFacade({
            addUsecase: placeOrderUsecase,
        });

        return placeOrderFacade;
    };
}