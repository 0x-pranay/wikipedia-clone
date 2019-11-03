
// Wiki:MainPage
exports.get_index = (req, res) => {
    
    res.render('wiki', {
        title: 'Main Page',
        user: req.user,
        name: req.user.name,
    });
};

// temp.
exports.post_index = (req, res) => {

    res.render('wiki', {
        title: 'Main Page',
        user: req.user,
        name: req.name,
    });
};


// Page to test new features and playaround.
exports.playground = (req, res) => {
    res.render('playground', {
        title: 'Playground',
    });
}
 