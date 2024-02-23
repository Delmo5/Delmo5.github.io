let price = 1.87;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const changeValues = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE-HUNDRED", 100]
  ]

const calculateDrawerCash = () => {
    let total = 0;
    for (let i = 0; i < cid.length; i++) {
        total += cid[i][1];
    }
    return total;
}

const changeDue = document.getElementById('change-due');
const statuss = document.getElementById('status');
const clientChange = document.querySelector('.change');
const registerChange = document.getElementsByClassName('register-change');
let drawerCash = calculateDrawerCash();

document.getElementById('total').textContent = `$${price.toFixed(2)}`;

for (let i = changeValues.length - 1; i >= 0; i--) {
    registerChange[i].innerText = `$${cid[i][1].toFixed(2)}`;
}

const calculateChange = () => {
    
    const cash = document.getElementById('cash').value;

    if(cash < 0){
        alert('invalid input');
        return;
    }
    if(cash < price){
        alert('Customer does not have enough money to purchase the item');
        return;
    }
    if(cash == price){
        changeDue.innerHTML = `No change due - customer paid with exact cash`;
        return;
    }

    const change = cash - price;

    if (change > drawerCash) {
        changeDue.textContent = ``;
        statuss.innerHTML = `Status: INSUFFICIENT_FUNDS`;
        return;
    }

    displayChange(change);

}

const displayChange = (change) => {

    document.getElementById('change-due-value').textContent = `$${change.toFixed(2)}`;
    
    let htmlString = ``;
    let remainingChange = change;
    let changeUnit = 0;
    let amount = 0;
    let amountAvailable = 0;
    const widthdrawnAmounts = [];

    for (let i = changeValues.length - 1; i >= 0; i--) {
        amountAvailable = cid[i][1];
        changeUnit = Math.floor(remainingChange / changeValues[i][1]);
        amount = changeUnit * changeValues[i][1];
        amount = Math.min(amount, amountAvailable);

        /*round to the second decimal place because computers are not accurate when dealing with decimal values*/
        remainingChange -= amount;
        remainingChange = Math.round(remainingChange * 100) / 100;
        console.log(remainingChange);

        widthdrawnAmounts.unshift(amount);
        htmlString += amount===0?``:`<div class="change">${cid[i][0]}: <span id="ONE-HUNDRED">$${amount.toFixed(2)}</span></div>`;
    }
    
    if(remainingChange > 0){
        changeDue.innerHTML = `Status: INSUFFICIENT_FUNDS`;
        return;
    }

    for (let i = 0; i < widthdrawnAmounts.length; i++) {
        cid[i][1] -= widthdrawnAmounts[i];
        console.log(cid[i][1]);
        console.log(widthdrawnAmounts[i]);
        registerChange[i].innerText = `$${cid[i][1].toFixed(2)}`;
    }

    htmlString = htmlString.trimEnd();

    drawerCash = calculateDrawerCash();

    drawerCash===0?statuss.innerHTML = `Status: <span>CLOSED</span>`:statuss.innerHTML = `Status: <span>OPEN</span>`;

    changeDue.innerHTML = htmlString;
    
}
