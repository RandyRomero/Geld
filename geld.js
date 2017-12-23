// Small script to keep track of your budget

var allMoney = 0;

function Parent(name, currency) {
    this._name = name;
    this._currency = currency;
    this._currentAmount = 0;
}

Parent.prototype.showCurrentState = function() {
  return this._name + ': ' + this._currentAmount + ' ' + this._currency;
};

// Class for instances to keep track of amount of incoming money
function Income() {
    Parent.apply(this, arguments);
}

Income.prototype = Object.create(Parent.prototype);

// Method to add make income transaction
Income.prototype.addIncomeTransaction = function(sum, account) {
    var transaction = {
        'time': (new Date()).getTime(),
        'type':'incomeToAccount',
        'amount': sum,
        'from': this._name,
        'to': account._name
    };


    account._transactionTracker[transaction.time] = transaction;
    this._currentAmount -= sum;
    account._currentAmount += sum;
};

var salary = new Income('Salary', 'Rubles');
console.log(salary.showCurrentState());

function Account(currency) {
    Parent.apply(this, arguments);
    this._transactionTracker = {};
}

Account.prototype = Object.create(Parent.prototype);

var cash = new Account('Cash', 'Rubles');
console.log(cash.showCurrentState());

salary.addIncomeTransaction(400, cash);
console.log(salary.showCurrentState());
console.log(cash.showCurrentState());
