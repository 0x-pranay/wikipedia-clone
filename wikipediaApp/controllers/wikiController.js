const Article = require('../models/Article');
const jsdiff = require('diff');


// Wiki:MainPage
exports.get_index = (req, res) => {
    
    res.render('wiki', {
        title: 'Main Page',
        user: req.user,
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
    // Article.find()
    // .populate('edits')
    // .populate('author')
    // .exec(function(err, articles){

    // });

    let stringA = "<h1> Hello </h1>";
    let stringB = "<h2> <strong> Hello </strong> <h2>";
    let color = '';
    let span = null;
    
    let diff = jsdiff.diffCss(stringA, stringB);
        
    console.log(diff);

    res.render('playground', {
        title: 'Playground',
        anchor: 'edit_article',
        stringA: stringA,
        stringB: stringB,
        diff: diff
    });
}
 