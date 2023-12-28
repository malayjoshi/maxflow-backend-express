const express = require("express");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const endPointRoute = require("./routes/node");
const cors = require('cors');

let corsOptions = {
    origin : ['http://localhost:5173'],
 }

const app = express();
const port = process.env.PORT || 5002;

app.use(morgan("dev"));
app.use(express.json());
app.use('/api',endPointRoute);
app.use(cors(corsOptions));


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error, req, res, next) => {
    console.error(error);

    let errorMessage = "Internal Server Error";
    let statusCode = 500;

    if (error instanceof createHttpError.HttpError) {
        // If it's an HTTP error, use its status and message
        statusCode = error.status;
        errorMessage = error.message;
    }

    res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
