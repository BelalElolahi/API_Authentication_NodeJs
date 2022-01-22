
const router = require('express').Router();
const User = require('../model /User');
const { registerValidation,
        loginValidation } =  require('../validation')
const bcrypt = require('bcryptjs');


// Register 
router.post('/register', async(req,res)=>{
    
    // VALIDATE THE DATA BEFORE WE CREATE A USER 
    const {error} = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    // checking if the user is already in the datavase 
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Enail already exists')
    
    // Hash passwords 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    
    // Create a new user 
        const user  = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });
    
        try {
        const savedUser = await user.save().catch(err => console.log(err));
        res.status(200).json({user : user._id})
        
    } catch (error) {
        res.status(400).send(error);
        
    } 

});

// Login 
router.post('/login', async(req,res)=>{
     // VALIDATE THE DATA BEFORE WE CREATE A USER 
        const {error} = loginValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists 
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Email is not found');
    
    //Checking if the password is correct 
        const validPassword = await bcrypt.compare(req.body.password , user.password);
        if (!validPassword) return res.status(400).send('Invalid password')
    
    res.send('logged in!')
        


});

module.exports = router