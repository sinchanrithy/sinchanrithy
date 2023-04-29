const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(
    function (username, password, done) {
        // Replace this with your own user lookup function
        if (username === 'admin' && bcrypt.compareSync(password, bcrypt.hashSync('password', 10))) {
            return done(null, { id: 1, username: 'admin' });
        } else {
            return done(null, false, { message: 'Invalid username or password' });
        }
    }
));
 
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
    // Replace this with your own user lookup function
    done(null, { id: 1, username: 'admin' });
});
 
app.get('/', function (req, res) {
    res.send('Welcome Software Engineering Final Project');
});
 
app.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);
 
app.get('/login', function (req, res) {
    res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
            <div>
                <label>Username:</label>
                <input type="text" name="username" required>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" required>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `);
});
 
app.listen(PORT, function () {
    console.log(Server listening on http://localhost:${PORT});
});
