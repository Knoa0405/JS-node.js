import express from "express";
const app = express();
const PORT = 4000;

const handleListening = ()  => console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req,res) => res.send("hello home coming!");

const handleProFile = (req,res) => res.send("hello ProFile !!");

app.get("/",handleHome);
app.get("/profile", handleProFile);
app.listen(4000,handleListening); 