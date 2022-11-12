const { Reaction } = require('../models');

exports.reactionSystem = (req, res, next) => {
    const reaction = req.body.reaction;
    Reaction.findOne({ where: { PostId: req.params.id }})
        .then((reactions) => {
            switch(reaction.status) {
                case 1:
                    if(reactions != null) {
                        res.status(409).json({ alert: 2, message : "Une seule réaction par post !"});
                    }
                    else {
                        Reaction.create({ type : reaction.type, PostId: req.params.id, UserId : req.auth.userId })
                        .then((reaction) => { res.status(201).json({ alert: 1, message : "Nouvelle reaction" })})
                        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
                    } 
                    break;
                case 0:
                    if(reactions != null) {
                        Reaction.destroy({ where : { PostId: req.params.id, UserId : req.auth.userId }})
                        .then((reaction) => { res.status(201).json({ alert:1, message : "Reaction supprimé" })})
                        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
                    }
                    else {
                        res.status(409).json({ alert: 2, message : "Aucune réaction sur ce post"});
                    }
                    break;
                default:
                console.log(error);
            }       
        })
        .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
}
