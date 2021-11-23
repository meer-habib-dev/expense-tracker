const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTranscation = [
//     { id: 1, text:'flower',amount:-20},
//     { id: 1, text:'salary',amount:300},
//     { id: 1, text:'book',amount:-10},
//     { id: 1, text:'camera',amount:150},
// ]

const localStroageTransaction = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStroageTransaction : [];

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('please give text and number');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValue();
        updateLocalStorage();

        text.value = '';
        amount.value = '';

    }
}
// generate random id 
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// add transaction to dom
function addTransactionDOM(transaction) {
    // get sign 
    const sign = transaction.amount > 0 ? '-' : '+';
    const item = document.createElement('li');
    // add class to li 
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    //add transaction history to DOM
    item.innerHTML = `
    ${transaction.text} <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>X</button>
    `
    list.appendChild(item);
}
//update the balance, income and expense 
function updateValue() {
    //getting all amounts from obj
    const amounts = transactions.map(transaction => transaction.amount);
    //adding and reducing all amounts from obj
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //adding all incomes 
    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    //adding all expenses
    const expense = (amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0) * -1).toFixed(2)

    //add values to dom
    balance.innerText = `$${total}`;
    moneyPlus.innerText = `$${income}`;
    moneyMinus.innerText = `$${expense}`;
}
//remove transaction 
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// update local stroage 
function updateLocalStorage() {
    localStorage.getItem('transactions', JSON.stringify(transactions));
}

//initilization of history
function init() {
    list.textContent = '';
    transactions.forEach(addTransactionDOM);
    updateValue();
}
init();

//add event listeners
form.addEventListener('submit', addTransaction);