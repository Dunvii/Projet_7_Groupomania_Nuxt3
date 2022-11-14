const { User, Post, Comment } = require('../models');

exports.newComment = (req, res, next) => {
    Post.findOne({ include: User , where: { id: req.params.id }})
    .then((post) => {
        Comment.create({ UserId: req.auth.userId, PostId: post.id, content: req.body.content })
        .then((comment) => {
            res.status(201).json({ alert: 1, message : "Nouveau commentaire", comment })
        })
    })
    .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
};

exports.getOneComment = (req, res, next) => {
    Comment.findOne({ include: [Post, User] , where: { id: req.params.id }})
    .then((comment) => {
        res.status(200).json({ comment, alert: 1 })
    })
    .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
}

exports.getAllCommentsOfPost = (req, res, next) => {
    console.log(req.params.id)
    Comment.findAll({ include: [Post, User] , where : { PostId: req.params.id }})
    .then((comments) => {
        res.status(200).json({ comments: comments, alert: 1 })
    })
    .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
}

exports.deleteComment = (req, res, next) => {
    console.log(req.auth);
    Comment.findOne({ where: { id: req.params.id }})
    .then((comment) => {
        if(req.auth.userId == comment.UserId || req.auth.admin == true){
            Comment.destroy({where: { id: req.params.id }})
            .then(res.status(200).json({ alert: 1, message: "Commentaire supprimé" }))
            .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
        }
        else {
            res.status(409).json({ alert: 2, message: "Aucun droit" })
        }
    })
}

exports.modifyComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.id }})
        .then((comment) => {
            if (req.auth.userId == comment.UserId || req.auth.admin == true) {
                Comment.update(
                    {
                        content: req.body.content
                    },
                    { 
                        where: { id: comment.id }
                    })
                    .then(() => res.status(200).json({ alert: 1, message: "Comment updated"}))
                    .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
            }
        })
        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
};