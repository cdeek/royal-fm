import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'
import express from 'express';
// import validator from 'validator';
// import jwt from 'jsonwebtoken';

// jwt
// const createToken = (_id) => {
//   return jwt.sign({ _id }, 'dadauntsisbromebrobrosisbrobrosisbaga', { expiresIn: '1d' })
// };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname)

const dbFile = path.resolve(__dirname, '../db.json');

// read file
const readData = () => {
  const db = fs.readFileSync(dbFile);
  return JSON.parse(db);
};
// write file
const writeData = (db) => {
    fs.writeFileSync(dbFile, db);
};

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({ error: 'all fields must be filled' });
  }
  else{
  try{
    const db = readData();
    const user = await db.users.find(item => {
      return item.email === email.toLowerCase();
    });
  if(!user){
    throw Error('no such email')
  }
  const hash = btoa(password)
  if(user.password !== hash) {
    throw Error('incorrect password')
  }
   // create token 
 // const token = createToken(user._id);
  res.status(200).json({name: user.name, email});
  
  }catch(error) {
   res.status(401).json({error: error.message})
  }
 }
});


// signup
router.post('/signup', async (req, res) => {
  
  const { name, email, password } = req.body;
    
    if(!email || !password || !name){
    res.status(400).json({error: 'all field must be filled'})
  };
  
 try {
  // validator
  // if(!validator.isEmail(email)){
  //   throw Error('Input a valid email')
  // };
  // if(!validator.isStrongPassword(password)){
  //   throw Error('password is not strong enough')
  // };
  
  let db = readData();
  let _id = db.users.length;
  const user = await db.users.find(item => {
      return item.email === email;
    });
  if(user){
    throw Error('email already exist')
  }
  
// hashing password
//const salt = bcrypt.genSalt(10)
//  const hash = bcrypt.hash(password, salt)
// the password will be password: hash
  
  const hash = btoa(password)

  const newUser = () => { 
    db.users.unshift(
      {
        _id,
        email.toLowerCase(),
        password: hash, 
        name,
      });
    return JSON.stringify(db, null, 3);
  };
  writeData(newUser());
  
 // create token 
//  const token = createToken(user._id);
  
  res.status(200).json({name, email,});
  
 } catch(error) {res.status(400).json({error: error.message})}
});

export default router;