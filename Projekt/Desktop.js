"use strict";

function Desktop(){
    
    this.body = document.querySelector("#desktop");
    this.lastPos = {x:20,y:20};
    this.zindex = 0;
}

Desktop.prototype.addApp = function(name, img, script){
    var takbaricon = new TaskbarIcon(this, name, img, script);

};

Desktop.prototype.getSize = function(){
    return {
        width: this.body.userWidth,
        height: this.body.userHeight
    };
}