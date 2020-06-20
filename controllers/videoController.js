import{ videos } from "../db"

export const home = (req,res) => {
    res.render("home", { pageTitle : "Home", videos : videos });
};

export const search = (req,res) => { 
    const {
        query : { term : searchingBy }
    } = req;
    res.render("search",{ pageTitle : "Search", searchingBy }); // 템플릿 각각에 정보를 전달하는 방식
}

export const upload = (req,res) =>
    res.render("upload", { pageTitle : "Upload"});

export const videoDetail = (req,res) =>
    res.render("videoDetail", { pageTitle : "VideoDetail"});

export const editVideo = (req,res) =>
    res.render("editVideo", { pageTitle : "EditVideo"});

export const deleteVideo = (req,res) =>
    res.render("deleteVideo", { pageTitle : "DeleteVideo"});