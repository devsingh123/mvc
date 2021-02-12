const Userdata = require("../model/Userdata")

/* JWT Token Module */
var jwt = require('jsonwebtoken');
var key = require('../key');

module.exports = {
	
	/* User Registration Controller */
    index: function(req, res) { 		  
		if(req.body.username == undefined || req.body.email == undefined || req.body.password == undefined || req.body.user_group == undefined || req.body.user_role == undefined || req.body.status == undefined) {
			return res.status(501).send({ error: "Trying to send invalid data. Please cross check before sending..." });	
		} else {		
			Userdata.create(req.con, req.body, function(err, data) {	
				if (err) return res.status(500).send({ error: "User already exist or error on the server." });             
				if (data > 0 || data != null) return res.status(200).send({ success: "User Registered Successfully." });		
			});
        }		
    },
	
	/* User Login Controller */
	login: function(req, res) {	        		
		if(req.body.email == undefined || req.body.password == undefined) {
			return res.status(501).send({ error: "Trying to send invalid data. Please cross check before sending..." });	
		} else {			
			Userdata.check(req.con, req.body, function(err, data) {					    			   
				if(data <= 0 & data != null) return res.status(200).send({ error: "User not found." });		  
				if (err || data == null) return res.status(500).send({ error: "Invalid Email/Password!" });			
				var token = jwt.sign({ id: req.body.email }, key.secret, {expiresIn: 86400});			
				res.status(200).send({ auth: true, token: token });		
			});
		}
        
	},
	
	/* User Logout Controller */
	logout: function(req, res) {	        		
		res.status(200).send({ auth: false, token: null });        
	}	
  
}
