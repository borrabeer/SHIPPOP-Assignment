import express from "express"
import "./mongoose-connect"
import { BookRouter, CartRouter, RateRouter, UserRouter } from "./routes"
import passport from "passport"
import passportModule from "./configs/passport"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

passportModule(passport);

app.use("/api/users", UserRouter);

app.use("/api/books", BookRouter);
app.use("/api/rating", RateRouter);
app.use("/api/cart", CartRouter);
const port = process.env.PORT ?? 5000;
app.listen({ port }, () => {
    console.log(`Bookstore Server ready at http://localhost:${port}`);
});
