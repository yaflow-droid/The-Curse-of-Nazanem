window.helper = {};

helper.deepClone = function (inObject, outObject = {}) {
    let value, key

    if (typeof inObject !== "object" || inObject === null) {
        return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : outObject;

    for (key in inObject) {
        value = inObject[key]

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = helper.deepClone(value, outObject[key])
    }

    return outObject
};

helper.completeAssign = function (target, ...sources) {
    sources.reduce((target, source) => {
        return helper.deepClone(source, target);
    }, target);
    return target;
}

helper.initObject = function(defaults, values, listnerInit = (obj) => {}) {
    const obj = helper.completeAssign({}, defaults, values);
    listnerInit(obj);
    return obj;
}



/**
 * Concatenates the list into a list of string
 * @param {list<string>} list 
 * @param {function} _toString 
 * @param {boolean} additive 
 * @param {boolean} addThe 
 * @returns 
 */
helper.stringifyList = function (list, _toString = (el, i, l) => el, additive = true, addThe = false) {
    let toString = _toString;
    if (addThe) toString = (el, i, l) => { return "the " + _toString(el, i, l) };
    return list.reduce((str, el, i, l) => {
        if (i === 0) return toString(el, i, l);
        if (i === l.length - 1) return str + (additive ? " and " : " or ") + toString(el, i, l);
        else return str + ", " + toString(el, i, l);
    }, "")
}

/*
 * @author: Rodrigo Neri (@rigoneri)
 * Source code here: https://github.com/rigoneri/indefinite-article.js
 */
helper.indefiniteArticle = function (phrase) {

    // Getting the first word 
    var match = /\w+/.exec(phrase);
    if (match)
        var word = match[0];
    else
        return "an";

    var l_word = word.toLowerCase();
    // Specific start of words that should be preceeded by 'an'
    var alt_cases = ["honest", "hour", "hono"];
    for (var i in alt_cases) {
        if (l_word.indexOf(alt_cases[i]) == 0)
            return "an";
    }

    // Single letter word which should be preceeded by 'an'
    if (l_word.length == 1) {
        if ("aedhilmnorsx".indexOf(l_word) >= 0)
            return "an";
        else
            return "a";
    }

    // Capital words which should likely be preceeded by 'an'
    if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
        return "an";
    }

    // Special cases where a word that begins with a vowel should be preceeded by 'a'
    const regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/]
    for (var i in regexes) {
        if (l_word.match(regexes[i]))
            return "a"
    }

    // Special capital words (UK, UN)
    if (word.match(/^U[NK][AIEO]/)) {
        return "a";
    }
    else if (word == word.toUpperCase()) {
        if ("aedhilmnorsx".indexOf(l_word[0]) >= 0)
            return "an";
        else
            return "a";
    }

    // Basic method of words that begin with a vowel being preceeded by 'an'
    if ("aeiou".indexOf(l_word[0]) >= 0)
        return "an";

    // Instances where y follwed by specific letters is preceeded by 'an'
    if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/))
        return "an";

    return "a";
}
helper.addArticle = function (phrase) { return `${helper.indefiniteArticle(phrase)} ${phrase}` }