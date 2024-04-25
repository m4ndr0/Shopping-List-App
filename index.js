/* === Imports === */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

/* === Consts === */

const appSettings = {
    databaseURL: "https://shoppinglist-31d77-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "foods")


const inputEl = document.getElementById("inputEl")
const buttonEl = document.getElementById("buttonEl")
const shoppingList = document.getElementById("shopping-list")

/* === Event Listeners === */

buttonEl.addEventListener("click", addItemToCart)

/* === Functions === */


/* === Firebase Functions === */

onValue(itemsInDB, function(snapshot) {
    clearHtmlBeforeRerenderingList(shoppingList)
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendListItemToUl(currentItem)
        }
    } else {
        shoppingList.innerHTML = "Add something to the list..."
    }
})

/* === UI Functions === */

function addItemToCart() {
    let itemAdded = getValueFromInputEl(inputEl)
    if (itemAdded) {
        push(itemsInDB, itemAdded)
    }
    clearInputField(inputEl)
}

function appendListItemToUl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newItem = document.createElement("li")
        newItem.textContent = itemValue
        newItem.tabIndex = 0
        shoppingList.appendChild(newItem)
    newItem.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `foods/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
}

function clearInputField(inputElement) {
    inputElement.value = ""
}

function getValueFromInputEl(element) {
    let inputValue = element.value
    return inputValue
}

function clearHtmlBeforeRerenderingList(element) {
    element.innerHTML = ""
}

