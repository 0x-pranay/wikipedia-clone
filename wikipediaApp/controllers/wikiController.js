
// Wiki:MainPage
exports.get_index = (req, res) => {
    res.render('wiki', {title: 'Main Page'});
};

exports.post_index = (req, res) => {

    res.render('wiki', {
        title: 'Main Page',
        user: req.user,
        name: req.user.name,
    });
};
 