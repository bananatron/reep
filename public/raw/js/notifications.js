// Every once in a while, someone will mail me a single popcorn kernel that didn't pop. 
// I'll get out a fresh kernel, tape it to a piece of paper and mail it back to them.
// - Orville Redenbacher

////////////////////
// Notifications //
//////////////////

function Notification(text, type, trigger) {
  this.text = text;
  this.type = type || "";
  
  this.init = function(){
    var note = $("<div class='note " + this.type + "' >" + this.text + "<span class='notification__close ion-close-circled'></span></div>");
    $('.notifications').append(note);
    if (trigger){
      $(note).on('click', function(){ trigger()  })
    }
  }
  
  this.init();
}

$('.notifications').on('click', function(){
  if ($(event.target).attr('class').indexOf('note') != -1){
    var nn = event.target;
    $(nn).slideUp( 200, function() {
      $(nn).remove();
    })
  }
});
