//Efter att knappen på "Taskbar.js" har aktiverats ska ett fönster öppnas, fönstret använder sig av
//"Templatet" som är skapat i "Index"..
//Koden som är här representerar ett fönster.
"use strict"

function Window(Desktop, name, img, Class){
    var self = this
    var template document.querySelector("#template");
    var windowtempate = template.content.querySelector(".window");
    this.w = windowtempate.cloneNode(true);
    this.content = this.w.querySelector("windowcontent")
    
    this.gif = document.createElement('img');
    this.gif = className ="LoadingGif";
    this.gif.src = "pics/Loading.gif"
    this.status = this.w.querySelector(".statusbar");
    
    this.pic = document.createElement('img');
    this.pic.src = img;
    this.pic.className ="Windowpicture";
    
    this.topbar = this.w.querySelector('.topbar');
    this.topbar.appendChild(this.pic);
    
    this.headline = this.w.querySelector(".headline");
    this.headline.innerHTML = name;
    
    this.desktop = desktop;
    
    desktop.body.appendChild(this.w);
    
    this.mouseDown();
    
    var close = this.w.querySelector(".closebutton");
    
    this.w.addEventListener("click", function(){
        
        desktop.zindex += 1;
        self.w.style.zindex = desktop.zindex;
    });
    
    close.onclick = function(){
        self.close();
    }
    
    if(Class !== undefined){
        this.script = new Class(this.desktop,this);
        
    }
}

window.prototype.close = function(){
    
    this.w.parentNode.removeChild(this.w);
};

