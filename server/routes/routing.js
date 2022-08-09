const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

/* GET home page. */
router.get('/user', controller.getAllUser);

router.post('/user/signup', controller.signup);

router.post('/user/login', controller.login);

router.get('/blog', controller.getAllBlog);

router.post('/blog/add', controller.addBlog);

router.put('/blog/update/:id', controller.updateBlog);

router.get('/blog/:id', controller.getId);

router.delete('/blog/:id', controller.deleteBlog);

router.get('/blog/user/:id', controller.getUser);

module.exports = router;
