import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (accumulator, balance) =>
        balance.type === 'income' ? accumulator + balance.value : accumulator,
      0,
    );
    const outcome = this.transactions.reduce(
      (accumulator, balance) =>
        balance.type === 'outcome' ? accumulator + balance.value : accumulator,
      0,
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
