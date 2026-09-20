const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Uploads
const upload = multer({
dest: path.join(__dirname, "../uploads/")
});

// Baş sahypa
app.get("/", (req, res) => {
res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Server ýagdaýy
app.get("/api/status", (req, res) => {
res.json({
success: true,
message: "Türkmen AI serveri işleýär.",
language: "tk",
country: "Türkmenistan"
});
});

// Okuwçy profilini kabul etmek
app.post("/api/profile", (req, res) => {
const {
velayat,
district,
school,
grade,
name,
phone
} = req.body;

res.json({
    success: true,
    message: "Okuwçy maglumatlary kabul edildi.",
    profile: {
        country: "Türkmenistan",
        velayat,
        district,
        school,
        grade,
        name,
        phone
    }
});

});

// Surat ýüklemek
app.post("/api/upload/image", upload.single("image"), (req, res) => {
if (!req.file) {
return res.status(400).json({
success: false,
message: "Surat tapylmady."
});
}

res.json({
    success: true,
    message: "Surat üstünlikli ýüklenildi.",
    file: req.file.filename
});

});

// PDF / dokument ýüklemek
app.post("/api/upload/file", upload.single("file"), (req, res) => {
if (!req.file) {
return res.status(400).json({
success: false,
message: "Faýl tapylmady."
});
}

res.json({
    success: true,
    message: "Faýl üstünlikli ýüklenildi.",
    file: req.file.filename
});

});

// AI endpoint — soň AI API bilen birikdireris
app.post("/api/ai/chat", async (req, res) => {
const { message } = req.body;

if (!message || !message.trim()) {
    return res.status(400).json({
        success: false,
        message: "Sorag ýazylmady."
    });
}

res.json({
    success: true,
    answer: "Salam! Men Türkmen AI okuw kömekçisi. Häzir AI hyzmaty birikdirilýär."
});

});

// Serveri işlet
app.listen(PORT, () => {
console.log("Türkmen AI serveri http://localhost:${PORT} salgysynda işleýär.");
});
