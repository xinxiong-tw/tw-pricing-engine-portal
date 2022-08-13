import {PromotionApi} from "../network/promotionApi.js";
import {clearEditedPromotion, getEditedPromotionId, isEditPromotion, PromotionManager} from "./promotionManager.mjs";

const form = document.querySelector('form');
const typeInput = document.querySelector('#type');
const discountRateInput = document.querySelector('#discountRate');
const reductionAmountInput = document.querySelector('#reductionAmount');

const typeInputMap = {
    'discount': discountRateInput,
    'reduce': reductionAmountInput,
};

typeInput.addEventListener('change', () => {
    Object.entries(typeInputMap).forEach(([key, element]) => {
        if (typeInput.value === key) {
            element.parentElement.parentElement.classList.remove('hide');
            element.required = true;
        } else {
            element.parentElement.parentElement.classList.add('hide');
            element.required = false;
        }
    });
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const dataObject = Object.fromEntries(data.entries());
    dataObject.isEnabled = dataObject.isEnabled === 'true';
    dataObject.isVipOnly = dataObject.isVipOnly === 'true';
    dataObject.discountRate = Number(dataObject.discountRate);
    dataObject.reductionAmount = Number(dataObject.reductionAmount);
    dataObject.priority = Number(dataObject.priority);
    if (isEditPromotion()) {
        await updatePromotion(dataObject);
    } else {
        await createPromotion(dataObject);
    }
    window.location.assign("../promotionList/promotionList.html");
});

function showEditedPromotion() {
    Object.entries(PromotionManager.editedPromotion).forEach(([key, value]) => {
        let element = form.querySelector(`*[name=${key}]`);
        if (element) {
            element.value = value;
        }
    });

    typeInput.dispatchEvent(new Event('change'));
    form.querySelector('input[type=submit]').value = "Update"
}

async function updatePromotion(dataObject) {
    await PromotionApi.updatePromotion(dataObject, getEditedPromotionId());
    clearEditedPromotion();
}

async function createPromotion(dataObject) {
    await PromotionApi.createPromotion(dataObject).then(console.log);
}


if (isEditPromotion()) {
    showEditedPromotion();
}