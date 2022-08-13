import {clearEditedPromotion} from "./createPromotion/promotionManager.mjs";

const createPromotion = document.querySelector('#createPromotion');
createPromotion.addEventListener('click', () => {
    clearEditedPromotion();
    window.location.assign("createPromotion/createPromotion.html");
});