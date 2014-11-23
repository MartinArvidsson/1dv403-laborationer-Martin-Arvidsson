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
        var image = document.createElement("img");
        var timeimage = document.createElement("img");
        var timestamp = document.createElement("div");
        timestamp.id = "Timestamp"
        var entry = document.createElement("section");
        entry.id = "Timeandbutton"
        
        timestamp.innerHTML = messageApp.messages[input].getDateText();
        img.classname="Deletesprite";
        img.src = "DeleteSprite.png";
        img.classname ="Timesprite";
        img.src ="Clocksprite.png";

        var Textmessage = document.createElement("p");
        Textmessage.id ="Textmeddelande";
        Textmessage.innerHTML = messageApp.messages[input].getHTMLText();
        
        Textmessage.appendChild(entry);
        entry.appendChild(img);
        entry.appendChild(Timesprite);
        entry.appendChild(Timestamp);
        messagesarea.appendChild(text);
        
        var element = document.getElementById("messagesarea");
        element.scrollTop = element.scrollHeight;
        
        img.onclick = function(e)
        {
            if(confirm("Vill du radera detta?"))
            {
                messageApp.messagesSent = messageApp.messagesSent -1;
                messageApp.messages.splice(input, 1);
                text.parentNode.removeChild(text);
                document.getElementById("messagesSent").innerHTML = "Antal skickade meddelanden är : "+messageApp.messagesSent;
            }
        };
        Timesprite.Onclick = function(e)
        {
            alert(messageApp.messages[input].getDate());
        }
    }
};
window.onload = messageApp.init;