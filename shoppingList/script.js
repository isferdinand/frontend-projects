// Get the Elements
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const clearAll = document.getElementById('clear');

// Adding items to list
const addItem = (ev) => {
  ev.preventDefault(); // don't want the form to submit to the file

  const insertedItem = itemInput.value;

  // Validating the item
  if (insertedItem === '') {
    alert('Insert an Item');
    return;
  }

  //Create a list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(insertedItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li); //Adding the list item to the DOM

  resetPage();

  itemInput.value = ''; //Clear the input for the next item
};

// Create button function
const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

// Create icon
const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

// Remove single items (Using event delegation)
const removeItem = (ev) => {
  if (ev.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      ev.target.parentElement.parentElement.remove();

      resetPage();
    }
  }
};

// Remove all items
const clearItems = (ev) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  resetPage();
};

// Filtering items in the list
const filterItems = (ev) => {
  const items = itemList.querySelectorAll('li');
  const text = ev.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

// Check if filter input and clear button are present
const resetPage = () => {
  const items = itemList.querySelectorAll('li');
  //   console.log(items);
  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearAll.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearAll.style.display = 'block';
  }
};

// Event Listeners
itemForm.addEventListener('submit', addItem); //(event listener put in an iife  i.e refactoring)
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

resetPage();
