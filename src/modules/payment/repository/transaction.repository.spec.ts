import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction.entity";
import TransactionRepository from "./transaction.repository";
import TransactionModel from "./transaction.model";

describe("TransactionRepository test", () => {
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
  
    it("should save a transaction", async () => {

      const transactionProps = {
        id: new Id("1"),
        orderId: "1",
        amount: 100,
      };
      const transaction = new Transaction(transactionProps);
      transaction.process();
      const transactionRepository = new TransactionRepository();
      const transactionDb =await transactionRepository.save(transaction);
  
      expect(transactionDb.id.id).toEqual(transactionProps.id.id);
      expect(transactionDb.orderId).toEqual(transactionProps.orderId);
      expect(transactionDb.amount).toEqual(transactionProps.amount);
      expect(transactionDb.status).toBe("approved");
      expect(transactionDb.createdAt).toBeDefined();
      expect(transactionDb.updatedAt).toBeDefined();
    });

    it("should save a transaction declined", async () => {

        const transactionProps = {
          id: new Id("1"),
          orderId: "1",
          amount: 50,
        };
        const transaction = new Transaction(transactionProps);
        transaction.process();
        const transactionRepository = new TransactionRepository();
        const transactionDb =await transactionRepository.save(transaction);
    
        expect(transactionDb.id.id).toEqual(transactionProps.id.id);
        expect(transactionDb.orderId).toEqual(transactionProps.orderId);
        expect(transactionDb.amount).toEqual(transactionProps.amount);
        expect(transactionDb.status).toBe("declined");
        expect(transactionDb.createdAt).toBeDefined();
        expect(transactionDb.updatedAt).toBeDefined();
      });

  });