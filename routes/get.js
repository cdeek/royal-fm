import fs from 'fs';
import express from 'express';
import { readData } from '../file.js';

const router = express.Router();

router.get('/local-news', async (req, res) => {
  const db = await readData();
  res.status(200).json(db.news);
});

router.get('/files', async (req, res) => {
  const db = await readData();
  res.status(200).json({audio: db.files.audio, video: db.files.video});
});

router.get('/audio-file-stream/:filename', async (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = `public/${fileName}`;
    const range = req.headers.range;
    
    if (!filePath) {
      return res.status(404).send('Audio not found');
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
        'Content-Type': "audio/mp3",
      });
      file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': "audio/mp3",
        });
        fs.createReadStream(filePath).pipe(res);
      }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ error: err.message });
  }
});

router.get('/video-file-stream/:filename', async (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = `public/${fileName}`;
    const range = req.headers.range;
    
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
        'Content-Type': "video/mp4",
      });
      file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': fileSize,
          'Content-Type': "video/mp4",
        });
        fs.createReadStream(filePath).pipe(res);
      }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ error: err.message });
  }
});

export default router;