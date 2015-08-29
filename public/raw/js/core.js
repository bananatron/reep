
var taskModel = {
    name: "",
    description: "",
    score: 0,
    categories: [],
    complete: false
}

//Task header toggle !!Review
$('.task__header').on('click', function(){
    $(this).parent().find('.task__body').toggle();
});



//Category Selection
$('.cat_option').on('click', function(){
  toggleSelected(this);
  
  //Modify model
  taskModel.categories = [];
  $('.cat_option[data-selected="true"]').each(function( ii, node ) {
    taskModel.categories.push( $(node).text() );
  });
});


//Score Selection
$('.score_option').on('click', function(){
  $('.score_option[data-selected="true"]').attr('data-selected', 'false');
  toggleSelected(this);
  taskModel.score = parseInt( $(this).text().trim() )
});





//HELPERS
var toggleSelected = function(self){
  if ( $(self).attr('data-selected') == 'true' ) {
    $(self).attr('data-selected', 'false'); 
  } else {
    $(self).attr('data-selected', 'true'); 
  }
}
