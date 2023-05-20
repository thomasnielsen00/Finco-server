"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_pool_1 = __importDefault(require("./mysql-pool"));
class UserService {
    /**
     * Get all users.
     */
    getAllUsers() {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM user", [], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    }
    /**
     * Get user with given id.
     */
    getUser(user_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM user WHERE user_id = ?", [user_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results[0]);
            });
        });
    }
    /**
     * Get user with given email and password
     */
    signInUser(email) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results[0]);
            });
        });
    }
    /**
     * Check if e-mail exists
     */
    emailCheck(email) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM user WHERE email = ?", [email], (error, results) => {
                if (error)
                    return reject(error);
                if (results.length != 0)
                    reject("E-mail in use");
                resolve();
            });
        });
    }
    /**
     * Create new user having the given username, password, email, risk_willingness, monthly_savings_amount.
     *
     * Resolves the newly created users user_id.
     */
    createUser(full_name, email, password) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("INSERT INTO user SET full_name=?, email=?, password=?, phone_number=? ,risk_willingness=?, savings_from=?, savings_to=?, admin=?", [full_name, email, password, "Not selected", "Not selected", 0, 0, 0], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results.insertId);
            });
        });
    }
    /**
     * Updates a user with given user_id.
     */
    updateUser(user) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("UPDATE user SET full_name=?, email=?, password=?, phone_number=?, savings_from=?, savings_to=?, risk_willingness=? WHERE user_id=?", [
                user.full_name,
                user.email,
                user.password,
                user.phone_number,
                user.savings_from,
                user.savings_to,
                user.risk_willingness,
                user.user_id,
            ], (error, _results) => {
                if (error)
                    return reject(error);
                resolve();
            });
        });
    }
    /**
     * Delete user with given user_id.
     */
    deleteUser(user_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("DELETE FROM user WHERE user_id = ?", [user_id], (error, results) => {
                if (error)
                    return reject(error);
                if (results.affectedRows == 0)
                    reject(new Error("No row deleted"));
                resolve();
            });
        });
    }
    //--------------------------------------------------------------------------------------------------------------------------------------
    //INVESTMENTS:
    //--------------------------------------------------------------------------------------------------------------------------------------
    //I BEGGE GET-METODENE UNDER BØR JEG KANSKJE OGSÅ HENTE UT
    //SELVE NAVNET PÅ INVESTERINGSVIRKSOMHETEN GJENNOM EN JOIN:
    /**
     * Get all investments for a given user.
     */
    getAllUserInvestments(user_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM investment, company WHERE company.company_id = investment.company_id AND user_id=? AND sell_date IS NULL", [user_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    }
    /**
     * Get an investment for a given user with a given investment_id.
     */
    getUserInvestment(user_id, investment_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM investment WHERE user_id=? AND investment_id=? AND sell_date IS NULL", [user_id, investment_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results[0]);
            });
        });
    }
    /**
     * Create new investment for a given user having the following attributes: username, password, email, risk_willingness, monthly_savings_amount.
     *
     * Resolves the newly created users id.
     */
    createUserInvestment(amount, buy_price, buy_date, user_id, company_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("INSERT INTO investment SET amount=?, buy_price=?, buy_date=?, user_id=?, company_id=?", [amount, buy_price, buy_date, user_id, company_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results.insertId);
            });
        });
    }
    /**
     * Updates a user-investment with given investment-id.
     */
    updateSoldUserInvestment(sell_date, user_id, investment_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("UPDATE investment SET sell_date=? WHERE user_id=? AND investment_id=?", [sell_date, user_id, investment_id], (error, _results) => {
                if (error)
                    return reject(error);
                resolve();
            });
        });
    }
    /**
     * Delete a user-investment with given investment_id.
     */
    deleteUserInvestment(investment_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("DELETE FROM investment WHERE investment_id = ?", [investment_id], (error, results) => {
                if (error)
                    return reject(error);
                if (results.affectedRows == 0)
                    reject(new Error("No row deleted"));
                resolve();
            });
        });
    }
    //------------------------------------------------------------------------------
    //         USER-PREFERED-INDUSTRY
    //------------------------------------------------------------------------------
    /**
     * Get all industries prefered by a given users.
     */
    getAllPreferedIndustries(user_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM prefered_industry, industry WHERE prefered_industry.industry_id = industry.industry_id AND user_id=? ", [user_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    }
    /**
     * Get a prefered industry for a given user.
     */
    getPreferedIndustry(user_id, industry_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM prefered_industry, industry WHERE prefered_industry.industry_id = industry.industry_id AND prefered_industry.user_id = ? AND prefered_industry.industry_id=?", [user_id, industry_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results[0]);
            });
        });
    }
    /**
     * Get a all industries regardless of a user.
     */
    getAllIndustries() {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM industry ", (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    }
    createNewPreferedIndustry(user_id, industry_name) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query(`INSERT INTO prefered_industry (user_id, industry_id)
        SELECT ?, (SELECT industry_id FROM industry WHERE industry_name = ?)
        WHERE NOT EXISTS (
          SELECT 1 FROM prefered_industry WHERE user_id = ? AND industry_id = (SELECT industry_id FROM industry WHERE industry_name = ?)
        )`, [user_id, industry_name, user_id, industry_name], (error, _results) => {
                if (error)
                    return reject(error);
                resolve();
            });
        });
    }
    /**
     * Update a prefered industry for a given user.
     */
    // updatePreferedIndustry(industry: Industry) {
    //   return new Promise<void>((resolve, reject) => {
    //     pool.query(
    //       'UPDATE prefered_industry SET prefered_industry.industry_id=(SELECT industry_id FROM industry WHERE industry_name=?) WHERE prefered_industry.user_id=? AND prefered_industry.industry_id=?',
    //       [industry.industry_name, industry.user_id, industry.industry_id],
    //       (error, _results) => {
    //         if (error) return reject(error);
    //         resolve();
    //       }
    //     );
    //   });
    // }
    /**
     * Delete a prefered industry for a given user.
     */
    deletePreferedIndustry(industry_id, user_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("DELETE FROM prefered_industry WHERE prefered_industry.industry_id=? AND prefered_industry.user_id=?", 
            //'DELETE FROM prefered_industry WHERE prefered_industry.industry_id=(SELECT industry_id FROM industry WHERE industry_name=?) AND prefered_industry.user_id=?',
            [industry_id, user_id], (error, results) => {
                if (error)
                    return reject(error);
                if (results.affectedRows == 0)
                    reject(new Error("No row deleted"));
                resolve();
            });
        });
    }
}
const userService = new UserService();
exports.default = userService;
//# sourceMappingURL=user-service.js.map