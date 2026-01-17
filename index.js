// Import Modul
const express = require("express");
const fs = require("fs");
const path = require("path");
const { generateApiKey, getExpired } = require("./generate.js");

// Etc.
const app = express();
const port = 3000;
const FILEPATH = path.join(__dirname, "API.json");

app.use(express.json());

// Generate API
app.post("/generate", (req, res) => {
    const { name, expired } = req.body;
    
    if (!name || !expired) {
        return res.status(400).json({
            error: "Please fill it in first."
        });
    };
    
    const apikey = generateApiKey();
    const expiredTime = getExpired(expired);
    
    let data = {};
    if (fs.existsSync(FILEPATH)) {
        data = JSON.parse(fs.readFileSync(FILEPATH));
    };
    
    data[apikey] = {
        name,
        expired: expiredTime,
        active: true,
        createdAt: Date.now()
    };
    
    fs.writeFileSync(FILEPATH, JSON.stringify(data, null, 2));
    
    res.json({
        apikey,
        expired,
        message: "API key has been created, copy it before you close this session!"
    });
});

function checkApiKey(req, res, next) {
    const key = req.headers["x-api-key"] || req.query.key;
    
    if (!key) {
        return res.status(401).json({ error: "API KEY does not exist" });
    }
    if (!fs.existsSync(FILEPATH)) {
        return res.status(500).json({ error: "Database corrupted." })
    }
    const data = JSON.parse(fs.readFileSync(FILEPATH));
    const userkey = data[key];
    
    if (!userkey || userkey.active !== true) {
        return res.status(403).json({error: "Invalid API key."});
    }
    if (userkey.expired && Date.now() > userkey.expired) {
        userkey.active = false;
        fs.writeFileSync(FILEPATH, JSON.stringify(data, null, 2));
        return res.status(403).json({ error: "Invalid API key." })
    }
    
    req.apiUser = userkey;
    next();
}

app.get('/api', checkApiKey, (req, res) => {
    res.json( {
        message: "API key received. Hello",
        owner: req.apiUser.name
    });
})

app.get('/', (req, res) => {
    res.send(`
        <h1>API Server is alive</h1>
        <p>Enter this into the url tab <code>localhost:${port}/api?key=YOUR_API_KEY</code></p>
    `);
});

app.listen(port, () => {
    console.log(`The server is alive, not dead, okay? http://localhost:${port}`);
})