import * as express from "express";
import userRoutes from "./user.route";
import exerciseRoutes from "./exercise.route";
import actualExerciseRoutes from "./actual.route";

const createRouter = function() {
  const router = express.Router();
  router
    .get("/", (req, res, next) => res.send("root"))
    .get("/health-check", (req, res, next) => res.send("OK!"))
    .use("/users", userRoutes)
    .use("/exercise", exerciseRoutes)
    .use("/actual", actualExerciseRoutes)
    .use("/routine", actualExerciseRoutes);

  return router;
};

export default createRouter;