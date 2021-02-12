const Articledata = require("../model/Articledata")

/* JWT Token Verify */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var key = require('../key'); // get our config file



module.exports = {
	
	/* User Registration Controller */
    index: function(req, res) {
		
		Articledata.get(req.con, req.body, function(err, data) {
			
			
			//Verify the token ( Token Validity 1 Day )
			const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRzYmhhZGF1cmlhQHZpcnR1YWxlbXBsb3llZS5jb20iLCJpYXQiOjE2MTMxMzg5MjEsImV4cCI6MTYxMzIyNTMyMX0.e3oyI5Aq8lsSsrv_r3FTFszzg6PL91TaY0Nu1XzJMOE';
			
			
			jwt.verify(token, key.secret, function(err, decoded) {
				if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
				
				res.status(200).send({ articles: data, decoded: decoded});				
			});
			
			
		});
    }
  
}
