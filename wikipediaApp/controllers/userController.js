// Weclome page for users
exports.index = (req, res) => {
    res.send('Welcome User')};

// Register page for users
exports.users_register = (req, res) => {
    res.render('register', { title: "Register"});
};

// Login page for users.
exports.users_login = (req, res) => {
    res.render('login', { title: "Login"});
};

