$(function(){
	
		//For On click of the submit button 
		  $('#ghsubmitbtn').on('click', function(e){
			
			  	e.preventDefault();
			    //taking the value of the input field in the variable
				var username = $('#ghusername').val();
			    var requri   = 'https://api.github.com/users/'+username;
			    var repouri  = 'https://api.github.com/users/'+username+'/repos';
			    
			    //For not found user names
			    requestJSON(requri, function(json) {
				      
			    	if(json.message == "Not Found" || username == '') {
				        $('#ghapidata').html("<h2>No User Info Found</h2>");
				        $('#img').removeClass('loadingImg');
				      }
				      //For existing user names
				      else {
				        var fullname   = json.name;
				        var username   = json.login;
				        var aviurl     = json.avatar_url;
				        var profileurl = json.html_url;
				        var location   = json.location;
				        var followersnum = json.followers;
				        var followingnum = json.following;
				        var reposnum     = json.public_repos;
				        
				        if(fullname == undefined) { fullname = username; }
				        
				        //For clicking on the user name, it will redirect to a new page with all details about the user
				        var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
				        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'"  alt="'+username+'"></a></div>';
				        //Adding the repository details of the user
				        outhtml = outhtml + '<p style="font-size:14px;margin-left:10px;">Repos List: </p></div>';
				        outhtml = outhtml + '<div class="repolist clearfix">';
				        
				        var repositories;
				        $.getJSON(repouri, function(json){
				          repositories = json;   
				          outputPageContent();                
				        });          
				        
				        //To show the repository list and if not found then showing a message
				        function outputPageContent() {
					          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
					          else {
					            outhtml = outhtml + ' <ul style="margin-top:-18%; margin-left:22%;">';
					            $.each(repositories, function(index) {
					              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
					            });
					            outhtml = outhtml + '</ul></div>'; 
					          }
					          $('#ghapidata').html(outhtml);
					          $('#img').removeClass('loadingImg');
				        } //End of outputPageContent()
				      } //End of else block
			    });
	});//End of submit button on-click function
		  
	//AJAX call here to get the data
	function requestJSON(url, callback) {
		    $.ajax({
		      url: url,
		      complete: function(xhr) {
		        callback.call(null, xhr.responseJSON);
		      }
		    });
	}
	
	//On the Enter key press calling the on-click function of submit button
	$('#container').keypress(function(e) {
				if(e.which == 13) 
					{
				        e.preventDefault();
				        $("#ghsubmitbtn").click();
			        }
	});
});
