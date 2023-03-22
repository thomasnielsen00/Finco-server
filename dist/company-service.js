"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_pool_1 = __importDefault(require("./mysql-pool"));
class CompanyService {
    //  * Get all companies
    getAll() {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM company", (error, results) => {
                if (error)
                    return reject(error);
                resolve(results);
            });
        });
    }
    // Get all values associated to a company.
    get(company_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM company WHERE company_id = ?", [company_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results[0]);
            });
        });
    }
    // Get all values associated to a company.
    getCalculations(company_id) {
        return new Promise((resolve, reject) => {
            mysql_pool_1.default.query("SELECT * FROM company WHERE company_id = ?", [company_id], (error, results) => {
                if (error)
                    return reject(error);
                resolve(results[0]);
            });
        });
    }
}
const companyService = new CompanyService();
exports.default = companyService;
//# sourceMappingURL=company-service.js.map