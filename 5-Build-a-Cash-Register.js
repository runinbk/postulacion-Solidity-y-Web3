let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnit = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  let cash = parseFloat(document.getElementById("cash").value);
  const changeDiv = document.getElementById("change-due");

  if (isNaN(cash)) {
    alert("Please enter a valid amount.");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  let changeDue = parseFloat((cash - price).toFixed(2));
  let totalCID = parseFloat(cid.reduce((sum, [, amt]) => sum + amt, 0).toFixed(2));

  if (changeDue === 0) {
    changeDiv.textContent = "No change due - customer paid with exact cash";
    return;
  }

  if (changeDue > totalCID) {
    changeDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeToGive = [];
  let reversedCID = [...cid].reverse();

  for (let [unit, amount] of reversedCID) {
    let unitValue = currencyUnit[unit];
    let amountAvailable = parseFloat(amount.toFixed(2));
    let amountToReturn = 0;

    while (changeDue >= unitValue && amountAvailable >= unitValue) {
      changeDue = parseFloat((changeDue - unitValue).toFixed(2));
      amountAvailable = parseFloat((amountAvailable - unitValue).toFixed(2));
      amountToReturn = parseFloat((amountToReturn + unitValue).toFixed(2));
    }

    if (amountToReturn > 0) {
      changeToGive.push([unit, amountToReturn]);
    }
  }

  if (changeDue > 0) {
    changeDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let totalChangeGiven = parseFloat(changeToGive.reduce((sum, [, amt]) => sum + amt, 0).toFixed(2));

  if (totalChangeGiven === totalCID) {
    let text = "Status: CLOSED";
    changeToGive.forEach(([unit, amt]) => {
      text += ` ${unit}: $${amt}`;
    });
    changeDiv.textContent = text;
    return;
  }

  let text = "Status: OPEN";
  changeToGive.forEach(([unit, amt]) => {
    text += ` ${unit}: $${amt}`;
  });
  changeDiv.textContent = text;
});
