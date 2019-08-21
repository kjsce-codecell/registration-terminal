$(function() {
  // Set the command-line prompt to include the user's IP Address
  $('.prompt').html('[' + "127.0.0.1" + '@HTML5] # ');
  $(".prompt").html("<b style=\"font-family:monospace\">KJSCE@codecell-macbook-pro</b>$");
  $('.prompt').html('>>');

  // Initialize a new terminal object
  var term = new Terminal("#input-line .cmdline", "#container output");
  term.init();
});
