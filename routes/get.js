import fs from 'fs';
import express from 'express';
import { readData } from '../file.js';

const router = express.Router();

router.get('/data', async (req, res) => {
  const json = await readData().data;
  res.status(200).json({news: json.news, files: json.files});
});

router.get('/file-stream/:filename', async (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = `public/${fileName}`;
    const range = req.headers.range;
    
    const checkFileType = () => {
      const mimeType = fileName.slice(-3);
      let fileType;
      if (
         mimeType == "mp3" ||
         mimeType == "m4a" ||
         mimeType == "wav" ||
         mimeType == "ogg"
        ) fileType = "audio/" + mimeType;
        
      if (
         mimeType == "mp4" ||
         mimeType == "3gp" 
        ) fileType = "video/" + mimeType;
      
      return fileType;
    };
    
    const fileType = checkFileType();
    
    if (!filePath) {
      return res.status(404).send('Video not found');
    }
    
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    if (range) {
      const parts = range.replace('bytes=', '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, {start, end});

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': fileType,
      });
      file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': fileType,
        });
        fs.createReadStream(filePath).pipe(res);
      }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ error: err.message });
  }
});

export default router;