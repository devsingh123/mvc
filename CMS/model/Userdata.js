var bcrypt = require('bcryptjs');

module.exports = {
  
	/* User Registration Model */  
	create: function(con, data, callback) {	
	    var pass = bcrypt.hashSync(data.password, 8);
		con.query(`INSERT INTO cms_users (user_id, user_name, user_email, user_password, user_group, user_permission, user_role, status) VALUES (NULL, '${data.username}', '${data.email}', '` + pass + `', '${data.user_group}', '', '${data.user_role}', '${data.status}');`, function (err, result, fields) {
			if (err) 
				callback(err,null);
            else				
				callback(null,result.insertId);			
		});		
	},

	/* User Login Model */
	check: function(con, data, callback) {          
		con.query(`SELECT COUNT(*) AS userCount, u.user_password, ut.role_name FROM cms_users u LEFT JOIN user_type ut ON u.role_id = ut.role_id WHERE u.user_email = '` + data.email + `' AND u.role_id = '` + data.role_id + `' LIMIT 1;`, function (err, result, fields) {
			if (err) 
				callback(err,null);
            else
			    if(result[0].userCount == 0) {
					callback(err,null);
				} else {
					if (bcrypt.compareSync(data.password, result[0].user_password)) {
						callback(null,result[0].role_name);
					} else {
						callback(err,null);
					}	
                }				
		});
	}
  
}
