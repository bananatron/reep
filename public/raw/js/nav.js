// It is of great use to the sailor to know the length of his line, 
// though he cannot with it fathom all the depths of the ocean.
//  -John Locke

/////////////////
// Navigation //
///////////////

if (loggedIn()){
  
  //Login / Logout nav
  var $loginlink = $('#login-link');
  $loginlink.children().text('Logout');
  $loginlink.on('click', function(){
    ref.unauth();
  });
  
  //Add Task
  $('.add-task').show();
}
