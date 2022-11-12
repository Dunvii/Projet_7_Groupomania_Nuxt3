const jwt = require('jsonwebtoken');
require('dotenv').config()
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
       const userId = decodedToken.userId;
       const admin = decodedToken.admin;
       req.auth = {
           userId: userId,
           admin: admin
       };
	next();
   } catch(error) {
       res.status(401).json({ error: true });
   }
};