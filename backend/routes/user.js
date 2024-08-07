const express = require ('express');
const zod= require ('zod');
const jwt = require ('jsonwebtoken')
const {User, Account} = require ('../db')
const {JWT_SECRET} = require ('../config'); 
const { authMiddleware } = require('../middleware');

const router = express.Router();

const signupBody = zod.object({
    username:zod.string(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string()
})
const signinBody = zod.object({
    username:zod.string(),
    password:zod.string()
})

const updateBody = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
})

router.post('/signup',async (req,res)=>{
    const responce = signupBody.safeParse(req.body)
    if(!responce.success){
        console.log('Validation error:', response.error)
        res.status(411).json({
             message: "Email already taken/Incorrect inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })

    if (existingUser){
        return res.status(411). json({
             message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstname:req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    })

    const userId = user._id;

    await Account.create({
        userId:userId,
        balance: 1+Math.random()*10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User token created successfully",
        token: token,
        username: user.username
    })

})

router.post('/signin',async (req,res)=>{
    const responce = signinBody.safeParse(req.body);
    if (!responce.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if (user){
        const token =jwt.sign({
            userId:user._id
        },JWT_SECRET);

        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

router.put('/',authMiddleware,async (req,res)=>{
    const responce = updateBody.safeParse(req.body);

    if (!responce.success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},req.body)
    res.status(200).json({
        message: "Updated successfully"
    })
})

router.get('/bulk',async (req,res)=>{
    const filter = req.query.filter || "";
    console.log('Received filter:', filter);

    const users = await User.find({
        $or:[{
            firstname:{
                "$regex":filter,
                "$options": "i"
            }
        },{
            lastname:{
                "$regex":filter,
                "$options": "i"
            }

        }]
        
    })
    console.log('Users found:',users);

    res.status(200).json({
        user: users.map((user)=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id:user._id
        }))
        
    })
})

module.exports = router;