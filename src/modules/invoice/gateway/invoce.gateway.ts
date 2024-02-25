import Invoice from "../domain/invoice.entity";

export default interface invoiceGateway{
    genarate(invoice: Invoice): Promise<void>;
    find(id: string): Promise<Invoice>
}