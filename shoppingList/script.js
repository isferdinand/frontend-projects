// Get the Elements
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const itemBtn = document.getElementById('item-btn');
const clearAll = document.getElementById('clear');
let isEditMode = false;

// Adding items to list
const onAddItemSubmit = (ev) => {
  ev.preventDefault();
  const insertedItem = itemInput.value;

  // Validating the item
  if (insertedItem === '') {
    alert('Insert an Item');
    return;
  }

  // Check for edit mode ,take the item we are editing, remove from local storage , remove from the dom then just add the new item
  if (isEditMode) {
    const editingItem = itemList.querySelector('.edit-mode');

    removeFromStorage(editingItem.textContent);
    editingItem.classList.remove('.edit-mode');
    editingItem.remove();
    isEditMode = false;
  }

  // Add items the DOM
  addItemToDom(insertedItem);

  // Add to local storage
  addItemToStorage(insertedItem);

  resetPage();

  //Clear the input for the next item
  itemInput.value = '';
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

// Add items to DOM (takes in text from the form )
const addItemToDom = (item) => {
  //Create a list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Adding the list item to the DOM
  itemList.appendChild(li);
};

// Add items to local storage
const addItemToStorage = (item) => {
  const storedItems = itemsFromStorage();

  storedItems.push(item);

  //Set to local storage then array to JSON string
  localStorage.setItem('items', JSON.stringify(storedItems));
};

// Get items from storage
const itemsFromStorage = () => {
  let storedItems;

  if (localStorage.getItem('items') === null) {
    storedItems = [];
  } else {
    storedItems = JSON.parse(localStorage.getItem('items'));
  }

  return storedItems;
};

// display items in local storage
const displayItems = () => {
  const storedItems = itemsFromStorage();
  storedItems.forEach((item) => addItemToDom(item));

  resetPage();
};

// Remove items from DOM and Storage
const onItemClick = (ev) => {
  if (ev.target.parentElement.classList.contains('remove-item')) {
    removeItem(ev.target.parentElement.parentElement);
  } else {
    toEditMode(ev.target);
  }
};

// Click on item and switch it to editing
const toEditMode = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  // item.style.color = '#ccc';
  item.classList.add('edit-mode');
  itemBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
  itemBtn.style.backgroundColor = '#FC5D3D';
  itemInput.value = item.textContent;
};

// Remove single items (Using event delegation)
const removeItem = (item) => {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove();

    // Remove items from local storage
    removeFromStorage(item.textContent);
  }
};

const removeFromStorage = (item) => {
  let storedItems = itemsFromStorage();

  storedItems = storedItems.filter((i) => i !== item);

  // Reset items in local storage
  localStorage.setItem('items', JSON.stringify(storedItems));
};

// Remove all items
const clearItems = (ev) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from local storage using the 'items' key
  localStorage.removeItem('items');

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
  itemInput.value = '';

  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearAll.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearAll.style.display = 'block';
  }

  itemBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
  itemBtn.style.backgroundColor = '#333';

  isEditMode = false;
};

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit); //(Event handler as it listens to two events from two methods)
itemList.addEventListener('click', onItemClick);
clearAll.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

resetPage();
