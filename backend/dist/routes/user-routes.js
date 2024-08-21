import { Router } from 'express';
import { getAllusers, userSignup, userLogin, verifyUser, userLogout } from '../controllers/user-controller.js';
import { validate, signupValidator, loginValidator } from '../utils/validator.js';
import { verifyToken } from '../utils/token-manager.js';
const userRouter = Router();
userRouter.get("/", getAllusers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);
export default userRouter;
//# sourceMappingURL=user-routes.js.map