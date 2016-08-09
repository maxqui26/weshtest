/*global API*/

(function () {
    var Txt1 = ":smile: ";
    var Txt2 = ":tshirt: ";
    var Txt3 = ":jeans: ";
    var spamLen = 3;
    var chatTmr, _spamLen;

    function loveSpam(arg) {
        if (chatTmr === undefined) {
            if (!isNaN(arg) && arg !== "") {
                _spamLen = spamLen;
                spamLen = parseInt(arg);
            }
            var i = 0;
            API.chatLog("if you want to stop the spam before " + spamLen + " lines just type \"/stopspam\"");
            chatTmr = setInterval(function() {
                i++;
                if (i <= spamLen) {
                    if (i==1){
                        API.sendChat(Txt1);
                    }elseif (i==2){
                        API.sendChat(Txt2);
                    }elseif (i==3){
                        API.sendChat(Txt3);
                    }
                    }
                } else {
                    stopSpam();
                }
            }, 1000);
        }
    }
    
    function stopSpam() {
        clearInterval(chatTmr);
        chatTmr = undefined;
        if (_spamLen !== undefined) {
            spamLen = _spamLen;
            _spamLen = undefined;
        }
    }

    function spamLength(arg) {
        if (!isNaN(arg) && arg !== "") {
            spamLen = parseInt(arg, 10);
        }
    }

    API.on(API.CHAT_COMMAND, function(command){
        command = command.split(" ");
        switch(command.shift()) {
            case "/bonhomme":
                loveSpam(command.join(" "));
                break;
            case "/stopbonhomme":
                stopSpam();
                break;
        }
    });
}());
