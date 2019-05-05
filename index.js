'use strict';
// Model-View-Controller in JavaScript (https://alexatnet.com/model-view-controller-mvc-in-javascript/)

// Model Functions (Manipulation of the Store)
const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false, isEditing: false},
    {id: cuid(), name: 'oranges', checked: false, isEditing: false},
    {id: cuid(), name: 'milk', checked: true, isEditing: false},
    {id: cuid(), name: 'bread', checked: false, isEditing: false}
  ],
  hideCompleted: false,
  searchTerm: null,
};

function addItemToShoppingList(itemName){
  STORE.items.push({id: cuid(), name: itemName, checked: false, isEditing: false});
}

function deleteItem(itemId){
  const itemIndex = STORE.items.findIndex(item => item.id === itemId);
  STORE.items.splice(itemIndex, 1);
}

function setSearchTerm(searchTerm){
  STORE.searchTerm = searchTerm;
}

function editItemName(itemId, newName){
  const targetItem = STORE.items.find(item => item.id === itemId);
  targetItem.name = newName;
}

function setItemIsEditing(itemId, isEditing) {
  const targetItem = STORE.items.find(item => item.id === itemId);
  targetItem.isEditing = isEditing;
}

function toggleHideFilter(){
  STORE.hideCompleted = !STORE.hideCompleted;
}

function toggleCheckedForListItem(itemId){
  const item = STORE.items.find(item => item.id === itemId);
  item.checked = !item.checked;
}

// View (Render Functions)
function renderShoppingList(){
  let filteredItems = STORE.items;
  if(STORE.hideCompleted){
    filteredItems = filteredItems.filter(item => !item.checked);
  }
  $('.js-search-term').val(STORE.searchTerm);
  if(STORE.searchTerm){
    filteredItems = filteredItems.filter(item => item.name.includes(STORE.searchTerm));
  }
  const shoppingListItemsString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function generateShoppingItemsString(shoppingList){
  console.log('Generating shopping list element');

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join('');
}

function generateItemElement(item){
  let itemMainTitle;
  if(item.isEditing){
    itemMainTitle = `
    <form id="edit-item-name-form">
      <input type="text" name="edit-name"
      class="js-edit-item-name" value="${item.name}"/>
    </form>
    `;
  }
  else{
    itemMainTitle= `
    <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked': ''}">
    ${item.name}
    </span>`;
  }
  const disabledStatus = item.isEditing ? 'disabled': '';
  return `
  <li data-item-id="${item.id}">
    ${itemMainTitle}
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle" ${disabledStatus}>
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete" ${disabledStatus}>
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
  
}

// Control Functions (User Input)

function handleNewItemSubmit(){

  $('#js-shopping-list-form').submit(function(e){
    e.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();});
}
function getItemIDFromElement(item){
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked(){
  $('.js-shopping-list').on('click','.js-item-toggle', event => {
    const id = getItemIDFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click','.js-item-delete', event => {
    const id = getItemIDFromElement(event.currentTarget);
    deleteItem(id);
    renderShoppingList();
  });
}
function handleToggleHideFilter(){
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

function handleSearchSubmit(){
  $('#js-search-term-form').on('submit', event =>{
    event.preventDefault();
    const searchTerm = $('.js-search-term').val();
    setSearchTerm(searchTerm);
    renderShoppingList();
  });
}

function handleSearchClear(){
  $('#search-form-clear').on('click',() => {
    setSearchTerm('');
    renderShoppingList();
  });
}

function handleEditNameClick(){
  $('.js-shopping-list').on('click', '.js-shopping-item', event => {
    const id = getItemIDFromElement(event.target);
    setItemIsEditing(id, true);
    renderShoppingList();
  });
}

function handleEditItemForm(){
  $('.js-shopping-list').on('submit', '#edit-item-name-form', event => {
    event.preventDefault();
    const id = getItemIDFromElement(event.target);
    const newName = $('.js-edit-item-name').val();
    editItemName(id, newName);
    setItemIsEditing(id, false);
    renderShoppingList();
  });
}

function handleShoppingList(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHideFilter();
  handleSearchSubmit();
  handleSearchClear();
  handleEditNameClick();
  handleEditItemForm();
}

$(handleShoppingList);