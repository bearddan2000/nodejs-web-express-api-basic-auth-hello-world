var app = require('express')();
const basicAuth = require('express-basic-auth')

const data = [
    { breed: "Am Bulldog", color: "White", id: 1 },
    { breed: "Blue Tick", color: "Grey", id: 2 },
    { breed: "Labrador", color: "Black", id: 3 },
    { breed: "Gr Shepard", color: "Brown", id: 4 }
];

app.use(basicAuth({
    users: { 'maria': 'pass' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
}))

function getUnauthorizedResponse(req) {
    return req.auth
        ? ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected')
        : 'No credentials provided'
}

// middleware called before each route
app.use(function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/', function(req, res) {
    res.json(data);
    //res.send('Hello World');
});

app.listen(8000, () => {
    console.log('api listening on port 8000')
})
