const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.validateRegister = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a Name').notEmpty();
    req.checkBody('email', 'The Email Address is not valid').isEmail();
    // req.sanitizeBody('email').normalizeEmail({
    //     remove_dots: false,
    //     remove_extension: false,
    //     gmail_remove_subaddress: false
    // });
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.checkBody('passwordConfirm', 'Confirmed password cannot be empty').notEmpty();
    req.checkBody('passwordConfirm', 'Your passwords do not match').equals(req.body.password);
    const errors = req.validationErrors();
    if (errors) {
        res.json({
            status: 'failed',
            errors: errors
        });
        return;
    }
    next();
};

exports.apiRegister = (req, res, next) => {
    const user = new User({email: req.body.email, name: req.body.name});
    User.register(user, req.body.password, function (err, user) {
        if (err) {
            res.json({
                status: err.name,
                message: err.message
            });
        } else {
            next();
        }
    })
};
