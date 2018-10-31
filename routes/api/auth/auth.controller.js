const jwt = require('jsonwebtoken');
const User = require('../../../model/user');


exports.config = (req, res) => {
    const id = req.body.id;
    const find = (user) => {
        if (user) {
            throw new Error('user_id exists')
        } else {
            res.status(200).json({
                message: 'user_id is not exists'
            });
        }
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        });
    }

    User.findOneById(id)
        .then(find)
        .catch(onError)
}

exports.register = (req, res) => {
    const {
        username,
        id,
        pw
    } = req.body
    let newUser = null;

    const create = (user) => {
        if (user) {
            throw new Error('user id exists')
        } else {
            res.status(200).json({message:'success signup'});
            return User.create(username,id,pw);
        }
    }

    const onError = (error) => {
        res.status(409).json({
            message: error.message
        });
    }

    User.findOneById(id)
        .then(create)
        // .then(respond)
        .catch(onError)
}

exports.login = (req,res)=>{
    const {id,pw} = req.body;
    const secret = req.app.get('jwt-secret');

    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('You must signup');
        } else {
            // user exists, check the password
            if(user.verify(pw)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            id: user.id
                        }, 
                        secret, 
                        {
                            expiresIn: '24h',
                            issuer: 'me',
                            subject: 'user_info'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        });
                }); 
                return p;
            } else {
                throw new Error('login failed');
            }
        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        });
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        });
    }

    // find the user
    User.findOneById(id)
    .then(check)
    .then(respond)
    .catch(onError)
}

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    });
}