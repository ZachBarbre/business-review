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
            const response = await db.any(`SELECT id, name, category, address FROM restaurant WHERE restaurant.id = ${id};`);
            return response;
        }catch(err){
            console.error(err); 
        }
    }

    static async getReviewsByBusinessID(id) {
        try {
            const response = await db.any(`SELECT review.review, review.title, review.stars, reviewer.name FROM review INNER JOIN restaurant ON restaurant.id = review.restaurant_id INNER JOIN reviewer ON reviewer.id = review.reviewer_id WHERE restaurant.id = ${id};`);
            return response;
        } catch (err) {
            console.error(err);
        }
    }

    static async getAverageStarsById(id){
        try {
            const response = await db.any(`select AVG(stars) from review WHERE restaurant_id = ${id} GROUP BY stars;`);
            return response;
        } catch (err) {
            console.error(err);
            
        }
    }
    static async postReviewbyBusinessId(reviewer_id, stars, review, restaurant_id, title){
        try {
            const response = await db.one(`INSERT INTO review(reviewer_id, stars, review, restaurant_id, title)
            VALUES ($1, $2, $3, $4, $5) RETURNING id;`,[reviewer_id, stars, review, restaurant_id, title])
            return response;
        } catch (err){
            console.error(err);
        }
    }
};

module.exports = BusinessInfo;