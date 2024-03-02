import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import express from 'express';
//import useAuth from './authentication.js';
import { readData, writeData } from './user.js';


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
//router.use(useAuth);

router.post('/', upload.single('image'), async (req, res) => {
 const {heading, body} = req.body;
 const image = req.files.image ? req.files.image.filename : null;
 
 let db = await readData();
 let _id = `${db.users.length}_${Date()}`;
 
 const newPost = () => { 
   db.news.push({_id, heading, body, image});
   return JSON.stringify(db, null, 2);
 };
 writeData(newPost());
})


router.post('/upload-files', upload.fields([{ name: 'audio', maxCount: 1}, { name: 'video', maxCount: 1}]), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Upload a file' })
  } else {
    const audio = req.files['audio'] ? req.files['audio'][0].filename : null;
    const video = req.files['video'] ? req.files['video'][0].filename : null;
    let db = await readData();
    let _id = `${db.users.length}_${Date()}`;
    
    const newPost = () => { 
      db.files.push({_id, heading, body, image});
      return JSON.stringify(db, null, 2);
    };
    writeData(newPost());
    res.status(200).json({message: 'files uploaded'});
  }
});

// router.delete('/delete-file/:name', async (req, res) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   try {
//    await fs.unLink(path.join(path.resolve(__dirname, `../public/${req.params}`));
//    res.status(200).json({message: file deleted});
//   } catch(err) {
//    return res.status(400).json({ error: err })
//   }
// })

export default router;