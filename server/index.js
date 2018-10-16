require('dotenv').config();

const express = require('express'),
    app = express();
port = process.env.PORT || 3000,
    { json } = require('body-parser'),
    session = require('express-session')
checkForSession = require('./middlewares/checkForSession')
swag_controller = require('./controllers/swag_controller');
auth_controller = require('./controllers/auth_controller');
cart_controller = require('./controllers/cart_controller');
search_controller = require('./controllers/search_controller');


app.use(json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 10000
    }
}));

app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));


app.get('/api/swag', swag_controller.read)

app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user', auth_controller.getUser)

app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)

app.get('/api/search', search_controller.search)



app.listen(port, () => {
    console.log(`Listning on port:${port}`)
})