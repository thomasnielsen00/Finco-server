"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_service_1 = __importDefault(require("./company-service"));
/**
 * Express router containing methods.
 */
const router = express_1.default.Router();
router.get("/", (_request, response) => {
    response.send("Welcome to the Finco-API");
});
// Gets all companies
router.get("/companies", (_request, response) => {
    company_service_1.default
        .getAll()
        .then((rows) => response.send(rows))
        .catch((error) => response.status(500).send(error));
});
// Gets one company with given id
router.get("/companies/:company_id", (request, response) => {
    const company_id = Number(request.params.company_id);
    company_service_1.default
        .get(company_id)
        .then((company) => company
        ? response.send(company)
        : response.status(404).send("Company not found"))
        .catch((error) => response.status(500).send(error));
});
// Gets all company calculations for the admin-page with given id
router.get("/companycalculations/:company_id", (request, response) => {
    const company_id = Number(request.params.company_id);
    company_service_1.default
        .getCalculations(company_id)
        .then((company) => company
        ? response.send(company)
        : response.status(404).send("Company not found"))
        .catch((error) => response.status(500).send(error));
});
exports.default = router;
//# sourceMappingURL=company-router.js.map