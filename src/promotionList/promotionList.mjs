import {PromotionApi} from "../network/promotionApi.js";

function formatDate(date) {
    return dayjs(date).format('YYYY.MM.DD')
}

function createPromotionListRow(promotion) {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    id.appendChild(document.createTextNode(promotion.id));
    const title = document.createElement("td");
    title.appendChild(document.createTextNode(promotion.title));
    const starDate = document.createElement("td");
    starDate.appendChild(document.createTextNode(formatDate(promotion.startDate)));
    const endDate = document.createElement("td");
    endDate.appendChild(document.createTextNode(formatDate(promotion.endDate)));
    const type = document.createElement("td");
    type.appendChild(document.createTextNode(promotion.type));
    const description = document.createElement("td");
    description.appendChild(document.createTextNode(promotion.description));
    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(starDate);
    tr.appendChild(endDate);
    tr.appendChild(type);
    tr.appendChild(description);
    return tr;
}


function showPromotions(promotions) {
    const promotionListElement = document.querySelector('#list');
    const rows = document.querySelectorAll('#list td');
    rows.forEach(row => row.remove());
    promotions
        .map(createPromotionListRow)
        .forEach(element => promotionListElement.appendChild(element));
}

async function loadAndShowPromotions(filter) {
    showPromotions(await PromotionApi.getPromotions(filter));
}

loadAndShowPromotions().then(() => {
});

document.querySelector('#allButton').addEventListener('click', () => {
    loadAndShowPromotions();
})

document.querySelector('#discountFilterButton').addEventListener('click', () => {
    loadAndShowPromotions({type: 'discount'});
})

document.querySelector('#reductionFilterButton').addEventListener('click', () => {
    loadAndShowPromotions({type: 'reduce'});
})