// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";


// Users

const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";


// videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit"; //웹 프레임워크인 express가 url 에서 : 표시는 값이 변하는 것인지 인지한다.
const DELETE_VIDEO = "/:id/delete";


const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail : USER_DETAIL,
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    upload : UPLOAD,
    videoDetail : VIDEO_DETAIL,
    editVideo : EDIT_VIDEO,
    deleteVideo : DELETE_VIDEO
};

export default routes;