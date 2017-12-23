// Small script to keep track of your budget

var allMoney = 0;

function Parent(name) {
    this._name = name;
    this._currentAmount = 0;
}

Parent.prototype.showCurrentState = function() {
  return this._name + ': ' + this._currentAmount;
};

// Class for instances to keep track of amount of incoming money
function Income() {
    Parent.apply(this, arguments);
}

Income.prototype = Object.create(Parent.prototype);

// Method to add make income transaction
Income.prototype.addIncomeTransaction = function(sum, account) {
    var transaction = {
        'type':'incomeToAccount',
        'amount': sum,
        'from': this._name,
        'to': account._name
    }
};

var salary = new Income('Salary');
console.log(salary.showCurrentState());

function Account() {
    Parent.apply(this, arguments);
    this._operationTracker = [];
}

Account.prototype = Object.create(Parent.prototype);

var cash = new Account('Cash');

