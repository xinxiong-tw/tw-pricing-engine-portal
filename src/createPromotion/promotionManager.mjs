class PromotionManager {
    static editedPromotion;
}

const proxy = new Proxy(PromotionManager, {
    get(target, p, receiver) {
        return JSON.parse(sessionStorage.getItem(p));
    },

    set(target, p, value, receiver) {
        sessionStorage.setItem(p, JSON.stringify(value));
        return true;
    }
});

export {proxy as PromotionManager};

export function isEditPromotion() {
    return !!proxy.editedPromotion;
}

export function getEditedPromotionId() {
    return proxy.editedPromotion.id;
}

export function clearEditedPromotion() {
    proxy.editedPromotion = null;
}