// Small script to keep track of your budget

var allMoney = 0;
var transactionTracker = {};

function Parent(name, currency) {
    this._name = name;
    this._currency = currency;
    this._currentAmount = 0;
}

Parent.prototype.showCurrentState = function() {
  return this._name + ': ' + this._currentAmount + ' ' + this._currency;
};

// Method to add make income transaction
Parent.prototype.transferMoney = function(sum, destination) {
    var type = null;
    if (this instanceof Income) {
        type = 'incomeToAccount';
        this._currentAmount += sum;
    } else if (this instanceof Account && destination instanceof Account) {
        type = 'accountToAccount';
        this._currentAmount -= sum;
    } else if (this instanceof Account && destination instanceof Expense) {
        type = 'accountToExpense';
        this._currentAmount -= sum;
    }

    var transaction = {
        'time': (new Date()).getTime(),
        'type': type,
        'amount': sum,
        'from': this._name,
        'to': destination._name
    };

    transactionTracker[transaction.time] = transaction;

    destination._currentAmount += sum;
};


// Class for instances to keep track of amount of incoming money
function Income() {
    Parent.apply(this, arguments);
}

Income.prototype.showCurrentState = Parent.prototype.showCurrentState;
Income.prototype.addIncome = Parent.prototype.transferMoney;

var salary = new Income('Salary', 'Rubles');
console.log(salary.showCurrentState());

function Account(currency) {
    Parent.apply(this, arguments);
}

Account.prototype.showCurrentState = Parent.prototype.showCurrentState;
Account.prototype.addExpense = Parent.prototype.transferMoney;
Account.prototype.transferMoney = Parent.prototype.transferMoney;


function Expense(currency) {
    Parent.apply(this, arguments);
}

var cash = new Account('Cash', 'Rubles');
console.log(cash.showCurrentState());

salary.addIncome(400, cash);
console.log(salary.showCurrentState());
console.log(cash.showCurrentState());
