import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import express from 'express';
import useAuth from './authentication.js';
import { readData } from '../file.js';

const router = express.Router();
router.use(useAuth);

// router.delete('/delete-file/:name', async (req, res) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   try {
//     await fs.unLink(path.join(path.resolve(__dirname, `../public/${req.params}`)));
//     res.status(200).json({message: 'file deleted'});
//   } catch(err) {
//     return res.status(400).json({ error: err })
//   }
// })

// router.delete('/delete-news/:id', async (req, res) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   try {
//     await fs.unLink(path.join(path.resolve(__dirname, `../public/${req.params}`)));
//     await fs.unLink(path.join(path.resolve(__dirname, `../public/${req.params}`)));
//     res.status(200).json({message: 'file deleted'});
//   } catch(err) {
//     return res.status(400).json({ error: err })
//   }
// })

export default router;