import routes from "../routes";
import Video from "../models/Video";

export const home = async (req,res) => {
    try {
        const videos = await Video.find({}); // videos 는 array 형태 Finds documents(model에서 저장된 )
        res.render("home", { pageTitle : "Home", videos : videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle : "Home", videos : [] });
    }
 
};

export const search = (req,res) => { 
    // const searchingBy = req.query.term;
    // ES6 문법으로 나타내면 아래와 같다.
    const {
        query : { term : searchingBy }
    } = req;
    res.render("search",{ pageTitle : "Search", searchingBy, videos }); // 템플릿 각각에 정보를 전달하는 방식
}

export const getUpload = (req,res) => {
    res.render("upload", { pageTitle : "Upload"});
}
export const postUpload = async(req,res) => {
    const {
        body : { title, description},
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description
    })
    // const { body , file } = req; // 여기서 file은 바로 템플릿에서 클라이언트 요청에 의해 바로 넘어오는 파일이 아니라 미들웨어 multer를 거쳐 파싱되어 들어오는 file 이다. 
    // console.log(body,file); // 그래서 콘솔 찍으면 정보가 다르다.
    // to Do : Upload and Save video

    res.redirect(routes.videoDetail(newVideo.id));
}

export const videoDetail = (req,res) =>
    res.render("videoDetail", { pageTitle : "VideoDetail"});

export const editVideo = (req,res) =>
    res.render("editVideo", { pageTitle : "EditVideo"});

export const deleteVideo = (req,res) =>
    res.render("deleteVideo", { pageTitle : "DeleteVideo"});