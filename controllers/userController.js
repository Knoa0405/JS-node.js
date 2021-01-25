import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import multer from 'multer';

export const getJoin = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }

};

export const getLogin = (req, res) => { res.render("login", { pageTitle: "Login" }); };

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
    const { _json: { id, avatar_url, name, email } } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avartarUrl: avatar_url
        });
        return cb(null, newUser);

    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (_, __, profile, cb) => {
    const { _json: { id, name, email } } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.facebookId = id;
            user.name = name;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avartarUrl: `https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);

    } catch (error) {
        return cb(error);
    }

};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "UserDetail", user: req.user });
};

export const userDetail = async (req, res) => {
    const { params: { id } } = req;
    try {
        const user = await (await User.findById(id).populate('videos'));
        res.render("userDetail", { pageTitle: "UserDetail", user });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "EditProfile" });

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try {
        await User.findByIdAndUpdate((req.user._id), {
            email: email,
            name: name,
            avartarUrl: file ? file.path : req.user.avartarUrl
        });
        res.redirect(routes.me);

    } catch (error) {
        res.redirect(routes.editProfile);
    }
}
export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "ChangePassword" });

export const postChangePassword = async (req, res) => {
    const {
        body: {
            oldPassword,
            newPassword,
            newPassword1
        }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
}
// 2021 추가 multer 실습용

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);

            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

export const getUploadFile = (req, res) => {
    console.log(path.join(__dirname, 'multipart.html'));
    res.sendFile(path.join(__dirname, 'multipart.html'));
}

export const postUploadFile = (req, res) => {
    upload.fields([{ name: 'image1' }, { name: 'image2' }]),
        (req, res) => {
            console.log(req.files, req.body);

            res.send('ok');
        },
}