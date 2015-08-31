
//////////////
// Helpers //
////////////

var validateModel = function(model){ //Maybe put in notifications here?
  if (model.summary == "" || model.summary == undefined) return false;
  if (model.score == 0 || model.score == undefined) return false

  return true;
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
