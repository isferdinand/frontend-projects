const eType = document.getElementById('type').selectedOptions;
const eName = document.getElementById('name');
const eDate = document.getElementById('date');
const eAmount = document.getElementById('amount');
const eTable = document.getElementById('table');
const eClear = document.querySelector('.btn-sm');

function onSubmit(e) {
  e.preventDefault();

  //check for empty values
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.value === '') {
      alert(`Fill the ${input.name} value`);
    }
  });

  addToDom(eType[0].textContent, eName.value, eDate.value, eAmount.value);

  addToLocalStorage(
    eType[0].textContent,
    eName.value,
    eDate.value,
    eAmount.value
  );

  //reset the inputs after submit
  eType[0].value = '';
  eName.value = '';
  eDate.value = '';
  eAmount.value = '';
}

function addToDom(...expense) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${expense[0]}</td>
    <td>${expense[1]}</td>
    <td>${expense[2]}</td>
    <td>Ksh ${expense[3]}</td>
    <td><i class="fa-solid fa-xmark"></i></td>`;

  eTable.appendChild(tr);
}

function addToLocalStorage(...expense) {
  let storedExpenses = expenseFromStorage();

  storedExpenses.push(...expense);

  localStorage.setItem('expenses', JSON.stringify(storedExpenses));
}

function expenseFromStorage(...expense) {
  let storedExpenses = [];
  if (localStorage.getItem('expenses') === null) {
    storedExpenses = [];
  } else {
    storedExpenses = JSON.parse(localStorage.getItem('expenses'));
  }

  return storedExpenses;
}

function removeFromDom(e) {
  if (e.target.classList.contains('fa-xmark')) {
    removeExpense(e.target.parentElement.parentElement);
  }
}

function removeExpense(expense) {
  if (confirm('Are you sure?')) {
    expense.remove();
  }
}

function clearAll(e) {
  const expenses = eTable.lastElementChild.children;
  while (expenses.length > 1) {
    let i = 0;
    expenses[i].remove();
    i++;
  }
}

form.addEventListener('submit', onSubmit);
eTable.addEventListener('click', removeFromDom);
eClear.addEventListener('click', clearAll);
document.addEventListener('DOMContentLoaded', displayStored);
