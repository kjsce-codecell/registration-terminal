$(document).ready(function () {

  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "30000",
    "hideDuration": "10000",
    "timeOut": "50000",
    "extendedTimeOut": "10000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  var questions = null;
        
  $.getJSON("../data.json", function(json) {
      questions = json["data"];
      console.log(questions);
      for(var i=0;i<questions.length;i++){
        var node = document.createElement("div");
        node.className = "row";
        var inner_html = `<div class="input-field col s12"><p for="q${i+1}">${questions[i]['question']}</p>`;
        for(var j in questions[i]['options']){
          var opt = parseInt(j)+1;
          var template = `<p class="mb-2">
          <input name="q${i+1}"  class="with-gap" type="radio" id="q${i+1}${opt}" value="q${i+1}${opt}" data-error="#e4" required>
          <label for="q${i+1}${opt}">${questions[i]['options'][j]}</label>
        </p><br>`;
          inner_html += template;
        }
        inner_html += `<br></div>`;
        node.innerHTML = inner_html;
        document.getElementById("submitForm").appendChild(node);
      }
      var submit_node = document.createElement("div");
      submit_node.className = "row center-block";
      submit_node.innerHTML = `<div class="input-field col m6 s12">
          <button type="submit" class="waves-effect waves-light btn-large" style="background-color: #ccff00;color: #000000;">Submit</button>
        </div>`;
        document.getElementById("submitForm").appendChild(submit_node);
  });




  $('select').material_select();

  $.validator.setDefaults({
    ignore: []
  });

  $("form").validate({
    submitHandler: function (form) {
      console.log(form);

      return;
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

  // Input fields
  $("#submitForm").on('submit', (e) => {

    let Name = $.trim($("#name").val());
    let Email = $.trim($("#email").val());
    let mobile = $.trim($("#mob").val());
    let branch = $.trim($("#branch").val());
    let year = $.trim($("#year").val());

    // console.log(year);

    // console.log(language);

    var data = {
      Name, Email, mobile, branch, year,
    };

    for(var i=0;i<questions.length;i++){
      data["q"+i] = $(`input[name='q${i+1}']:checked`).val()[2];
    }

    // toastr['error']("Sorry. We have closed the registration now.");
    // return;

    console.log(data);

    // Submit this "data" object to server
    try {
      fetch(
        "http://54.173.195.32:8000/register",
        {
          method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          redirect: "follow", referrer: "no-referrer", body: JSON.stringify(data)
        }
      ).then(resp => resp.text()).then(
        (res) => {
          console.log(res);
          if (res === 'Registered Succesfully') {
            toastr['success']("Registration Completed!");
          }
          else if (res === 'Already Registered') {
            toastr['error']("Already Registed!");
          }
          else {
            toastr['error']("Registration failed!");
          }
        });

    } catch (err) {
      console.log(err);
    }
  });
});
