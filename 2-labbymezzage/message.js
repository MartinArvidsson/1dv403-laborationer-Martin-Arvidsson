"use strict";

function Message (message, date){   //Skapar en funktion (Message) som innehåller message(meddelande) och date(datum)
    
    this.getText = function(){
        return message;
        };
        
    this.setText = function(_text){
        message = _text;
        };
        
    this.getDate =function(){
        return date;
    };
    
    this.setDate =function(_date){
        date = _date;
    };
        Message.prototype.toString = function(){
            return this.getText()+" ("+this.getDate()+")";
        };
        Message.prototype.getHTMLText = function(){ //Byter användarens entertryck mot radbrytningar i presentationen
            return this.getText().replace(/[\n\r]/g, "<br/>");
        };
        Message.prototype.getDateText = function (){ //Beräkning för nuvarande tid 
        var Hours = this.getDate().getHours();
        var Minutes = this.getDate().getMinutes();
        var Seconds = this.getDate().getSeconds();
        if (Minutes < 10)
        {
            Minutes = "0"+Minutes;
        }
        if (Seconds < 10)
        {
            Seconds = "0"+Seconds;
        }
        return +Hours+":"+Minutes+":"+Seconds;
    };
}