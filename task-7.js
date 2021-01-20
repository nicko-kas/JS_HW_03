// Задание 7 - дополнительное, выполнять не обязательно
// Напиши скрипт управления личным кабинетом интернет банка. Есть объект account в котором необходимо реализовать методы для работы с балансом и историей транзакций.
// 5:32
/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};
/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */
const account = {
  // Текущий баланс счета
  balance: 0,
  // История транзакций
  transactions: [],
  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    return {
      id: this.transactions.length + 1,
      type: type,
      amount: amount,
    };
  },
  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.balance = this.balance + amount;
    this.transactions[this.transactions.length] = this.createTransaction(
      amount,
      Transaction.DEPOSIT
    );
  },
  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    this.transactions[this.transactions.length] = this.createTransaction(
      amount,
      Transaction.WITHDRAW
    ); //пишу в лог неудачную попытку сняти, т.к. так написано в ТЗ, хотя можно не писать такую транзакцию, или добавить проперти с статусом.
    if (amount > this.getBalance()) {
      return console.log(`Снятие ${amount} невозможно, недостаточно средств.`);
    } else {
      this.balance = this.balance - amount;
    }
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },
  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    return this.transactions[id - 1]; //простой способ но не сработает, если логи можно чистить. Стандартный способ ниже

    // for (let key of this.transactions) {
    //   if (key.id == id) {
    //     return key;
    //   }
    // }
  },
  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let typeTotal = 0;
    for (let key of this.transactions) {
      if (key.type == type) {
        typeTotal = typeTotal + key.amount;
      }
    }
    return typeTotal;
  },
};

account.deposit(95000);
account.deposit(100500);
account.withdraw(12301230);
account.withdraw(100500);
console.log(account.getTransactionDetails(3));
console.log(account.getTransactionTotal(Transaction.DEPOSIT));
console.log(account.getTransactionTotal(Transaction.WITHDRAW));
