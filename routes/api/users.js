import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcrypt'; 

//import Model user
import User from '../../models/User';

const router = express.Router();

/**
 * @route Get api/users/test
 * @desc Test users route
 * @access Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users working' }));

/**
 * @route Post api/users/register
 * @desc Register User
 * @access Public
 */
router.post('/register', (req, res) => { 
  const { email, name, password } = req.body;

  User
    .findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({email: 'Email informado já é cadastrado'});
      
      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      const newUser = new User({ name, email, avatar, password });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) return res.status(400).json({err: 'Erro no envio'});
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json({err: 'Erro no envio'}));
        })
      })

    })

});


export default router;