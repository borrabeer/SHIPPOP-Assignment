import express from "express"
import isEmpty from "is-empty";
import passport from "passport";
import { BookModel, UserModel } from "../models";
import { validateBookCreateInput, validateBookUpdateInput } from "../validators/book";
import jwt_decode from "jwt-decode"

const router = express.Router();

// @route GET api/books/allbooks
// @desc get all books with hidden = false
// @access Public
router.get("/allbooks", (req, res) => {
    BookModel.find({ hidden: false }).then((book) => {
        if (isEmpty(book)) {
            return res.status(404).json({ error: "Books not found" })
        }
        return res.json(book)
    })
})

// @route GET api/books/:bookId
// @desc get detail of a specific book from params
// @access Public
router.get("/:bookId", (req, res) => {
    BookModel.findById(req.params.bookId).then((book) => {
        return res.json(book)
    }).catch((err) => {
        return res.status(404).json({ error: "Book not found" })
    })
})

const requireJWTAuth = passport.authenticate("jwt", { session: false })

// @route POST api/books/create
// @desc send request to create a book
// @access Private (need to verify token from headers)
router.post("/create", requireJWTAuth, (req, res) => {
    const { errors, isValid } = validateBookCreateInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    BookModel.findOne({ barcode: req.body.barcode }).then((book) => {
        if (book) {
            return res.status(400).json({ barcode: "Barcode already exists" })
        } else {
            const newBook = new BookModel({
                userId: payload.id,
                name: req.body.name,
                productType: req.body.productType,
                author: req.body.author,
                publisher: req.body.publisher,
                barcode: req.body.barcode,
                category: req.body.category,
                price: req.body.price,
                discount: req.body.discount,
                description: req.body.description,
                hidden: req.body.hidden,
            })
            newBook
                .save()
                .then((book) => {
                    return res.status(201).json(book)
                })
                .catch((err) => console.log(err))
        }
    })
})

// @route PATCH api/books/update/:bookId
// @desc send request to edit a book
// @access Private (need to verify token from headers)
router.patch("/update/:bookId", requireJWTAuth, (req, res) => {
    const { errors, isValid } = validateBookUpdateInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    UserModel.findById(payload.id).then((user) => {
        if (user) {
            BookModel.findById(req.params.bookId).then((book) => {
                if (book.userId == user._id) {
                    BookModel.findById(book._id).then((book) => {
                        book.name = req.body.name
                        book.author = req.body.author
                        book.publisher = req.body.publisher
                        book.category = req.body.category
                        book.price = req.body.price
                        book.discount = req.body.discount
                        book.description = req.body.description
                        book.hidden = req.body.hidden
                        book
                            .save()
                            .then((update) => {
                                return res.status(200).json(update)
                            })
                            .catch((err) => console.log(err))
                    }).catch((err) => {
                        return res.status(400).json({ error: "Update book fail" })
                    })
                } else {
                    return res.status(400).json({ error: "You do not have permission to update this book" })
                }
            }).catch((err) => {
                return res.status(400).json({ error: "Update book fail" })
            })
        }
    })
})

// @route DELETE api/books/delete/:bookId
// @desc send request to delete a book
// @access Private (need to verify token from headers)
router.delete("/delete/:bookId", requireJWTAuth, (req, res) => {
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    UserModel.findById(payload.id).then((user) => {
        if (user) {
            BookModel.findById(req.params.bookId).then((book) => {
                if (book.userId == user._id) {
                    book.delete().then(() => {
                        return res.json({ delete: "Delete success" })
                    }).catch((err) => console.log(err))
                } else {
                    return res.status(400).json({ error: "You do not have permission to delete this book" })
                }
            }).catch((err) => {
                return res.status(400).json({ error: "Delete book fail" })
            })
        }
    })
})

export const BookRouter = router;