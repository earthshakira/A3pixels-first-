var click=false;
var active=1;
var wait=false;
var question=["Compare the net book value of Toyota's capital lease assets with the present value of the net minimum lease payments of its capital leases. Both amounts appear on Toyota's balance sheet.Identify why these two values differ so considerably.","Identify the financial effect on the income statement of operating leases versus capital leases."];
var options=[["The balance of the lease asset and that of lease liability do not match because lease assets are depreciated at a rate that is different from the reduction rate of lease liabilities.","The balance of the lease asset and that of lease liability do not match because lease commitments liabilities are broken down by time bands.","The balance of the lease asset and that of lease liability do not match because the undiscounted minimum lease payment balances are estimated values."],["Operating leases and capital leases generally incur the same annual level of expenses.","Capital leases generally result in lower expenses relative to operating leases during the earlier part of the life of the lease, and in higher expenses during the later part.","Capital leases generally result in higher expenses relative to operating leases during the earlier part of the life of the lease, and in lower expenses during the later part."]];
var message=[["The balance of the lease asset and that of lease liability do not match except at the inception of the lease term and at the end of the lease term because lease assets are depreciated at a rate that is different from the reduction rate of lease liabilities. ","Although the lease commitments liabilities are broken down by time bands, this does not explain the different balances.Try again.","The undiscounted minimum lease payment balances are not estimates. This does not explain the different balances.Try again"],["Operating leases and capital leases generally do not result in the same annual level of expenses. Try again.","Capital leases generally do not result in lower expenses relative to operating leases during the earlier part of the life of the lease, and in higher expenses during the later part. Try again.","Capital leases generally result in higher expenses relative to operating leases during the earlier part of the life of the lease, and in lower expenses during the later part. "]];
var answer=[1,3];
var trials=[2,2,2,2,2,2,2,,2,2,2];

$('.subhead').on('click',function(){
  if(click){
    expDown();
  }
  else{
    expUp();
  }
    click=!click;
});

function expDown(){
  $('#explanation').css('margin-top','-70vh');
  $('#explanation').css('opacity','1');
  $('.subhead-text').text('Question');
}

function expUp(){
  $('#explanation').css('margin-top','-140vh');
  $('#explanation').css('opacity','0');
  $('.subhead-text').text('Explanation');
}

function disableAns(){
  $('.question-answer').removeClass('hoverer');
  wait=true;
}

function enableAns(){
  $('.question-answer').addClass('hoverer');
  wait=false;
}

function loadQuestion(id,no,ques,opt,correct_option){
  var correct='glyphicon-ok';
  var wrong='glyphicon-remove';
  var glyph=wrong;
  if(active==1)
  {
    var wronghtml="<div class='wrong-ans'><span class='wrong-ans-head'>Incorrect:</span><p class='ans-txt' id='wrong-ans-txt'></p><button id='wrong-ans-btn' class='btn'></button></div>";
  }
  else {
    var wronghtml="<div class='wrong-ans'><span class='wrong-ans-head'>Incorrect:</span><p class='ans-txt' id='wrong-ans-txt'></p><button id='wrong-ans-btn2' class='btn'></button><button id='wrong-ans-btn' class='btn'></button></div>";
  }

  var htmlString="<div class='question-box'><h2 class='bold' style='margin-top:40px;'>Question "+no+"</h2><p>"+ques+"</p></div>";
  for(var i=0;i<opt.length;i++){
    if(i==(correct_option-1))
    {
      glyph=correct;
    }
    else {
      glyph=wrong;
    }
    htmlString+="<div class='question-answer hoverer' id='"+(i+1)+"'><div class='tick-box'><i class='glyphicon "+glyph+" marks hidden' id='box"+(i+1)+"'></i></div><div class='ans-txt-wrap'><p class='ans-txt'>"+opt[i]+"</p></div></div>";
  }
  document.getElementById(id).innerHTML=htmlString+wronghtml;
  $(".wrong-ans").hide();
  $('.question-answer').click(function(){
      if(wait==true)
      {
        return;
      }
      var cl=Number(this.id);
      $('#box'+cl).removeClass('hidden');
      $("#wrong-ans-txt").text(message[Number(active-1)][cl-1]);
      disableAns();

      if(cl==answer[active-1])
      {
        $(".wrong-ans-head").text('Correct');
        if(active==question.length)
        {
          $("#wrong-ans-btn").html('Summary');
          $("#wrong-ans-btn").click(function(){
            $('#summModal').modal();
          });
        }
        else {
            $("#wrong-ans-btn").html('Next');
            $("#wrong-ans-btn").click(function(){
              nextQues();
            });
        }

        $(".wrong-ans").css("background-color","#2ecc71");
        $(".wrong-ans").show(500);
        if(active!=1)
        {
          $("#wrong-ans-btn2").html('Prev');
          $("#wrong-ans-btn2").click(function(){
            prevQues();
          });
        }
      }
      else {
        trials[active-1]--;
        if(trials[active-1]>0){
          $(".wrong-ans-head").text('Incorrect');
          $("#wrong-ans-btn").html('Try Again');
          $(".wrong-ans").css("background-color","#e74c3c");
          $(".wrong-ans").show(500);
          $("#wrong-ans-btn2").hide();
          $("#wrong-ans-btn").click(function(){
            retry();
          });

        }
        else {
          trials[active-1]=2;
          $(".wrong-ans-head").text('Incorrect');
          $("#wrong-ans-btn").html('Next');
          $(".wrong-ans").css("background-color","#e74c3c");
          $(".wrong-ans").show(500);
          if(active==question.length)
          {
            $("#wrong-ans-btn2").html('Prev');
            $("#wrong-ans-btn").off("click");
            $("#wrong-ans-btn").click(function(){
              $('#summModal').modal();
            });
            $("#wrong-ans-btn2").click(function(){
              prevQues();
            });
            $("#wrong-ans-btn").html('Summary');
          }
          else{
            $("#wrong-ans-btn").click(function(){
              nextQues();
            });
            $("#wrong-ans-btn2").click(function(){
              prevQues();
            });
          }
        }
      }
  });
}

function retry(){
  enableAns();
  loadQuestion('questions',active,question[active-1],options[active-1],answer[active-1]);
}

function nextQues(){
  enableAns();
click=!click;
$('#explanation'+active).addClass('hidden');
active++;
$('#explanation'+active).removeClass('hidden');
expDown();
loadQuestion('questions',active,question[active-1],options[active-1],answer[active-1]);

}

function prevQues(){
  enableAns();
  click=!click;
$('#explanation'+active).addClass('hidden');
active--;
$('#explanation'+active).removeClass('hidden');
expDown();
loadQuestion('questions',active,question[active-1],options[active-1],answer[active-1]);
}
function triggerInstr(){
    $('#instrModal').modal();
}

function reset()
{
  enableAns();
  click=false;
  $('#explanation'+active).addClass('hidden');
  active=1;
  triggerInstr();
  $('#explanation1').removeClass('hidden');
  loadQuestion('questions',active,question[active-1],options[active-1],answer[active-1]);
}
$(document).ready(function(){
  triggerInstr();
  $('#explanation1').removeClass('hidden');
  loadQuestion('questions',active,question[active-1],options[active-1],answer[active-1]);
});

function winClose()
{
  window.close();
  window.open('./returnpage.html');

}
