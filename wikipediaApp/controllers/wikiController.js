
// Wiki:MainPage
exports.get_index = (req, res) => {
    console.log(req.user)
    res.render('wiki', {
        title: 'Main Page',
        user: req.user,
        name: req.user.name,
    });
};

exports.post_index = (req, res) => {

    res.render('wiki', {
        title: 'Main Page',
        user: req.user,
        name: req.name,
    });
};

exports.playground = (req, res) => {
    res.render('playground', {
        title: 'Playground',
    });
}
 