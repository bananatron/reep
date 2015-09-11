
var buildFocusOption = function(focusObj){
  
  //Using jquery this time around to see which is prettier
  var focus__setting = $('<div></div>').addClass('focus__setting');
  
  var focus__color = $('<div></div>')
  .addClass('focus__color')
  .css('background-color', focusObj.color);
  focus__setting.append(focus__color);
  
  var focus__icon = $('<div></div>')
  .addClass('focus__icon')
  .html('<span class="ion-' + focusObj.icon + '"></span>');
  focus__setting.append(focus__icon);
  
  var focus__name = $('<div></div>')
  .addClass('focus__name')
  .text(focusObj.name);
  focus__setting.append(focus__name);
  
  var focus__action = $('<div></div>')
  .addClass('focus__action focus-edit bg-grey')
  .html('<span class="ion-edit"></span>');
  focus__setting.append(focus__action);
  
  var focus__action = $('<div></div>')
  .addClass('focus__action focus-delete bg-red')
  .html('<span class="ion-close"></span>');
  focus__setting.append(focus__action);
  
  $('.focus-container').append(focus__setting);
  
}

//Create focus setting option things
if (loggedIn()){
  ref.child('users').child(uid).child('focus').once('value', function(snapshot) {
    $.each( snapshot.val(), function( key, focusData ) {
      buildFocusOption(focusData);
    });
  });
  
  $('.current-email').text(ref.getAuth().password.email);
  
}
