import express from "express"; // express 는 일종의 프레임워크이다.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

// const middleware = (req,res,next) => {
//     res.send("not happening ! ")
// } 이렇게 중간에서 응답 response 해버리면 next 가 응답할 필요가 없으므로 handleHome 응답? 함수는 사용되지 않는다.

// const middleware = (req,res,next) => {
// console.log("hi middle!")
// next(); 일반적으로 이렇게 사용되면 중간에서 요청응답을 끊지않고 중간에서 사용이 가능하다.
//}
app.use(helmet()); // NodeJs 보안을 위한 것 helmet 미들웨어
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 미들웨어 - 웹 브라우저가 해당 url로 GET 메소드로 요청하고 웹 서버가 응답시 그 사이에서 오고 가는 중간 로그 확인가능 
// 많은 미들웨어가 있다 그 중 하나가 morgan
// app.get("/",handleHome); // <- "/",middleware,handleHome 이렇게 들어간다.
app.use(localMiddleware);


app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;