$(document).ready(function() {
  $('select').material_select();

  $.validator.setDefaults({
    ignore: []
  });

  $("form").validate({
    submitHandler: function(form) {
      console.log(form);
      return;
    },
    errorElement: 'div',
    errorPlacement: function(error, element) {
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
      noob: 'I am new to programming and have never worked with programming languages before',
      basic: 'I have a basic grasp on programming concepts and can implement simple programs in a language like C, Java or python',
      amateur: 'I have taken a course in DSA thus have an understanding of it',
      professional: 'I have extensively worked with C, java or other languages and can easily convert thought to code using proper data structures and efficient algorithms',
      beginner: 'I am a beginner with no prior experience in python',
      syntax: 'I know the syntax but haven\'t made anything cool with it yet',
      intermediate: 'I have various side projects in Python and I can write efficient python code following best practices',
      docs: 'I am not afraid to pull up docs to find what I am looking for'
    };

    let name = $.trim($("#name").val());
    let email = $.trim($("#email").val());
    let mob = $.trim($("#mob").val());
    let college = $.trim($("#college").val());
    let branch = $.trim($("#branch").val());
    let year = $.trim($("#year").val());

    let experience = $("input[name='experience']:checked").val();
    let category = $("input[name='category']:checked").val();

    const data = {
      name, email, mob, college, branch, year,
      experience: QUESTIONS[experience],
      category: QUESTIONS[category]
    };

    console.log(data);

    // Submit this "data" object to server
  });
});
