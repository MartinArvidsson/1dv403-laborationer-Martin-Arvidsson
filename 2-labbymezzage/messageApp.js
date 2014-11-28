"use strict";
var messageApp = {
    messages:[], //Array
    messagesSent: 0, //Sätter antalet skickade meddelande till 0 när sidan laddas
    init:function() //Vad som startas när sidan laddas in
    {
        var sendamessage = document.getElementById("sendmessage");
        sendamessage.onclick = function(e){ //Försöker skicka meddelande när man trycker på knappen
            if (document.getElementById("textarea").value !== "") //Om meddelandet INTE är tomt 
                {
                    messageApp.sendmessage(); //Skicka iväg
                }
                else //Annars
                {
                    e.preventDefault(); //Skicka inte iväg
                }
        };
        var sendbyEnter = document.getElementById("textarea");
        sendbyEnter.onkeypress=function(e) //Funktion för att skicka via enter
        {
            if (e.keyCode ==13 && !e.shiftKey && document.getElementById("textarea").value !== "")  //om shift+enter men meddelandet är tomt.
                {
                    e.preventDefault();  
                    messageApp.sendmessage(); 
                }
            if (e.keyCode == 13 && document.getElementById("textarea").value ==="")
                {
                    e.preventDefault(); //Om enter trycks och meddelandet är tomt, skicka inte iväg 
                }
            };
    },
    
    sendmessage: function(){ //Meddelandefunktion skickar
            
            var userInput = document.getElementById("textarea").value; //Userinput får värdet av vad som fanns i textrutan
            messageApp.messages.push(new Message(userInput, new Date())); //Skapar nytt meddelande via "message.js" med hjälp av userinput + datumet när meddelandet skrivs
            messageApp.messagesSent++; //Plussar på antal skickade meddelande med 1
            document.getElementById("messagesSent").innerHTML = "Antal skickade meddelanden är : " + messageApp.messagesSent; //byter ut antalet skickade meddelande mot det nya värdet.
            document.getElementById('textarea').value =""; //Sätter textrutan till att vara tom igen
            var arraylength = messageApp.messages.length-1; 
            messageApp.RenderMessage(arraylength);
        },
    RenderMessage: function(input){ //Funktion för att trycka ut sprites
        
        var Deletesprite = document.createElement("img"); //skapar en variabel av "img"
        var Timesprite = document.createElement("img");  //Skapar en variabel av "img"
        var Timestamp = document.createElement("div");  //Skapar en variabel av "div"
        Timestamp.id = "Timestamp";                    //"Timestamp" får värdet av timestamp
        var entry = document.createElement("section");//Skapar en variabel "entry" av "section" 
        entry.id = "TimeandDeletebutton";            //"entry" får värdet av "TimeandDeletebutton"
        
        Timestamp.innerHTML = messageApp.messages[input].getDateText(); 
        
        Deletesprite.classname="Deletesprite"; //döper klassen
        Deletesprite.src = "Delete.png"; //källa på bilden
        Timesprite.classname ="Timesprite"; //Döper klassen
        Timesprite.src ="Clock.png"; //Källa på bilden

        var Textmessage = document.createElement("p"); // Textmeddelandet blir vad som står i <p>
        Textmessage.id ="Textmeddelande"; // Textmessage får informationen som står i textmeddelande
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
                        messageApp.messages.splice(input, 1);
                        Textmessage.parentNode.removeChild(Textmessage);
                        
                        document.getElementById("messagesSent").innerHTML = "Antal skickade meddelanden är : "+messageApp.messagesSent;
                    }
            };
        Timesprite.onclick = function(e)
            {
                alert(messageApp.messages[input].getDate());
            };
    },
    rendermessages: function(){
        document.getElementById("messagesarea") = "";
        for (var i = 0; i < messages.length; i++) {
            messageApp.RenderMessage(i);
        }
    }
};
window.onload = messageApp.init; // Se första funktionen