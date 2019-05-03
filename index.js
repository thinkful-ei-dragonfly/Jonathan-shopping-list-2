'use strict';
const STORE = {
  items: [
    {id: cuid(), name: 'apples', checked: false, isEditing: false},
    {id: cuid(), name: 'oranges', checked: false}, isEditing: false,
    {id: cuid(), name: 'milk', checked: true, isEditing: false},
    {id: cuid(), name: 'bread', checked: false, isEditing: false}
  ],
  hideCompleted: false,
  searchTerm: null,
};

function generateItemElement(item, itemIndex, template){
  return `
  <li data-item-id='${item.id}'>
    <span class='shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}'>${item.name}</span>
    <div class='shopping-item-controls'>
      <button class='shopping-item-toggle js-item-toggle'>
        <span class='button-labe'>check</span>
      </button>
      <button class='shopping-item-delete js-item-delete'>
        <span class='button-label'>delete</span>
      </button>
    </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList){
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item,index));
  
  return items.join('');
}

function renderShoppingList(){
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName){
  STORE.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit(){

  $('#js-shopping-list-form').submit(function(e){
    e.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();});
}

function toggleCheckedForListItem(itemId){
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
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

function deleteItem(itemId){
  const itemIndex = STORE.findIndex(item => item.id === itemId);
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click','.js-item-delete', event => {
    const id = getItemIDFromElement(event.currentTarget);
    deleteItem(id);
    renderShoppingList();
  });
}

function toggleHideFilter(){
  STORE.hideCompleted = !STORE.hideCompleted;
}
function handleToggleHideFilter(){
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHideFilter();
    renderShoppingList();
  });
}

function handleSearchSubmit(){

}

function handleSearchClear(){

}

function handleEditNameClick(){

}

function HandleEditItemForm(){
  
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