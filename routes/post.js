import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import express from 'express';
import useAuth from './authentication.js';
import { readData, writeData } from '../file.js';


//multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage
});

const router = express.Router();
router.use(useAuth);

router.post('/', upload.single('image'), async (req, res) => {
try {
 const {heading, body} = req.body;
 const image = req.file ? req.file.filename : null;
 
 let db = await readData();
 let _id = `${db.users.length}_${Date()}`;
 
 const newPost = () => { 
   db.news.push({_id, heading, body, image});
   return JSON.stringify(db, null, 2);
 };
 await writeData(newPost());
 res.status(200).json({ success: 'Data uploaded successfully!' });
}catch {
  res.status(500).json({ error: 'internal error' });
}
})


router.post('/upload-files', upload.fields([{ name: 'audio', maxCount: 1}, { name: 'video', maxCount: 1}]), async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: 'Upload a file' })
  } else {
    const audio = req.files['audio'] ? req.files['audio'][0].filename : null;
    const video = req.files['video'] ? req.files['video'][0].filename : null;
    let db = await readData();
    
    const newPost = () => { 
      if (audio) db.files.audio.push(audio);
      if (video) db.files.video.push(video);
      return JSON.stringify(db, null, 2);
    };
    writeData(newPost());
    res.status(200).json({message: 'files uploaded'});
  }
});

export default router;