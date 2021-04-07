import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect(`mongodb+srv://cluster0.8xcag.mongodb.net`, {
    dbName: "book-store",
    user: "borrabeer",
    pass: process.env.DB_PASSWORD,
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
