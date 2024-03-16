import express from 'express';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { readData, writeData } from '../file.js';

// jwt
const createToken = (_id) => {
  return jwt.sign({ _id }, 'dadauntsisbromebrobrosisbrobrosisbaga', { expiresIn: '1d' })
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
      return item.email === email;
    });
  if(!user){
    throw Error('no such email')
  }
  const hash = btoa(password)
  if(user.password !== hash) {
    throw Error('incorrect password')
  }
   // create token 
  const token = createToken(user._id);
  res.status(200).json({name: user.name, email, token });
  
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
  } else {
   try {
    validator
    if(!validator.isEmail(email)){
      throw Error('Input a valid email')
    };
    if(!validator.isStrongPassword(password)){
      throw Error('password is not strong enough')
    };
    
    let db = readData();
    let _id = `${db.users.length}_${Date()}`;
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
      db.users.push(
        {
          _id,
          email,
          password: hash, 
          name,
        });
      return JSON.stringify(db, null, 2);
    };
    writeData(newUser());
    
    res.status(200).json({message: "Account created Successful"});
    
   } catch(error) {
    res.status(400).json({error: error.message})
   }
  }
});

export default router;