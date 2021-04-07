import express from "express"
import passport from "passport";
import { BookModel, RatingModel } from "../models";
import jwt_decode from "jwt-decode"

const router = express.Router();

router.get("/:bookId", (req, res) => {
    RatingModel.find({ bookId: req.params.bookId }).then((rate) => {
        return res.status(200).json(rate)
    }).catch((err) => {
        return res.status(404).json({ error: "Book not found" })
    })
})

const requireJWTAuth = passport.authenticate("jwt", { session: false })

router.post("/rate", requireJWTAuth, (req, res) => {
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    BookModel.findById(req.body.bookId).then((book) => {
        if (book.userId != payload.id) {
            RatingModel.findOne({ bookId: book._id, userId: payload.id }).then((rate) => {
                if (rate) {
                    res.status(400).json({ error: "You already rate this book" })
                } else {
                    const newRate = new RatingModel({
                        bookId: book._id,
                        userId: payload.id,
                        score: req.body.score
                    })
                    newRate.save().then((rate) => res.json(rate))
                }
            })
        } else {
            res.status(400).json({ error: "You cannot rate your own book" })
        }
    })
})

export const RateRouter = router;