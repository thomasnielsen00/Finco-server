"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_router_1 = __importDefault(require("./company-router"));
const user_router_1 = __importDefault(require("./user-router"));
const cors = require("cors");
// import path from 'path';
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
//only allows client to use api
app.use(cors({
    origin: "https://finco-client.vercel.app",
}));
app.use("/api", company_router_1.default, user_router_1.default);
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
exports.default = app;
//test
//# sourceMappingURL=index.js.map