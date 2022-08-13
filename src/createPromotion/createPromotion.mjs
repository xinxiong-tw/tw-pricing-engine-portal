import {PromotionApi} from "../network/promotionApi.js";

class PromotionManager {
    static newPromotion = {};
    static editedPromotion;

}

const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const priorityInput = document.querySelector('#priority');
const startDateInput = document.querySelector('#startDate');
const endDateInput = document.querySelector('#endDate');
const isEnabledInput = document.querySelector('#enabled');
const descriptionInput = document.querySelector('#description');
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

form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const dataObject = Object.fromEntries(data.entries());
    dataObject.isEnabled = dataObject.isEnabled === 'true';
    dataObject.isVipOnly = dataObject.isVipOnly === 'true';
    dataObject.discountRate = Number(dataObject.discountRate);
    dataObject.reductionAmount = Number(dataObject.reductionAmount);
    dataObject.priority = Number(dataObject.priority);
    PromotionApi.createPromotion(dataObject).then(console.log);
});
