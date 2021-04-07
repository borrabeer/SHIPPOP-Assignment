import express from "express"
import passport from "passport";
import { CartModel } from "../models";
import jwt_decode from "jwt-decode"
import isEmpty from "is-empty";

const router = express.Router();

const requireJWTAuth = passport.authenticate("jwt", { session: false })

// @route GET api/cart/
// @desc send request to get products in cart
// @access Private (need to verify token from headers)
router.get("/", requireJWTAuth, (req, res) => {
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    CartModel.findOne({ userId: payload.id }).then((cart) => {
        return res.json(cart)
    }).catch((err) => {
        return res.json({ cart: "Cart Item not found" })
    })
})

// @route POST api/cart/add
// @desc send request to edit a book
// @access Private (need to verify token from headers)
router.post("/add", requireJWTAuth, (req, res) => {
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    CartModel.findOne({ userId: payload.id }).then((cart) => {
        if (!isEmpty(cart.products)) {
            cart.products.forEach((product) => {
                if (product.bookId == req.body.bookId) {
                    product.amount += Number.parseInt(req.body.amount)
                }
            });
        } else {
            cart.products.push({
                bookId: req.body.bookId,
                amount: req.body.amount
            })
        }
        cart.save().then((updateCart) => res.json(updateCart)).catch((err) => console.log(err))
    }).catch((err) => {
        const newCart = new CartModel({
            userId: payload.id,
            products: []
        })
        if (!isEmpty(req.body.bookId) && !isEmpty(req.body.amount)) {
            newCart.products.push({
                bookId: req.body.bookId,
                amount: req.body.amount
            })
            newCart.save().then((cart) => res.json(cart)).catch((err) => console.log(err))
        } else {
            return res.status(400).json({ error: "Add cart item fail" })
        }

    })
})

// @route DELETE api/cart/remove
// @desc send request to remove a product from cart
// @access Private (need to verify token from headers)
router.delete("/remove", requireJWTAuth, (req, res) => {
    const token = req.headers.authorization.slice(7);
    const payload = jwt_decode(token);
    CartModel.findOne({ userId: payload.id }).then((cart) => {
        cart.products.forEach((product, index, object) => {
            if (product.bookId == req.body.bookId) {
                object.splice(index, 1);
            }
        });
        cart.save().then((updateCart) => res.json(updateCart)).catch((err) => console.log(err))
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({ error: "Remove cart item fail" })
    })
})

export const CartRouter = router;