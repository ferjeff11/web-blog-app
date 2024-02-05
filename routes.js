// routes.js
import express from 'express';

const router = express.Router();

let posts = [];

router.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});

router.get('/create', (req, res) => {
    res.render("create.ejs");
});

router.get('/redirect-to-create', (req, res) => {
    res.redirect('/create');
});

router.post('/addPost', (req, res) => {
    const nuevoPost = req.body;
    nuevoPost.id = Date.now().toString();    

    // Obtener la fecha y hora actual por separado
    const fechaActual = new Date().toLocaleDateString();
    const horaActual = new Date().toLocaleTimeString();

    // Asignar la fecha y hora actual al nuevo post
    nuevoPost.date = `${fechaActual} ${horaActual}`;    
    posts.push(nuevoPost);
    res.redirect('/');
});

router.get('/delete/:postId', (req, res) => {
    const postId = req.params.postId;
    const indexToRemove = posts.findIndex(post => post.id === postId);

    if (indexToRemove !== -1) {
        posts.splice(indexToRemove, 1);
        console.log(`Post with ID ${postId} has been deleted.`);
    } else {
        console.log(`Post with ID ${postId} not found.`);
    }

    res.redirect('/');
});

router.get('/edit/:postId', (req, res) => {
    const postId = req.params.postId;
    const postToEdit = posts.find(post => post.id === postId);

    if (postToEdit) {
        res.render('edit.ejs', { post: postToEdit });
    } else {
        console.log(`Post with ID ${postId} not found.`);
        res.redirect('/');
    }
});

router.post('/update/:postId', (req, res) => {
    const postId = req.params.postId;
    const postToUpdate = posts.find(post => post.id === postId);

    if (postToUpdate) {
        postToUpdate.title = req.body.title;
        postToUpdate.text = req.body.text;
        postToUpdate.name = req.body.name;

        console.log(`Post with ID ${postId} has been updated.`);
        res.redirect('/');
    } else {
        console.log(`Post with ID ${postId} not found.`);
        res.redirect('/');
    }
});

export default router;
