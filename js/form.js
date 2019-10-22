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

    const QUESTIONS = {
      c: 'I have never heard of it',
      cpp: 'I have heard of it but never used it',
      java: 'I occationally use it, but don\'t know much',
      python: 'I know it well and use it for my projects',
    };

    let Name = $.trim($("#name").val());
    let Email = $.trim($("#email").val());
    let mobile = $.trim($("#mob").val());
    let branch = $.trim($("#branch").val());
    let year = $.trim($("#year").val());

    // console.log(year);

    let language = $("input[name='language']:checked").val();

    // console.log(language);

    const data = {
      Name, Email, mobile, branch, year,
      language: QUESTIONS[language],
    };

    // toastr['error']("Sorry. We have closed the registration now.");
    // return;

    console.log(data);

    // Submit this "data" object to server
    //Old AWS Server: http://54.173.195.32:8000/register
    //New Server: http://codecell.eu-4.evennode.com/register
    try {
      $('#submitbtn').prop('disabled', 'true');
      fetch(
        "http://codecell.eu-4.evennode.com/register",
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
          $('#submitbtn').attr('disabled', false);
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
