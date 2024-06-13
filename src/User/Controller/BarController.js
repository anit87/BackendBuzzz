const { SaveUpdateBar, GetAllBar, GetSingleBar, DeleteBar } = require('../Service/BarService');
const fs = require('fs');
const path = require('path');

const handleRequest = (handler) => async (req, res) => {
    try {
        await handler(req, res);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
};

const handleFileUpload = async (files, barGuid, basePath) => {
    const fileCategories = ['exterior', 'interior', 'logo'];

    for (const category of fileCategories) {
        if (files[category]) {
            const file = files[category];
            const extension = path.extname(file.name);
            const newFilename = `${barGuid}${extension}`;
            const directoryPath = path.join(basePath, category);
            const filePath = path.join(directoryPath, newFilename);

            ensureDirectoryExists(directoryPath);

            await file.mv(filePath);

            console.log(`File uploaded successfully: ${filePath}`);
        }
    }
};

module.exports = {
    SaveUpdateBarRouter: handleRequest(async (req, res) => {
        console.log("Save/Update Bar request body:", req.body);
        const results = await SaveUpdateBar(req.body);
        res.json(results);

        if (results.out_BarGuid && req.files) {
            const barGuid = results.out_BarGuid;
            const basePath = './resource/';
            await handleFileUpload(req.files, barGuid, basePath);
        }
    }),

    GetAllBarRouter: handleRequest(async (req, res) => {
        const { UserId } = req.params;
        console.log("GetAllBar request for UserId:", UserId);
        const results = await GetAllBar(UserId);
        res.json(results);
    }),

    GetSingleBarRouter: handleRequest(async (req, res) => {
        console.log("GetSingleBar request body:", req.body);
        const results = await GetSingleBar(req.body);
        res.json(results);
    }),

    DeleteBarRouter: handleRequest(async (req, res) => {
        console.log("DeleteBar request body:", req.body);
        const results = await DeleteBar(req.body);
        res.json(results);
    })
};
