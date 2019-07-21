$(function() {
  // Set the command-line prompt to include the user's IP Address
  //$('.prompt').html('[' + codehelper_ip["IP"] + '@HTML5] # ');
  $(".prompt").html("<b style=\"font-family:monospace\">KJSCE@codecell-macbook-pro</b>$");
  //$('.prompt').html('>>');

  // Initialize a new terminal object
  var term = new Terminal("#input-line .cmdline", "#container output");
  term.init();
});
