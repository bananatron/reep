if (loggedIn()){
  
  ref.child('users').child(uid).child('score').on('value', function(snapshot) {
    $('#score').text(snapshot.val());
  });   
  
}
