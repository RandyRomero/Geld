// Small script to keep track of your budget


var allMoney = 0;
var transactionTracker = {};

// Functions to check data type
function isNumber(item) {
    return !isNaN(item) && isFinite(item);
}

function isObject(item) {
    return {}.toString.call(item).slice(8, -1) === 'Object';
}

// Function to return string with date and time in particular format
function returnDate(date) {
    var months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    };

    var daysOfWeek = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };

    return date.getDate() + ' ' + months[date.getMonth()] + ', ' + daysOfWeek[date.getDay()]
}

function Parent(name, currency) {
    this._name = name;
    this._currency = currency;
    this._currentAmount = 0;
}

Parent.prototype.getCurrentSum = function() {
  return this._name + ': ' + this._currentAmount + ' ' + this._currency;
};

// Method to add make income transaction
Parent.prototype.transferMoney = function(sum, destination) {
   if (!isNumber(sum)) {
       throw new Error('Sum is not a number!');
   }

   if (!isObject(destination)) {
       throw new Error('Destination is not a function!');
   }

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
    } else {
        throw new Error('Transaction type doesn\'t match anything');
    }

    var transaction = {
        'time': new Date().getTime(),
        'type': type,
        'amount': sum,
        'from': this._name,
        'to': destination._name
    };

    transactionTracker[transaction.time] = transaction;
    destination._currentAmount += sum;
};

Parent.prototype.showStat = function() {
    var result = '\n################\n' + this._name + '\n';
    for (key in transactionTracker) {
        var from = transactionTracker[key]['from'];
        var to = transactionTracker[key]['to'];
          if (from === this._name || to === this._name) {
              var date = new Date(transactionTracker[key]['time']);
              var sum = transactionTracker[key]['amount'];
              if (transactionTracker[key]['type'] === 'accountToAccount') {
                  if (this._name === transactionTracker[key]['from']) {
                      sum = String('- ' + sum);
                  } else {
                      sum = String('+ ' + sum);
                  }
              } else if (transactionTracker[key]['type'] === 'incomeToAccount') {
                  sum = String('+ ' + sum);
              } else {
                  sum = String('- ' + sum);
              }
              result += ('\n' + returnDate(date) + '\nfrom ' + from + ' to ' + to + '\n' + sum + ' ' + this._currency);
              result += '\n';
        }
    }
    result += '################';
    return result;
};


// Class for instances to keep track of amount of incoming money
function Income() {
    Parent.apply(this, arguments);
}

Income.prototype.getCurrentSum = Parent.prototype.getCurrentSum;
Income.prototype.addIncome = Parent.prototype.transferMoney;
Income.prototype.showStat = Parent.prototype.showStat;

var salary = new Income('Salary', 'Rubles');
// console.log(salary.getCurrentSum());

function Account(currency) {
    Parent.apply(this, arguments);
}

Account.prototype.getCurrentSum = Parent.prototype.getCurrentSum;
Account.prototype.addExpense = Parent.prototype.transferMoney;
Account.prototype.transferMoney = Parent.prototype.transferMoney;
Account.prototype.showStat = Parent.prototype.showStat;

var cash = new Account('Cash', 'Rubles');
// console.log(cash.getCurrentSum());

var card = new Account('Card', 'Rubles');

salary.addIncome(1000, card);
// console.log(salary.getCurrentSum());
// console.log(cash.getCurrentSum());


function Expense(currency) {
    Parent.apply(this, arguments);
}
Expense.prototype.getCurrentSum = Parent.prototype.getCurrentSum;
Expense.prototype.showStat = Parent.prototype.showStat;

var food = new Expense('Food', 'Rubles');

setTimeout(function() { card.transferMoney(200, cash) }, 1000);
// console.log(cash.getCurrentSum());
// console.log(card.getCurrentSum());
setTimeout(function() { console.log(card.showStat()) }, 1000 );
// console.log(cash.showStat());



