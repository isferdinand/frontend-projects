// Get the Elements
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

// Event Listeners
itemForm.addEventListener('submit', addItem); //(event listener put in an iife  i.e refactoring)
