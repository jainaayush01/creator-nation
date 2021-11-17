var data = { 
    UserPoolId : _config.cognito.userPoolId,
    ClientId : _config.cognito.clientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
var cognitoUser = userPool.getCurrentUser();

var profileButton = document.getElementById("profileButton");

window.onload = function(){
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
			//Set the profile info
			cognitoUser.getUserAttributes(function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
                profileButton.setAttribute("class", "btn btn-outline-success");
                profileButton.setAttribute("href", "profile.html");
                profileButton.innerHTML = "Profile";
				console.log(result);	
			});			
			
        });
    }
}