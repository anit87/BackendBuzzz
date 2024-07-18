const { SaveUpdateBar, GetAllBar, GetSingleBar, DeleteBar } = require('../Service/BarService');
const fs = require('fs');
const path = require('path');
const authenticateToken = require('../../../authMiddleware');

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


// Helper function to handle file upload

const handleFileUpload = async (req, res) => {
    const { barGuid, uploadfiletype } = req.body;
    const files = req.files;

    if (!barGuid || !files) {
        return res.status(400).json({ error: "barGuid and files are required" });
    }

    let folder;
    if (uploadfiletype === '1') {
        folder = 'exterior';
    } else if (uploadfiletype === '2') {
        folder = 'interior';
    } else if (uploadfiletype === '3') {
        folder = 'Logo';
    } else {
        return res.status(400).send('Invalid upload file type.');
    }

    console.log("uploadfiletype", uploadfiletype);
    console.log("barGuid", barGuid);
    console.log("files", files);

    const basePath = path.join(__dirname, `../../public/uploads/${folder}`);

    try {
        const fileArray = Array.isArray(files.files) ? files.files : [files.files];

        for (const file of fileArray) {
            const extension = path.extname(file.name);
            const newFilename = `${barGuid}-${Date.now()}${extension}`;
            const filePath = path.join(basePath, newFilename);

            ensureDirectoryExists(basePath);

            await file.mv(filePath);

            console.log(`File uploaded successfully: ${filePath}`);
        }

        res.json({ message: "Files uploaded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "File upload failed" });
    }
};

module.exports = {
    uploadFile: handleFileUpload,
};

const SaveUpdateBarRouter = handleRequest(async (req, res) => {
    console.log("Save/Update Bar request body:", req.body);
    const results = await SaveUpdateBar(req.body);
    res.json(results);

    if (results.out_BarGuid && req.files) {
        const barGuid = results.out_BarGuid;
       // const basePath = path.join(__dirname, '../../../src/User/Buzzpic'); // Ensure correct relative path
       // await handleFileUpload({ ...req, body: { barGuid } }, res);
    }
});

const GetAllBarRouter = handleRequest(async (req, res) => {
    const { UserId } = req.params;
    console.log("GetAllBar request for UserId:", UserId);
    const results = await GetAllBar(UserId);
    res.json(results);
});

const GetSingleBarRouter = handleRequest(async (req, res) => {
    console.log("GetSingleBar request body:", req.body);
    const results = await GetSingleBar(req.body);
    res.json(results);
});

const DeleteBarRouter = handleRequest(async (req, res) => {
    console.log("DeleteBar request body:", req.body);
    const results = await DeleteBar(req.body);
    res.json(results);
});

module.exports = {
    SaveUpdateBarRouter,
    GetAllBarRouter,
    GetSingleBarRouter,
    DeleteBarRouter,
    handleFileUpload
};
