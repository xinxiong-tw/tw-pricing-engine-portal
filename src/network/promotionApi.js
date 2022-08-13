export class PromotionApi {
    static PROMOTION_HOST = 'http://localhost:8080'

    static async getPromotions(filter) {
        let url = new URL(this.PROMOTION_HOST + '/promotions');
        if (filter && typeof filter === 'object') {
            Object.entries(filter).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            })
        }
        const response = await fetch(url);
        return await response.json();
    }

    static async createPromotion(data) {
        let url = new URL(this.PROMOTION_HOST + '/promotions');
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    static async updatePromotion(data, id) {
        let url = new URL(`${this.PROMOTION_HOST}/promotions/${id}`);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }
}