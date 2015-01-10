// Ska ha en bild som fungerar som en ikon och när man trycker på ska starta upp en instans av fotogalleriet.
//Här är koden för knappen på startmenyn
"use strict";

function TaskbarIcon(desktop, name, img, Class){
    var self = this;
    this.desktop = desktop;
    this.name = name;
    this.img = img;
    
    this.taskbar = document.querySelector("#taskbar");
    this.icon = document.createElement('img');
    this.icon.title = name;
    this.icon.classname = name;
    this.icon.src = img;
    this.Class = Class;
    
    this.icon.onclick = function(){
        self.open();
    };
    
    this.taskbar.appendChild(this.icon);
    
}

TaskbarIcon.prototype.open = function(){
    var newWindow = new Window(this.desktop, this.name, this.img, this.Class);
};