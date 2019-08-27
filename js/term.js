var util = util || {};
util.toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
};

var Terminal =
    Terminal ||
    function(cmdLineContainer, outputContainer) {
        window.URL = window.URL || window.webkitURL;
        window.requestFileSystem =
            window.requestFileSystem || window.webkitRequestFileSystem;

        var cmdLine_ = document.querySelector(cmdLineContainer);
        var output_ = document.querySelector(outputContainer);

        const CMDS_ = [
            "help",
            "venue.py",
            "register.py",
        ];

        const QUESTIONS = [
            "Enter your full name :",
            "Enter your email id :",
            "Enter your Mobile No. :",
            "Enter your year: ",
            "Enter your Branch name :",
            "Which language do you prefer to code ?",
        ];

        const ident = [
            "Name",
            "Email",
            "mobile",
            "year",
            "branch",
            "q1",
        ];

        const options1 = [
            "(A)C",
            "(B)C++",
            "(C)Java",
            "(D)Python"
        ];

        var ans = {};

        var submissionData = {};

        var fs_ = null;
        var cwd_ = null;
        var history_ = [];
        var histpos_ = 0;
        var counter = 0;
        var correctinp = 0;
        var histtemp_ = 0;
        registerStart = false;

        $('#container').click(
          function(e) {
            cmdLine_.focus();
          }
        );

        cmdLine_.addEventListener("click", inputTextClick_, false);
        cmdLine_.addEventListener("keydown", historyHandler_, false);
        cmdLine_.addEventListener("keydown", processNewCommand_, false);

        //
        function inputTextClick_(e) {
            this.value = this.value;
        }

        //
        function historyHandler_(e) {
            if (history_.length) {
                if (e.keyCode == 38 || e.keyCode == 40) {
                    if (history_[histpos_]) {
                        history_[histpos_] = this.value;
                    } else {
                        histtemp_ = this.value;
                    }
                }

                if (e.keyCode == 38) {
                    // up
                    histpos_--;
                    if (histpos_ < 0) {
                        histpos_ = 0;
                    }
                } else if (e.keyCode == 40) {
                    // down
                    histpos_++;
                    if (histpos_ > history_.length) {
                        histpos_ = history_.length;
                    }
                }

                if (e.keyCode == 38 || e.keyCode == 40) {
                    this.value = history_[histpos_]
                        ? history_[histpos_]
                        : histtemp_;
                    this.value = this.value; // Sets cursor to end of input.
                }
            }
        }

        //
        async function processNewCommand_(e) {
            var objDiv = document.getElementById("container");
            objDiv.scrollTop = objDiv.scrollHeight;
            if (e.keyCode == 9) {
                // tab
                e.preventDefault();
                // Implement tab suggest.
            } else if (e.keyCode == 13) {
                // enter
                // Save shell history.
                if (this.value) {
                    history_[history_.length] = this.value;
                    histpos_ = history_.length;
                }

                // Duplicate current input and append to output section.
                var line = this.parentNode.parentNode.cloneNode(true);
                line.removeAttribute("id");
                line.classList.add("line");
                var input = line.querySelector("input.cmdline");
                input.autofocus = false;
                input.readOnly = true;
                output_.appendChild(line);

                if (this.value && this.value.trim()) {
                    var args = this.value.split(" ").filter(function(val, i) {
                        return val;
                    });
                    var cmd = args[0].toLowerCase();
                    //args = args.splice(1); //Remove cmd from arg list.
                }


                if (registerStart == true) {
                    console.log(QUESTIONS+' '+counter);
                    ans[ident[counter - 1]] = args.join(" ");
                    if (counter == QUESTIONS.length) {
                        // output("Run submit.py to submit your details !");
                        console.log(ans);
                        output("SUBMITTING DETAILS... PLEASE WAIT");
                        try{
                        var response = await fetch(
                            "http://54.173.195.32:8000/register",
                            {
                                method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                redirect: "follow", referrer: "no-referrer", body: JSON.stringify(ans)
                            }

                        );

                            var text = await response.text();
                            if (text === 'Registered Succesfully'){
                                output("SUBMITTED SUCCESSFULLY! CHECK YOUR EMAIL");
                            }
                            else if (text === 'Already Registered')
                                output("ALREADY REGISTERED USING THIS MAIL!");
                            else {
                                output("WHOOPS! SOMETHING WENT WRONG. PLEASE TRY AGAIN");
                            }
                        console.log(response);
                        counter=1;
                        //output("SUBMITTED SUCCESSFULLY! CHECK YOUR EMAIL");
                        }catch(err){
                            console.log(err);
                            try{
                                var response = await fetch(
                                    "http://54.173.195.32:8000/register",
                                    {
                                        method: "POST", mode: "cors", cache: "no-cache", credentials: "same-origin",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        redirect: "follow", referrer: "no-referrer", body: JSON.stringify(ans)
                                    }
                                );

                                console.log(response);
                                var text = await response.text();
                                console.log(text);
                                if (text === 'Registered Succesfully')
                                    output("SUBMITTED SUCCESSFULLY! CHECK YOUR EMAIL");
                                else if (text === 'Already Registered')
                                    output("ALREADY REGISTERED USING THIS MAIL!");
                                else {
                                    output("WHOOPS! SOMETHING WENT WRONG. PLEASE TRY AGAIN");
                                }
                            }catch(errin)
                            {
                                console.log(errin);
                                registerStart = false;
                                output("WHOOPS! SOMETHING WENT WRONG");
                                console.log('Something went wrong');
                            }
                        }
                        registerStart = false;
                    } else {
                        if (correctinp == 1 && counter == 2) {
                            do {
                                var re = /\S+@\S+\.\S+/;
                                var em = args.join(" ").trim();
                                if (re.test(em)) {
                                    //output('yes');
                                    correctinp = correctinp + 1;
                                    break;
                                } else {
                                    output("Please Enter a valid email id");
                                    return;
                                }
                            } while (true);
                        } else if (correctinp == 2 && counter == 3) {
                            do {
                                var x1 = args.join(" ").trim();
                                if (!(x1.length == 10) || isNaN(x1)) {
                                    output(
                                        "Please enter a valid mobile number"
                                    );
                                    return;
                                } else {
                                    //output("yes");
                                    correctinp = correctinp + 1;
                                    break;
                                }
                            } while (true);
                        }
                        output(QUESTIONS[counter]);
                        if (counter == QUESTIONS.length - 1) {
                            output(
                                "Please answer this question with the letter of the appropriate option, honestly"
                            );
                            for (var q in options1) {
                                output(options1[q]);
                            }
                        } 
                        counter = counter + 1;
                    }
                } else {
                    switch (cmd) {
                        case "python3":
                            if (args == "python3")
                                output("Try running a script!");
                            if (args[1].toLowerCase() == "register.py") {
                                counter = 0;
                                correctinp = 0;
                                // output('We have closed the registrations! We will be organising more such workshops soon. Follow us <a href="https://instagram.com/kjsce_codecell/" style="font-weight:bold; color: yellow;">@kjsce_codecell</a> to stay tuned. See you then!');
                                registerStart = true;
                                output("RUNNING THE REGISTRATION SCRIPT...");
                                output(QUESTIONS[counter]);

                                correctinp = 1;
                                counter = 1;
                            } else if (args[1].toLowerCase() == "venue.py")
                                output("KJ Somaiya College Of Engineering");
                            else output("No Such Script");
                            break;
                        case "clear":
                            output_.innerHTML = "";
                            this.value = "";
                            output(
                                "Welcome to the codecell registration terminal"
                            );
                            // output('We have closed the registrations! We will be organising more such workshops soon. Follow us <a href="https://instagram.com/kjsce_codecell/" style="font-weight:bold; color: yellow;">@kjsce_codecell</a> to stay tuned. See you then!');
                            output('Type "ls" for a list of available scripts');
                            return;
                        case "echo":
                            output(args.join(" "));
                            break;
                        case "ls":
                            output(
                                '<div class="ls-files">' +
                                    CMDS_.join("<br>") +
                                    "</div>"
                            );
                            //output('HINT : try running a script');
                            break;
                        case "help":
                            output(
                                "HINT : try running a script with python3 !"
                            );
                            break;
                        case "whoami":
                            var result =
                                '<img src="' +
                                codehelper_ip["Flag"] +
                                '"><br><br>';
                            for (var prop in codehelper_ip)
                                result +=
                                    prop + ": " + codehelper_ip[prop] + "<br>";
                            output(result);
                            break;
                        case "register.py":
                            output(
                                "HINT : try running the script with python3 !"
                            );
                            break;
                        case "submit.py":
                            output(
                                "HINT : try running the script with python3 !"
                            );
                            break;
                        default:
                            if (cmd) {
                                output(cmd + ": command not found");
                            }
                    }
                }
                // window.scrollTo(0, getDocH q q eight_());
                this.value = ""; // Clear/setup line for next input.
            }
        }

        //
        function formatColumns_(entries) {
            var maxName = entries[0].name;
            util.toArray(entries).forEach(function(entry, i) {
                if (entry.name.length > maxName.length) {
                    maxName = entry.name;
                }
            });

            var height =
                entries.length <= 3
                    ? "height: " + entries.length * 15 + "px;"
                    : "";

            // 12px monospace font yields ~7px screen width.
            var colWidth = maxName.length * 7;

            return [
                '<div class="ls-files" style="-webkit-column-width:',
                colWidth,
                "px;",
                height,
                '">'
            ];
        }

        // Output to the terminal
        function output(html) {

            output_.insertAdjacentHTML("beforeEnd", "<p>" + html + "</p>");
            var objDiv = document.getElementById("container");
            objDiv.scrollTop = objDiv.scrollHeight;
            var $prompt = $(".prompt");
            console.log($prompt);
            // console.log(registerStart);
            if (registerStart) {
                var lastprompt = $prompt[$prompt.length - 1];
                $(lastprompt).html(">>");
            } else {
                var lastprompt = $prompt[$prompt.length - 1];
                $(lastprompt).html(
                    '<b style="font-family:monospace">KJSCE@codecell-macbook-pro</b>$'
                );
            }
        }

        // Cross-browser impl to get document's height.
        function getDocHeight_() {
            var d = document;
            return Math.max(
                Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
                Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
                Math.max(d.body.clientHeight, d.documentElement.clientHeight)
            );
        }

        // Initiate
        return {
            init: function() {
                output("Welcome to the codecell registration terminal");
                // output('We have closed the registrations! We will be organising more such workshops soon. Follow us <a href="https://instagram.com/kjsce_codecell/" style="font-weight:bold; color: yellow;">@kjsce_codecell</a> to stay tuned. See you then!');
                output('Type "ls" for a list of available scripts');
                //output('<img align="left" src="assets/codecell logo.jpg" width="100" height="100" style="padding: 0px 10px 20px 0px"><h2 style="letter-spacing: 4px">HTML5 Web Terminal</h2><p>' + new Date() + '</p><p>Enter "help" for more information.</p>');
            },
            output: output
        };
    };

var $textarea = $("#textarea");
