var jwt = require('jsonwebtoken');
var { User } = require('../models');

const invalidResponse = { "success":false, "message": "Access denied" };

async function verifyToken(req, res, next) {
    const header = req.header("Authorization");
    if(!header) {
        res.status(401).send(invalidResponse)
        return;
    }
    if(!header.startsWith("Bearer ")) {
        res.status(401).send(invalidResponse)
        return;
    }
    const token = header.split(" ")[1]
    try {
      const _id = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(_id).lean().exec();
      if(!user) {
        res.status(401).send(invalidResponse)
        return;
      }
      req.user = user; 
      next();
    } 
    catch (e) {
        console.log(e)
        res.status(401).send(invalidResponse)
    }
}

module.exports = verifyToken;