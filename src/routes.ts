import express from "express";

/**
 * Express router containing methods.
 */
const router = express.Router();

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

export default router;
