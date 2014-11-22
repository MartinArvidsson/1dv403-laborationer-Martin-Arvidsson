"use strict";
var messageApp = {
    init:function()
    {
        var mess = new Message("Test1",new Date());
        alert (mess);
        alert (mess.getText());
        mess.setText("Text2");
        alert(mess);
    }
}
window.onload = messageApp.init;