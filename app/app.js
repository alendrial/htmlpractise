'use strict';

// Получаем объект с карточками

let productsData = [];
let productsCard = document.querySelectorAll('.featured_items_card');

console.log(productsCard);

productsCard.forEach(function(productCard){
    let productName = productCard.querySelector('.featured_items_card_heading').innerText;
    let productDescription = productCard.querySelector('.featured_items_card_paragraph').innerText;
    let productPrice = +productCard.querySelector('.card_price').innerText;
    productsData.push({
        productName,
        productDescription,
        productPrice
    });
})

console.log(productsData);

//Получаем ссылки на все кнопки карточек

let addButton = document.querySelectorAll('.featured_items_img_button');
console.log(addButton);
addButton.forEach(function(button){
    button.addEventListener('click', buttonProductHandler)
})

//Добавляем счетчик событий по карточкам

function buttonProductHandler(event) {
    let productId = event.currentTarget.getAttribute('data-productid');
    console.log(productId);
    console.log(productsData[productId]);
    console.log(productsData[productId].productPrice);
    addProductToBasket(productId);
}

function addProductToBasket(productId) {
    
    addProductToObject(productId);
    renderBasket(productId);
    calculateAndRenderTotalBasket();
    
}

//получаем ссылки на элементы корзины для взаимодействия

let basketElement = document.querySelector('.basket');
let basketTotalElement = document.querySelector('.basketTotal');
let basketTotalValueElement = document.querySelector('.basketTotalValue');

console.log(basketElement);
console.log(basketTotalElement);
console.log(basketTotalValueElement);


let basket = {};


function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    } else {
        basket[productId]++;
    }
}

function renderBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseCount(productId);
        recalculateSum(productId);
    }
    else {
        renderNewBasket(productId)
    }
}

function renderNewBasket(productId) {
    let productRow = `
    <div class="basketRow">
            <div>${productsData[productId].productName}</div>
            <div>
                <span class="productCount" data-productid="${productId}">1</span> шт.
            </div>
            <div>$${productsData[productId].productPrice}</div>
            <div>
                $<span class="productTotalRow" data-productid="${productId}">${productsData[productId].productPrice}</span>
            </div>
        </div>
    `;
    basketTotalElement.insertAdjacentHTML("beforebegin", productRow);
}

function increaseCount(productId) {
    let productCount = document.querySelector(`.productCount[data-productid="${productId}"]`);
    console.log(productCount);
    console.log(productCount.textContent++);
}

function recalculateSum(productId) {
    let productTotalRow = document.querySelector(`.productTotalRow[data-productid="${productId}"]`);
    let totalPriceForRow = (basket[productId] * productsData[productId].productPrice).toFixed(2);
    productTotalRow.textContent = totalPriceForRow;
}

function calculateAndRenderTotalBasket() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * productsData[productId].productPrice;
    }
    basketTotalValueElement.textContent = totalSum.toFixed(2);
}


//открытие и закрытие корзины

let basketBtn = document.querySelector(".btns");
basketBtn.addEventListener('click', function () {
    basketElement.classList.toggle('hidden');
});

