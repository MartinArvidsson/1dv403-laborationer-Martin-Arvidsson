"use strict";
var messageApp = {
    messages:[],
    messagesSent: 0,
    init:function()
    {
        var sendamessage = document.getElementById("sendmessage");
        sendamessage.onclick = function(e){
            if (document.getElementById("textarea").value !== "")
                {
                    messageApp.sendmessage();
                }
                else
                {
                    e.preventDefault();
                }
        };
        var sendbyEnter = document.getElementById("textarea");
        sendbyEnter.onkeypress=function(e)
        {
            if (e.keyCode ==13 && !e.shiftKey && document.getElementById("textarea").value !== "")
                {
                    e.preventDefault();
                    messageApp.sendmessage();
                }
            if (e.keyCode == 13 && document.getElementById("textarea").value ==="")
                {
                    e.preventDefault();
                }
            };
        },
    
    sendmessage: function(){
            
            var userInput = document.getElementById("textarea").value;
            messageApp.messages.push(new Message(userInput, new Date()));
            messageApp.messagesSent++;
            document.getElementById("messagesSent").innerHTML = "Antal skickade meddelanden är : " + messageApp.messagesSent;
            document.getElementById('textarea').value ="";
            var arraylength = messageApp.messages.length-1;
            messageApp.RenderMessage(arraylength);
        },
    RenderMessage: function(input){
        
        var Deletesprite = document.createElement("img");
        var Timesprite = document.createElement("img");
        var Timestamp = document.createElement("div");
        Timestamp.id = "Timestamp";
        var entry = document.createElement("section");
        entry.id = "TimeandDeletebutton";
        
        Timestamp.innerHTML = messageApp.messages[input].getDateText();
        
        Deletesprite.classname="Deletesprite";
        Deletesprite.src = "Delete.png";
        Timesprite.classname ="Timesprite";
        Timesprite.src ="Clock.png";

        var Textmessage = document.createElement("p");
        Textmessage.id ="Textmeddelande";
        Textmessage.innerHTML = messageApp.messages[input].getHTMLText();
        
        Textmessage.appendChild(entry);
        entry.appendChild(Deletesprite);
        entry.appendChild(Timesprite);
        entry.appendChild(Timestamp);
        messagesarea.appendChild(Textmessage);
        
        var element = document.getElementById("messagesarea");
        element.scrollTop = element.scrollHeight;
        
        Deletesprite.onclick = function(e)
            {
                if(confirm("Vill du radera detta?"))
                    {
                        messageApp.messagesSent = messageApp.messagesSent -1;
                        //messageApp.messages.splice(input, 1); // splicar, Utan splice tars sista meddelandet bort, men arrayen har kvar samma storlek. om jag använder
                        //Splice har jag en bugg som jag inte vet hur jag löser.
                        Textmessage.parentNode.removeChild(Textmessage);
                        document.getElementById("messagesSent").innerHTML = "Antal skickade meddelanden är : "+messageApp.messagesSent;
                    }
            };
        Timesprite.onclick = function(e)
            {
                alert(messageApp.messages[input].getDate());
            };
    }
};
window.onload = messageApp.init;