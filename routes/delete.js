import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import express from 'express';
import useAuth from './authentication.js';
import { readData, writeData } from '../file.js';

const router = express.Router();
router.use(useAuth);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.delete('/file/:name', async (req, res) => {
  try {
    const fileName = req.params;
    //await fs.unLink(path.join(path.resolve(__dirname, `../public/${fileName}`)));
    
    const checkFileType = () => {
      const mimeType = fileName.slice(-3);
      let fileType;
      if (
         mimeType == "mp3" ||
         mimeType == "m4a" ||
         mimeType == "wav" ||
         mimeType == "ogg"
        ) fileType = "audio";
       else fileType = "video";
       
      return fileType;
    };
    
    let updatedData;
    if (checkFileType == "audio") {
      updatedData = await readData().files.audio.filter((item) => item !== fileName);
    } else {
      updatedData = await readData().files.video.filter((item) => item !== fileName);
    }
    
    writeData(updatedData);
    
    res.status(200).json({message: 'file deleted'});
  } catch(err) {
    return res.status(400).json({ error: err })
  }
})

router.delete('/news/:id', async (req, res) => {
  try {
    const fileName = req.params;
    const data = readData().news;
    console.log(data)
   // await fs.unLink(path.join(path.resolve(__dirname, `../public/${fileName}`)));
    //const updatedData = await readData().news.filter((item) => item._id != fileName);
    //writeData(updatedData);
    res.status(200).json({message: 'file deleted'});
  } catch(err) {
    console.log(err)
    return res.status(400).json({ error: err })
  }
})

export default router;