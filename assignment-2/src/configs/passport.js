import passportJwt from "passport-jwt"
import { UserModel } from "../models"
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt
const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET_KEY

export const passportModule = (passport) => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            UserModel.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => console.log(err));
        })
    );
}

export default passportModule;