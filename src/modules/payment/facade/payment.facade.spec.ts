import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import ProcessPaymentFacadeFactory from "../factory/facade.factory";

describe("PaymentFacade test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([TransactionModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should create a transaction", async () => {
  
      const processPaymentFacade = ProcessPaymentFacadeFactory.create();
  
      const input ={
          orderId: "1",
          amount: 100,
      }
  
      const processPaymentDb = await processPaymentFacade.process(input);
  
  
      expect(processPaymentDb).toBeDefined();
      expect(processPaymentDb.transactionId).toBeDefined();
      expect(processPaymentDb.orderId).toBe(input.orderId);
      expect(processPaymentDb.amount).toBe(input.amount);
      expect(processPaymentDb.status).toBe("approved");
      expect(processPaymentDb.createdAt).toBeDefined();
      expect(processPaymentDb.updatedAt).toBeDefined();
    });

    it("should create a transaction declined", async () => {
  
        const processPaymentFacade = ProcessPaymentFacadeFactory.create();
    
        const input ={
            orderId: "1",
            amount: 30,
        }
    
        const processPaymentDb = await processPaymentFacade.process(input);
    
    
        expect(processPaymentDb).toBeDefined();
        expect(processPaymentDb.transactionId).toBeDefined();
        expect(processPaymentDb.orderId).toBe(input.orderId);
        expect(processPaymentDb.amount).toBe(input.amount);
        expect(processPaymentDb.status).toBe("declined");
        expect(processPaymentDb.createdAt).toBeDefined();
        expect(processPaymentDb.updatedAt).toBeDefined();
      });
  
  });