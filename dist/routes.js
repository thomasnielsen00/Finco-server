"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/**
 * Express router containing methods.
 */
const router = express_1.default.Router();
router.get("/", (_request, response) => {
    return response.send("Testing api paths");
});
// router.get('/tasks/:id', (request, response) => {
//   const id = Number(request.params.id);
//   taskService
//     .get(id)
//     .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
//     .catch((error) => response.status(500).send(error));
// });
exports.default = router;
//# sourceMappingURL=routes.js.map