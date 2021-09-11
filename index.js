const express = require("express");
const { ExpressError } = require("./ExpressError");
const { getMean, getAndSortNums, getMode, allAreNumbers } = require("./helpers");

const app = express();
app.use(express.json());


app.get("/mean", (req, res, next) => {
    try {
        let nums = req.query.nums.split(',');
        if (nums.length === 1 && nums[0] === '') throw new ExpressError("Nums are required.", 400);
        if (!allAreNumbers(nums)) throw new ExpressError("At least one of the arguments is not a number", 400);
        let mean = getMean(nums);
        return res.json({
            operation: "mean",
            mean
        });
    } catch(err) {
        return next(err);
    }
});


app.get("/median", (req, res, next) => {
    try {
        let nums = req.query.nums.split(',');
        if (nums.length === 1 && nums[0] === '') throw new ExpressError("Nums are required.", 400);
        if (!allAreNumbers(nums)) throw new ExpressError("At least one of the arguments is not a number", 400);
        nums = getAndSortNums(nums);
        return res.json({
            operation: "median",
            median: nums[Math.floor(nums.length / 2)]
        });
    } catch(err) {
        return next(err);
    }
})


app.get("/mode", (req, res, next) => {
    console.log(req.query)
    try {
        let nums = req.query.nums.split(',');
        if (nums.length === 1 && nums[0] === '') throw new ExpressError("Nums are required.", 400);
        if (!allAreNumbers(nums)) throw new ExpressError("At least one of the arguments is not a number", 400);
        nums = getAndSortNums(nums);
        return res.json({
            operation: "mode",
            mode: getMode(nums)
        });
    } catch(err) {
        return next(err);
    };
});


app.use((req, res, next) => {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
})


app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    return res.status(status).json({
        error: {message, status}
    });
});


app.listen(3000, () => {
    console.log("Listening on port 3000.");
});