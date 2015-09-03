var ref = new Firebase("https://reep.firebaseio.com");


var isNewUser = function() {
  var uid = ref.getAuth().uid.toString();
  var userRef = ref.child('users').child(uid);
  userRef.once("value", function(snapshot) {
    return true;
  }, function (errorObject) {
    return false;
  });
}




//Listeners

//Store new user creds on first signin (fb)
ref.onAuth(function(authData) {
  
  if (authData && isNewUser) {
    if (authData.password.email){
      ref.child("users").child(authData.uid).set({
        email: authData.password.email,
        provider: authData.provider
      });
    } else {
      ref.child("users").child(authData.uid).set({
        provider: authData.provider
      });
    }
  }
  
});

//Login button
$('#user-login').on('click', function(){

  ref.authWithPassword({
    email    : $('#login-email-input').val().trim(),
    password : $('#login-pass-input').val().trim()
  }, function(error, authData) {
    if (error) {
      if (error.toString().indexOf('user does not exist') != -1){
        
        var removeYellow = function(){
          $('#user-register').addClass('bg-darkblue');
          $('#user-register').removeClass('bg-yellow');
        }
        $('#user-register').addClass('bg-yellow');
        $('#user-register').removeClass('bg-darkblue');
        
        new Notification( 
          "That user doesn't exist, but you can <span class='bg-yellow'>register</span> below with that information",'alert', removeYellow 
        );
        
      } else {
        if (authData === undefined){
          new Notification("That's not valid user info", 'alert');
        } else {
          new Notification(authData);
        }
       
      }
    } else {
      //new Notification("Login succesful!");
      window.location.href = "/";
    }
  });
});


//Register button
$('#user-register').on('click', function(){
  ref.createUser({
    email    : $('#login-email-input').val().trim(),
    password : $('#login-pass-input').val().trim()
  }, function(error, userData) {
    if (error) {
      new Notification(error, 'alert' );
    } else {
      console.log(userData, userData.uid);
      new Notification( "Hoorah - You've created an account!" );
    }
  });
});

//Reset email option
$('#user-resetpass').on('click', function(){
  ref.resetPassword({
      email : $('#login-email-input').val().trim(),
    }, function(error) {
    if (error === null) {
      new Notification("Password reset email sent successfully");
    } else {
      if (error.toString().indexOf('Route') != -1) {
        new Notification('Please enter your email below so we can get you reset', 'alert')
      } else {
        new Notification(error, 'alert');
      }
    }
  });
});
