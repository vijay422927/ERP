import { app } from "./app.js";
import { connectDb } from "./src/db/index.js";
connectDb()
    .then(() => {
        app.listen(process.env.PORT || 7000, () => {
            console.log("server is cnnected sucessfully");

        })
    })
    .catch((err) => {
        console.log("server connection failed", err);

    })
    