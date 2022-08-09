const UserModel = require('../model/User');
const BlogModel = require('../model/Blog');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getAllUser = async (req, res, next) =>{
    
    try {
        const users = await UserModel.find();
        if(users.length > 0){
            res.status(200).json({users});
        } else if( users.length <= 0){
            const err = new Error('No Users Found');
            err.status = 404;
            throw err;
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message})
    }
}


exports.signup = async (req, res, next) => {
    try {
        const existingUser = await UserModel.find({email: req.body.email});
        if(existingUser.length <= 0){
            const hashedpwd = bcrypt.hashSync(req.body.password);
            const user = await UserModel.insertMany({
                name: req.body.name,
                email: req.body.email,
                password: hashedpwd,
                blogs: []
            });
            res.status(201).json({user})
        } else if( existingUser.length > 0){
            const err = new Error('User Already Exists!');
            err.status = 404;
            throw err;
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message});
    }
}


exports.login = async (req, res, next) => {
    try {
        const existingUser = await UserModel.findOne({email: req.body.email});
        if(existingUser){
            const isCorrectPwd = bcrypt.compareSync(req.body.password, existingUser.password);
            if(isCorrectPwd){
                res.status(200).json({message: 'Login Successful', user: existingUser});
            } else if(!isCorrectPwd){
                const err = new Error('Incorrect Password');
                err.status = 400;
                throw err;
            }
            // res.status(200).json('sucess')
        } else if( !existingUser){
            const err = new Error('User do not Exists!');
            err.status = 400;
            throw err;
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message});
    }
}

exports.getAllBlog = async (req, res, next) =>{
    
    try {
        const blogs = await BlogModel.find().populate("user");
        if(blogs.length > 0){
            res.status(200).json({blogs});
        } else if( blogs.length <= 0){
            const err = new Error('No Blogs Found');
            err.status = 404;
            throw err;
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message})
    }
}

/*
exports.addBlog = async (req, res, next) => {

    try {
        // const existingUser = await UserModel.find({user: req.body.user});
        console.log(req.body);
        // if(existingUser.length > 0){
            const blog = await BlogModel.insertMany({
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                // user: req.body.user
            });
            console.log(blog);
            if(blog.length > 0){
                res.status(201).json({blog})
          
            } else if( blog.length <= 0){
                const err = new Error('Blog does not exists!');
                rr.status = 404;
                throw err;
            }
        // } else if(existingUser.length <= 0){
        //     const err = new Error('User not found');
        //         rr.status = 404;
        //         throw err;
        // }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message});
    }
}
*/

exports.updateBlog = async (req, res, next) => {
    try {
        const blog = await BlogModel.updateOne(
            {_id: req.params.id},
             {$set:{title: req.body.title,
            description: req.body.description}}
        );
        if(blog.length <= 0){
            const err = new Error('Unable to update');
            err.status = 500;
            throw err;
        } else{
            res.status(200).json({blog});
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message});
    }
}

exports.getId = async (req, res, next) =>{
    try {
        const blog = await BlogModel.findOne({_id: req.params.id});
        if(blog){
            res.status(200).json({blog});
        } else if(!blog){
            const err = new Error('No Blog Found');
            err.status = 404;
            throw err;
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message});
    }
}

/*
exports.deleteBlog = async (req, res, next) =>{
    try {
        const blog = await BlogModel.deleteOne({_id: req.params.id}).populate("user")
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if(blog){
            res.status(200).json({message: 'deleted sucessfully'});
        } else if(!blog){
            const err = new Error('Blog not deleted');
            err.status = 404;
            throw err;
        }
    } catch (err) {
        next(err);
        res.status(err.status).json({message: err.message});
    }
}
*/

exports.deleteBlog = async (req, res, next) => {
    const id = req.params.id;

    let blog;
    try {
        blog = await BlogModel.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
    }
    if(!blog){
        res.status(500).json({message: "Unable to delete"});
    } else if(blog){
        res.status(200).json({message: "Sucessfully Delete"});
    } 
}

exports.addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body;
    let existingUser;
    try {
        existingUser = await UserModel.findOne({_id: user});
    } catch (err) {
        console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message: "Unable to find user with this ID"})
    }
    const blog = new BlogModel ({
        title,
        description,
        image,
        user
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session})
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err});
    }
    res.status(200).json({blog});
}


exports.getUser = async (req, res, next) => {
    try{
        const userBlogs = await UserModel.findOne({_id: req.params.id}).populate("blogs");
        if(userBlogs){
            res.status(200).json({userBlogs});
        } else if(!userBlogs){
            const err = new Error('User not Found');
            err.status = 404;
            throw err;
        }
    } catch(err){
        next(err);
        res.status(err.status).json({message: err.message});
    }
}