const URL = require('../models/url');
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    // Check if URL is provided in the request body
    if (!body.url) {
        return res.json({
            error: "URL is required"
        });
    }

    try {
        // Check if the URL already exists in the database
        let existRecord = await URL.findOne({ Redirect_url: body.url });
        if (existRecord) {
            console.log(existRecord);
            // existRecord= await URL.findOneAndUpdate({shortID:existRecord.shortID},
            //     { $push: { visitedHistory: { timestamp: Date.now() } } } )
            // If the URL exists, return the existing short URL
            return res.json({ newurl: `https://trunc8-backend.onrender.com/${existRecord.shortID} `,shortID:existRecord.shortID });
        }
    // console.log("hello")
        // Generate a new short ID
        const shortID = shortid.generate();  // e.g., "qA4hn-uwIA"

        // Create a new URL entry in the database
        const newURL = await URL.create({
            shortID: shortID,
            Redirect_url: body.url,
            visitedHistory: [],
        });

        // Return the newly created short URL
        return res.json({ newurl: `https://trunc8-backend.onrender.com/${shortID}`, shortID:shortID});
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

module.exports = {
    handleGenerateNewShortURL
};
