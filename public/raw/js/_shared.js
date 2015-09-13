//SHARED.js
//This page is shared among all pages.





//////////////
// Helpers //
////////////

cleanString = function(str){
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}


var toggleSelected = function(self){
  if ( $(self).attr('data-selected') == 'true' ) {
    $(self).attr('data-selected', 'false'); 
  } else {
    $(self).attr('data-selected', 'true'); 
  }
}

var loggedIn = function loggedIn(){
  var authData = ref.getAuth();
  if (authData) {
    return true;
    console.log("User " + authData.uid + " is logged in via " + authData.provider);
  } else {
    return false;
    console.log(authData);
    console.log("User is logged out");
  }
}

var render = function render(){
  $('body').show();
}

//Client side redirect for no auth
var validateAuth = function validateAuth(){
  if (loggedIn() == false && window.location.pathname != '/login'){
    window.location.replace("/login#noauth");
  } else {
    render();
  }
}

$('.select-hide').on('click', function(){
  $('#'+$(this).data().hideId).slideToggle(100);
  console.log($(this).data().hideId);
});

var ref = new Firebase("https://reep.firebaseio.com");
if (ref.getAuth()) var uid = ref.getAuth().uid.toString();
validateAuth();
