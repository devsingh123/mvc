module.exports = {
  
	/* Get Articles Data */  
	get: function(con, data, callback) {		    
		con.query(`SELECT article_name, artical_desc, artical_cat_id, artical_added, artical_user_id FROM cms_articles`, function (err, result, fields) {
			if (err) 
				callback(err,null);
            else				
				callback(null,JSON.stringify(result));			
		});		
	}
	
}
