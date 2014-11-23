"use strict";

function Message (message, date){
    
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
        Message.prototype.getHTMLText = function(){
            return this.getText().replace(/[\n\r]/g, "<br/>");
        };
        Message.prototype.getDateText = function (){
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