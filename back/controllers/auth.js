const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.findOne({ where: { email: req.body.email} })
            .then(user => {
                if(!user) {
                    User.create({ email: req.body.email, password: hash })
                        .then(res.status(201).json({ alert: 1, message: "Compte crée" }))
                        .catch((error) => res.status(500).json({ error }));
                    return;
                }
                else {
                    return res.status(409).json({ alert: 2, message: "Compte existant"});
                }
            })
            .catch((error) => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
        })
        .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ alert: 2, message: "L'utilisateur n'existe pas"});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ alert: 2, message: 'Mot de passe incorect' });
                    }
                    res.status(200).json({
                        alert: 1,
                        message: "Connexion réussis",
                        infos : { id: user.id, firstName: user.firstName, lastName : user.lastName, admin : user.admin, email : user.email, avatarUrl : user.avatarUrl},
                        token: jwt.sign(
                            { userId: user.id, admin: user.admin },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
        })
        .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
};

exports.delete = (req, res, next) => {
    if (req.auth.admin == true) {
        User.deleteOne({ where: { email: req.body.email } })
            .then(res.status(200).json({ alert: 1, message: "Account deleted" }))
            .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }));
    }
    else {
        res.status(409).json({ alert: 2, message: "Aucun droits." });
    }
}

exports.modify = (req, res, next) => {
    const toModify = req.file ? {
        avatarUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        ... req.body.user,
    } : { ...req.body.user };
    User.findOne({ where: { email: req.body.email } })
        .then(userInfos => {
                bcrypt.compare(req.body.oldPassword, userInfos.password)
                .then(valid => {
                    if(req.auth.userId == userInfos.id) {
                        bcrypt.hash(req.body.newPassword, 10)
                        .then(hash => {
                            User.update(
                                {
                                    ...toModify,
                                    password: hash
                                },
                                {
                                    where: { id: userInfos.id }
                                }
                            )
                            .then((user) => res.status(200).json({ alert: 1, message: "Compte mis à jour", infos : { id: user.id, firstName: user.firstName, lastName : user.lastName, admin : user.admin, email : user.email, avatarUrl : user.avatarUrl},
                            token: jwt.sign(
                                { userId: user.id, admin: user.rank },
                                process.env.SECRET_TOKEN,
                                { expiresIn: '24h' }
                            ) }))
                            .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
                        })
                        .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
                    }
                    if(req.auth.admin == true){
                        User.update(
                            {
                                ...toModify
                            },
                            {
                                where: { id: userInfos.id }
                            }
                        )
                        .then((user) => res.status(200).json({ alert: 1, message: "Compte mis à jour", infos : { id: user.id, firstName: user.firstName, lastName : user.lastName, admin : user.admin, email : user.email, avatarUrl : user.avatarUrl} }))
                        .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))
                    }
                })
                .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))  
        })
    .catch(error => res.status(500).json({ alert: 3, message:"Erreur serveur", error: error }))    
}


