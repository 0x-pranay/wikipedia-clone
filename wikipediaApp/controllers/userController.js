const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User');

// Weclome page for users
exports.index = (req, res) => {
    res.send('Welcome User')};

//  get Register page for users
exports.users_get_register = (req, res) => {
    res.render('register', { title: "Register"});
};

//  POST Register page for users
exports.users_post_register = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please enter all fields'});
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
    // if (password.length < 6) {
    //     errors.push({ msg: 'Password must be at least 6 characters' });
    //   }
    
      if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else{
        User.findOne({ email: email }).then(user => {
            if(user){
                errors.push({ msg: 'Email already exists'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                req.flash(
                                    'success_msg',
                                    'Successfully registered. Log in to continue. '
                                );
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
      }
};

// get Login page for users.
exports.users_get_login = (req, res) => {
    res.render('login', { title: "Login"});
};

// POST Login for users.
exports.users_post_login =(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/wiki',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
}

// Logout user
exports.users_logout = (req, res, next) => {
    req.logout();
    req.flash('success_msg', 'Logged out successfully.');
    res.redirect('/users/login')
}
