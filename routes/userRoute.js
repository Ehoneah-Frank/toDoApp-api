import { Router } from "express";
import { registerUser, loginUser, getAuthenticatedUser } from "../controllers/userController.js";

// create router
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user", getAuthenticatedUser);

export default userRouter;