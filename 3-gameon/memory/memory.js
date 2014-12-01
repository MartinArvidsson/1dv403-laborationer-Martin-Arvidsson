"use strict";

var memory = {
    RandomArray:[],     //En array där random.js sparas
    rows: 4,            //Antalet rader av spelrutor
    columns: 4,         //Antalet kolumner av spelrutor
    Imagecount: 0,      //variabel för vilken bild som ska skrivas ut.
    guesses: 0,         //Antalet gissningar
    flipOrder: 0,       //Ordningen av hur man vänder sina spelbrickor.
    correctBricks: 0,   //Antal ggr man har gissat korrekt       
    flippedBricks: 0,
    pairsOfBricks: 8,
    canFlipBrick:true,
    ParentNode: null,   
    picOne: null,       
    picTwo: null,       
    cardArea: null,
    check: true,
    
    init:function()
    {
        memory.RandomArray = RandomGenerator.getPictureArray(memory.rows, memory.columns);
        memory.renderCards();
    },
    renderCards:function(){
        memory.cardArea = document.getElementById("memoryBricks");
        var Indextable = document.createElement("table"); //Skapar table taggen inut i div taggen "memoryBricks"
        var i = 0;
        var j = 0;
        for (i = 0; i <memory.rows; i++) //Så länge som inte alla rader är utskriva lägg till en rad
        {
            var indexRow = document.createElement("tr"); //Skapar en "tr"
            Indextable.appendChild(indexRow); // Som barn i "table"
            for (j =0; j <memory.columns; j++) //Så länge som alla kolumner inte är utskriva skriv en kollumn
            {
                memory.cell = document.createElement("td"); //Skapar en "td / Cell"
                var link = document.createElement("a"); //med en "a-tagg" innuti
                var Indeximg = document.createElement("img"); // 
                
                link.picture = "pics/"+memory.RandomArray[memory.Imagecount]+".png"; //en bild läggs till
                Indeximg.id ="Facedown"; //Bilden heter facedown då brickan inte är vänd och har (?) som bild.
                
                Indeximg.src ="pics/0.png"; //Brickan som är nedåtvänd har bild 0 angiven = altså (?)
                Indeximg.picture ="pics/"+memory.RandomArray[memory.Imagecount]+".png"; //Bilden som är gömd får nummer 1
                Indeximg.notActive = false;
                memory.Imagecount +=1;
                
                link.href ="#";
                
                link.Indeximg = Indeximg;
                
                link.addEventListener("keypress", memory.click);
                link.addEventListener("click",memory.click);
                link.appendChild(Indeximg);
                memory.cell.appendChild(link);
                indexRow.appendChild(memory.cell);
            }
            Indextable.appendChild(indexRow);
        }
        memory.cardArea.appendChild(Indextable);
    },
    flipBrick:function(img, picture){
        if(memory.flippedBricks === 2){
            memory.guesses += 1;
            memory.flippedBricks = 0;
            memory.check = false;
        }
        img.src = picture;
        img.id = "faceUp"+memory.flipOrder;
        document.getElementById('faceUp'+memory.flipOrder).notActive = true;
        memory.flipOrder +=1;
        if(memory.flippedBricks === 0)
        {
            memory.picOne = img.src;
        }
        if(memory.flippedBricks === 1)
        {
            memory.picTwo = img.src;
            if(memory.picOne === memory.picTwo)
            {
                document.getElementById('faceUp0').notActive = true;
                document.getElementById('faceUp1').notActive = true;
                document.getElementById('faceUp0').parentNode.notActive = true;
                document.getElementById('faceUp1').parentNode.notActive = true;
                document.getElementById("faceUp0").id="correct";
                document.getElementById("faceUp1").id="correct";
                
                memory.correctBricks +=1;
                if(memory.correctBricks == memory.pairsOfBricks)
                {
                    var text = document.createElement("p");
                    text.id ="textarea";
                    text.innerHTML ="Du klarade det på "+memory.guesses+" Försök, Snyggt!";
                    memory.cardArea.appendChild(text);
                }
            }
            else
            {
                memory.canFlipBrick = false;
                setTimeout(memory.flipBack, 1000);
                
            }
            memory.flipOrder = 0;
        }
    },
    
    flipBack:function(){
        memory.canFlipBrick = true;
        document.getElementById('faceUp0').notActive = false;
        document.getElementById('faceUp1').notActive = false;
        document.getElementById("faceUp0").src="pics/0.png";
        document.getElementById("faceUp0").id="Facedown";
        document.getElementById("faceUp1").src="pics/0.png";
        document.getElementById("faceUp1").id="Facedown";
    }, 
    
    click:function(){
        if(this.Indeximg.notActive === false & memory.canFlipBrick === true)
        {
            memory.flipBrick(this.Indeximg,this.Indeximg.picture);
            memory.flippedBricks += 1;
        }
    },
};
window.onload = memory.init;
