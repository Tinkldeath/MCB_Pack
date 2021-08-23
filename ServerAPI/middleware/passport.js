const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Keys = require('./../config/keys');
const User = require('./../models/userModel');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: Keys.jwt
}

module.exports = passport => {
    passport.use(
        new JWTStrategy(options, async (payload, done) => {
            try{
                const user = await User.findById(payload._id);
                if(user){
                    done(null,user);
                }
                else{
                    done(null,false);
                }
            }catch(err){
                console.log(err);
            }
        })
    );
}