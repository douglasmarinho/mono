import Id from "../../@shared/domain/value-object/id.value-object";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";

type ClienteProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
}

export default class Client extends BaseEntity implements AggregateRoot{

}