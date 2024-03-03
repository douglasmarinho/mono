import Id from "../../@shared/domain/value-object/id.value-object";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "./invoice.items.entity";

type InvoceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
    createdAt?: Date;
}

export default class Invoice extends BaseEntity implements AggregateRoot{

    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];

    constructor(props: InvoceProps){
        super(props.id, props.createdAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;   
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItems[]{
        return this._items;
    }

    set Address(address: Address) {
        this._address = address;
    }

    set addItem(items: InvoiceItems) {
        this._items.push(items);
    }
  
    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

}