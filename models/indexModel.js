const db = require('./conn');

class BusinessInfo {
    constructor(id, name, address, category){
        this.id = id;
        this.name = name;
        this.address = address;
        this.category = category;
    };

    static async getAllBusiness() {
        try {
            const response = await db.any(`SELECT * FROM restaurant;`);
            return response;
        }catch(err){
            console.error(err); 
        }
    };

    static async getBusinessById(id) {
        try {
            const response = await db.any(`SELECT * FROM restaurant WHERE restaurant.id = ${id};`);
            return response;
        }catch(err){
            console.error(err); 
        }
    }

    static async getReviewsByBusinessID(id) {
        try {
            const response = await db.any(`SELECT * FROM review INNER JOIN restaurant ON restaurant.id = review.restaurant_id WHERE restaurant.id = ${id};`);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = BusinessInfo;