const { User, Post, Reaction, Comment } = require('../models');


exports.getAllPosts = (req, res, next) => {
    Post.findAll({ include: [User, Reaction, Comment], order:[['createdAt', 'DESC']] })
    .then(
        (posts) => {
            res.status(200).json({ alert: 1 , posts });
        }
    )
    .catch((error) => {
        res.status(500).json({ alert: 3, message:"Erreur serveur", error: error });
    })
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ include: [User, Reaction] , where: { id: req.params.id }})
    .then(
        (post) => {
            res.status(200).json({ alert: 1 , post });
        }
    )
    .catch((error) => {
        res.status(500).json({ alert: 3, message:"Erreur serveur", error: error });
    })
};

exports.newPost = (req, res, next) => {
    const lePost = req.file ? {
        UserId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        content: req.body.content
    } : { UserId: req.auth.userId, content: req.body.content };
    Post.create({ ...lePost })
        .then((posts) => {
        res.status(201).json({ alert: 1, message : "Nouveau post", posts });
        })
        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
};

exports.modifyPost = (req, res, next) => {
    const lePost = req.file ? {
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        content: req.body.content
    } : { content: req.body.content };
    Post.findOne({ where: { id: req.params.id }})
        .then((post) => {
            if (req.auth.userId == post.UserId || req.auth.admin == true) {
                Post.update(
                    {
                        ...lePost
                    },
                    { 
                        where: { id: post.id }
                    })
                    .then(() => res.status(200).json({ alert: 1, message: "Post mis à jour"}))
                    .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
            }
        })
        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
};

exports.deletePost = (req, res, next) => {
    Post.findOne({ where: { id: req.params.id }})
        .then((post) => {
            if (req.auth.userId == post.UserId || req.auth.admin == true) {
                Post.destroy({ where: { id: req.params.id }})
                    .then((post) => {
                    res.status(201).json({ alert: 1, message : "Post supprimé" });
                    })
                    .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
                }
        })
        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
};