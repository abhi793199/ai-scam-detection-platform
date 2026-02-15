const regexLibrary = require('../../utils/regex.library');

function analyze(text) {
    let score = 0;

    if (regexLibrary.upi.test(text)) score += 20;
    if (regexLibrary.otp.test(text)) score += 25;
    if (regexLibrary.phone.test(text)) score += 10;

    return score;
}

module.exports = { analyze };
