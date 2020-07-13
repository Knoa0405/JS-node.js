import app from "./app";
import "./db";
import dotenv from "dotenv";
// .env 에 키를 숨겨 보안 이슈를 해결한다.(dotenv로 사용)
dotenv.config();

import "./models/User";
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

app.listen(PORT, handleListening);