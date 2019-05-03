'use strict';

// 'STORE' is responsible for storing the underlying data
//  that our app needs to keep track of in order to work.
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the list so there's something
// to see when the page first loads.
const STORE = [
  {id: cuid(), name: 'apples', checked: false},
  {id: cuid(), name: 'oranges', checked: false},
  {id: cuid(), name: 'milk', checked: true},
  {id: cuid(), name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template){
  return `
  <li data-item-id='${item.id}'>
    <span class='shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}'>${item.name}</span>
    <div class='shopping-item-controls'>
      <button class='shopping-item-toggle js-item-toggle'>
        <span class='button-labe'>check</span>
      </button>
      <button class="shopping-item-delete">
        <span class="button-label">delete</span>
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
  // this function will be responsible for rendering the shopping list in
  // the DOM

  // for each item in STORE, generate a string representing an <li> with:
  //    *the item name rendered as inner text
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
  //    *the item's index in the STORE set as a data attribute on the <li>
  //    *the item's checked state (true or false) rendered as the presnece
  //     or absence of a CSS class for indicating checked items (specifically,
  //     .shopping-item__checked from index.css)
  // join together the individual item strings into one long string
  // insert the <li>s string inside the .js-shopping-list <ul> in the DOM
  console.log('`renderShoppingList` ran');
}

function handleNewItemSubmit(){
  // this function will be responsible for when users add a new shopping
  // list item

  // listen for a click on the submit button.
  // prevent default behavior.
  // capture the value that's entered in the form
  // convert that value into an object
  // push that object into the STORE array
  // call renderShoppingList()
  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked(){
  // this function will be responsible for when users click the "check" button
  // on a shopping list item.

  // listen for a click on the check button in the item list.
  // when clicked, the check value for the object in the STORE switches (e.g.
  // if the object in STORE has the value of 'true' at checked, change it to false,
  // etc.)
  // call renderShoppingList()
  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked(){
  // this function will be responsible for when users want to delete
  // a shopping list item

  // listen for a click on the delete button in the item list
  // when clicked, it removes the corresponding object from STORE
  // call renderShoppingList()
  console.log('`handleDeleteItemClicked` ran');
}

// this function will be our callback when the page loads. It's responsible
// for  initially rendering the shopping list, and activating our individual
// functions that handle new item submissions and user clicks on the "check"
// and "delete" buttons for individual shopping list items.

function handleShoppingList(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);