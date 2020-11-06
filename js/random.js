/**
 * generate two independent Gaussian numbers using Box-Muller transform.
 * mean and deviation specify the desired mean and standard deviation.
 * @param {number} [mean]
 * @param {number} [deviation]
 * @returns {number[]}
 */
function gaussianPair(mean = 0, deviation = 1) {
	const r = Math.sqrt(-2.0 * Math.log(1 - Math.random()));
	const sigma = 2.0 * Math.PI * (1 - Math.random());
	return [r * Math.cos(sigma), r * Math.sin(sigma)].map(val => val * deviation + mean);
}

/**
 * Generate a random integer with a normal distribution between min and max (both inclusive).
 * Default parameters result in truncating the standard normal distribution between -3 and +3.
 * Not specifying min/max results in rerolling val approximately 0.3% of the time.
 * @param {number} [mean]
 * @param {number} [deviation]
 * @param {number} [min]
 * @param {number} [max]
 * @returns {number}
 */
function normalRandInt(mean = 0, deviation = 1, min = mean - 3 * deviation, max = mean + 3 * deviation) {
	let val = gaussianPair(mean, deviation)[0];
	while (val < min || val > max) {
		val = gaussianPair(mean, deviation)[0];
	}
	return Math.round(val);
}

function randomExponentialInt(rate = 1) {
	return Math.round( -Math.log(Math.random())/(1/rate));
}

/**
 * Returns a random integer between min and max (both inclusive).
 * If count is defined, chooses that many random numbers between min and max and returns the average. This is an approximation of a normal distribution.
 * @param {number} min
 * @param {number} max
 * @param {number} [count]
 * @returns {number}
 */
function jsRandom(min, max, count = 1) {
	function rand() {
		return Math.random() * (max - min + 1) + min;
	}

	if (count === 1) {
		return Math.floor(rand());
	}

	let total = 0;
	for (let i = 0; i < count; i++) {
		total += rand();
	}
	return Math.floor(total / count);
}

/**
 * Chooses multiple random elements of an array.
 * @param {number[]} arr
 * @param {number} count
 * @returns {number[]}
 */
function jsRandomMany(arr, count) {
	let result = [];
	let _tmp = arr.slice();
	for (let i = 0; i < count; i++) {
		let index = Math.floor(Math.random() * _tmp.length);
		result.push(_tmp.splice(index, 1)[0]);
	}
	return result;
}

/**
 * Accepts both an array and a list, returns undefined if nothing is passed.
 * @param {any[]} choices
 * @param {any} [otherChoices]
 * @returns {any}
 */
function jsEither(choices, ...otherChoices) {
	if (otherChoices.length === 0 && Array.isArray(choices)) {
		return choices[Math.floor(Math.random() * choices.length)];
	}
	const allChoices = otherChoices;
	allChoices.push(choices);
	return allChoices[Math.floor(Math.random() * allChoices.length)];
}

function weightedRandom(dict) {
	var totalWeights = Object.values(dict).reduce((sum, value) => sum + value.weight, 0);
    var value = jsRandom(1, totalWeights - 1);
    return Object.keys(dict).find((key) => {
        value -= dict[key].weight;
        return value <= 0;
    });
}