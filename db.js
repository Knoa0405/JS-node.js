import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";

mongoose.connect(
// .env 에 키를 숨겨 보안 이슈를 해결한다.(dotenv로 사용) ? 환경변수라고 한다.
    process.env.MONGO_URL,
    {
        useNewUrlParser : true,
        useFindAndModify : false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = () => console.log(`Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);