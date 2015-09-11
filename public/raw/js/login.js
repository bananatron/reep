if (window.location.hash == '#noauth') new Notification('You need to log in first.', 'alert');


//Default focus set that all users start with
var focus = {
  d_chore: {
    name: 'Chore',
    color: '#cfd2da',
    icon: 'gear-b'
  },
  d_family: {
    name: 'Family',
    color: '#1997c6',
    icon: 'android-people'
  },
  d_financial: {
    name: 'Financial',
    color: '#1bc98e',
    icon: 'ios-cart'
  },
  d_personal: {
    name: 'Personal',
    color: '#9f86ff',
    icon: 'ios-body'
  },
  d_work: {
    name: 'Work',
    color: '#e64759',
    icon: 'ios-briefcase'
  }
}

////////////////
// Listeners //
//////////////

//Store new user creds on first signin (fb)

ref.onAuth(function(authData) {
  
  if (ref.getAuth() != null){
  ref.child('users').child(authData.uid).once('value', function(snapshot) {
    
    if (snapshot.val() == null){ //User doesn't yet exist in users table
      
      if (authData.password.email){
        ref.child("users").child(authData.uid).set({
          email: authData.password.email,
          provider: authData.provider,
          focus,
          score: 0
        });
      } else {
        ref.child("users").child(authData.uid).set({
          provider: authData.provider
        });
      }
      
    }
  }, function (errorObj) {
    console.log('firebase error', errorObj)
  });
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
