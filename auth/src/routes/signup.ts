import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
   body('email').isEmail().withMessage('Email must be valid'),
   body('password').trim().isLength({ min: 4, max: 20 })
   .withMessage('password must be 4 and 20')
], validateRequest,
async (req: Request, res: Response)=>{
  

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email })

  if(existingUser){
    throw new BadRequestError('Email in use')
  }

  const user = User.build({ email, password });
  await user.save();
   
  //generate JWT
  
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, 
    //@ts-ignore
    process.env.JWT_KEY
  );

  //store it on session object
  //@ts-ignore
  req.session = {
    jwt: userJwt
  }
  res.status(201).send(user)

})

export { router as signupRouter };