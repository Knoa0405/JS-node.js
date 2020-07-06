import routes from "../routes";
import Video from "../models/Video";

// Home

export const home = async(req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 }); // videos 는 array 형태 Finds documents(model에서 저장된 )
        res.render("home", { pageTitle: "Home", videos: videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }

};

// Search

export const search = async(req, res) => {
    // const searchingBy = req.query.term;
    // ES6 문법으로 나타내면 아래와 같다.
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i" }
        })
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos }); // 템플릿 각각에 정보를 전달하는 방식
};

// Upload

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async(req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    console.log(path);
    const newVideo = await Video.create({
            fileUrl: path,
            title,

            description
        })
        // const { body , file } = req; // 여기서 file은 바로 템플릿에서 클라이언트 요청에 의해 바로 넘어오는 파일이 아니라 미들웨어 multer(uploadVideo)를 거쳐 파싱되어 들어오는 file 이다. 
        // console.log(body,file); // 그래서 콘솔 찍으면 정보가 다르다.
        // to Do : Upload and Save video

    res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail

export const videoDetail = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

// Edit Video

export const getEditVideo = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
        res.render(routes.home);
    }
};

export const postEditVideo = async(req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    const test = Video.findById(id)
    console.log(test);
    try {
        await Video.findOneAndUpdate({ _id: id }, { title: title, description: description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.render(routes.home);
    }
};

// Delete video

export const deleteVideo = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        await Video.findOneAndRemove({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};