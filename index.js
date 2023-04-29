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
    async (username, password, done) => {
        try {
            // Replace this with your own user lookup function
            const user = { id: 1, username: 'admin', password: '$2b$10$uS/fBcV7iuuTFT/dh/7iXe14z/G3lpwj/lpP.8h7g69CXiF2rv7nG' };
            if (username === user.username && await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid username or password' });
            }
        } catch (err) {
            done(err);
        }
    }
));
 
passport.serializeUser((user, done) => {
    done(null, user.id);
});
 
passport.deserializeUser((id, done) => {
    // Replace this with your own user lookup function
    const user = { id: 1, username: 'admin' };
    done(null, user);
});
 
app.get('/', (req, res) => {
    res.send('Hello, Refactoring part!');
});
 
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));
 
app.get('/login', (req, res) => {
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
 
app.listen(PORT, () => {
    console.log(Server listening on http://localhost:${PORT});
});
