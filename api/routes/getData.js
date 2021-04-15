var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', async function(req, response, next) {
    await request('https://herocoders.atlassian.net/rest/api/3/project/IC/components', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
        response.send(body)
    });
});

module.exports = router;