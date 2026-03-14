const path = require('path');

const wildCardController = (req, res) => {
    res.sendFile(path.join(__dirname, "../", "../", "public/dist/index.html"));
}
module.exports = wildCardController