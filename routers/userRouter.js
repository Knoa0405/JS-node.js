import express from "express";
import routes from "../routes";
import { userDetail, editProfile, changePassword } from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();


userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); // id를 인자로 해서 실행하지 않기 때문에 userDetail() <- 함수 실행 return 값은 무조건 /:id

export default userRouter;