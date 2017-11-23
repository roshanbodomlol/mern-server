const passport = require('passport');
const jwt = require('jwt-simple');

const getToken = (email) => {
    const payload = {
        email
    };
    const token = jwt.encode(payload, process.env.SECRET);
    return token;
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

exports.apiLogin = passport.authenticate('local');

exports.apiAuthenticate = passport.authenticate('jwt', {  session: 'false'  });

exports.sensitiveData = (req, res) => {
    res.json({
        status: "Token Authenticated"
    });
};

exports.refreshToken = (req, res) => {
    res.json({
        status: "success"
    });
};

exports.sendLoggedInData = (req, res) => {
    res.send({
        status: 'success',
        token: getToken(req.body.email)
    });
};
