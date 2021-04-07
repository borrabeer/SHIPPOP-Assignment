import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validateRegisterInput, validateLoginInput } from "../validators"
import { UserModel } from "../models"

const router = express.Router();

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    UserModel.findOne({ email: req.body.email }).then((email) => {
        if (email) {
            return res.status(400).json({ email: "Email already exists" })
        } else {
            UserModel.findOne({ username: req.body.username }).then((user) => {
                if (user) {
                    return res.status(400).json({ username: "Username already exists" })
                } else {
                    const newUser = new UserModel({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash
                            newUser
                                .save()
                                .then((user) => res.json(user))
                                .catch((err) => console.log(err))
                        })
                    })
                }
            })
        }
    })
})

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const username = req.body.username
    const password = req.body.password

    UserModel.findOne({ username }).then((user) => {
        if (!user) {
            return res.status(404).json({ username: "Username not found" })
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    username: user.username
                }

                jwt.sign(
                    payload,
                    process.env.SECRET_KEY,
                    {
                        expiresIn: 86400
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        })
                    }
                )
            } else {
                return res.status(400).json({ password: "Password incorrect" })
            }
        })
    })
})

export const UserRouter = router;