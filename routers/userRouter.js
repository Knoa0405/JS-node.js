import express from "express";
import routes from "../routes";
import { userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();


userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail); // id를 인자로 해서 실행하지 않기 때문에 userDetail() <- 함수 실행 return 값은 무조건 /:id

export default userRouter;