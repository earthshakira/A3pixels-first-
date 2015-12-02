var click=false;
var active=1;
$('.subhead').on('click',function(){
  if(click){
      $('#explanation').css('margin-top','-70vh');
      $('#explanation').css('opacity','1');
      $('.subhead-text').text('Explanation');
  }
  else{
    $('#explanation').css('margin-top','-140vh');
    $('#explanation').css('opacity','0');
    $('.subhead-text').text('Question');
  }
    click=!click;
});
