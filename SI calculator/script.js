// Get the inputs

const button = document.querySelector('#button');

function calculator() {
  const amount = parseInt(document.querySelector('#amount').value);
  const rate = parseInt(document.querySelector('#rates').value);
  const time = parseInt(document.querySelector('#time').value);

  // Calculate  total ampunt and simple interest
  const simpleInterest = (amount * rate * time) / 100;
  const total = amount + (amount * rate * time) / 100;

  //   display the results
  document.getElementById(
    'result'
  ).textContent = ` Simple Interest: ${simpleInterest}`;
  document.getElementById(
    'totalresult'
  ).textContent = ` Total Amount: ${total}`;
}

// Insert the Event listener
button.addEventListener('click', calculator);
