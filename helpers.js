// Separating this logic from the route itself.
const getMean = (nums) => {
    let total = 0;
    for (let num of nums) {
        num = parseInt(num);
        total += num;
    }
    return total / nums.length;
}

const getAndSortNums = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        nums[i] = parseInt(nums[i])
    }
    nums.sort((a,b) => a - b);
    return nums;
}

const getMode = (nums) => {
    let mode = nums[0];
    let numsCounter = {mode: 0};

    for (let num of nums) {
        if (!numsCounter[num]) {
            numsCounter[num] = 1
        } else {
            numsCounter[num]++
        }
        if (numsCounter[num] > numsCounter[mode]) {
            mode = num;
        }
    }
    return mode;
}

const allAreNumbers = (nums) => {
    for (let num of nums) {
        if (parseInt(num) != num || parseFloat(num) != num) {
            return false;
        }
    }
    return true;
}

module.exports = {
    getMean,
    getAndSortNums,
    getMode,
    allAreNumbers
}