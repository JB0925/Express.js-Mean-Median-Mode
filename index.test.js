const { ExpressError } = require("./ExpressError");
const { getMean, getAndSortNums, getMode, allAreNumbers } = require("./helpers");
const axios = require("axios");

describe("Do the mean/median/mode routes return the correct data, given proper inputs?", () => {
    test("test mean route", async() => {
        let res = await axios.get('http://127.0.0.1:3000/mean', {
            params: {nums: '1,3,5,7'}
        });
        let data = res.data;
        expect(data.mean).toEqual(4);
    });
    test("test mean route negative nums", async() => {
        let res = await axios.get('http://127.0.0.1:3000/mean', {
            params: {nums: '-1,3,-5,7'}
        });
        let data = res.data;
        expect(data.mean).toEqual(1);
    });
    test("test median route", async() => {
        let res = await axios.get('http://127.0.0.1:3000/median', {
            params: {nums: '1,3,5,7,6'}
        });
        let data = res.data;
        expect(data.median).toEqual(5);
    });
    test("test median route negative numbers", async() => {
        let res = await axios.get('http://127.0.0.1:3000/median', {
            params: {nums: '-3,0,-2,1,-9'}
        });
        let data = res.data;
        expect(data.median).toEqual(-2);
    });
    test("test mode route", async() => {
        let res = await axios.get('http://127.0.0.1:3000/mode', {
            params: {nums: '1,3,5,7,6,3,3,1,2,4,3,9'}
        });
        let data = res.data;
        expect(data.mode).toEqual(3);
    });
    test("test mode route negative numbers", async() => {
        let res = await axios.get('http://127.0.0.1:3000/mode', {
            params: {nums: '1,3,5,7,6,-3,-3,1,2,4,-3,9'}
        });
        let data = res.data;
        expect(data.mode).toEqual(-3);
    });
});

describe("Do the mean/median/mode routes return the correct errors, given bad data?", () => {
    // NOTE: All three routes have the same error logic, so we only need to test one route.
    test("test mean route no data", async() => {
        try {
            let res = await axios.get('http://127.0.0.1:3000/mean', {
            params: {nums: ''}
            });
            let data = res.data.error;
            expect(data.status).toEqual(400);
        } catch(err) {
            expect(err.response.data.error.message).toEqual("Nums are required.")
        }
    })
    test("test mean route bad data", async() => {
        try {
            let res = await axios.get('http://127.0.0.1:3000/mean', {
            params: {nums: '1,Foo,3'}
            });
            let data = res.data.error;
            expect(data.status).toEqual(400);
        } catch(err) {
            expect(err.response.data.error.message).toEqual("At least one of the arguments is not a number")
        }
    })
})

describe("Do the helper function work as intended?", () => {
    // NOTE: Errors where there may be empty sequences or values that can't be parsed into integers
    // are handled in the route itself, and would not be passed to these functions, hence we aren't
    // those errors in these functions.
    test("test getMode function", () => {
        expect(getMode(getAndSortNums(['1','3','1','5']))).toEqual(1)
        expect(getMode(getAndSortNums(['-2','1','4','-2','0']))).toEqual(-2)
    })
    test("test getAndSortNums function", () => {
        expect(getAndSortNums(['1','3','1','5'])).toEqual([1,1,3,5])
        expect(getAndSortNums(['-2','1','4','-2','0'])).toEqual([-2,-2,0,1,4])
    })
    test("test allAreNumbers function", () => {
        expect(allAreNumbers(['1','Foo','3'])).toEqual(false)
        expect(allAreNumbers(['4','317','29'])).toEqual(true)
    })
    test("test getMean function", () => {
        expect(getMean(['1','3','5','7'])).toEqual(4)
        expect(getMean(['4','317','29'])).toEqual(350 / 3)
    })
})