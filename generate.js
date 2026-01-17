const crypto = require("crypto");

function generateApiKey() {
    return("rakha_") + crypto.randomBytes(16).toString("hex");
}

function getExpired(option) {
    const now = Date.now();
    
    if (option === "1") return now + 86400000;
    if (option === "30") return now + 2592000000;
    if (option === "never") return null;
    
    return null;
}

module.exports = {
    generateApiKey,
    getExpired
}