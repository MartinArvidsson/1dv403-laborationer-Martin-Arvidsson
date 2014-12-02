"use strict";

var memory = {
    RandomArray:[],     
    rows: 4,            //Antalet rader av spelrutor
    columns: 4,         //Antalet kolumner av spelrutor
    Imagecount: 0,      //variabel för vilken bild som ska skrivas ut.
    guesses: 0,         //Antalet gissningar
    flipOrder: 0,       //Ordningen av hur man vänder sina spelbrickor.
    correctBricks: 0,   //Antal ggr man har gissat korrekt       
    flippedBricks: 0,   // brickor som är "aktiva"
    pairsOfBricks: 8,   //totala antal par
    canFlipBrick:true,
    ParentNode: null,   
    picOne: null,       
    picTwo: null,       
    cardArea: null,
    check:true,
    
    init:function()
    {
        memory.RandomArray = RandomGenerator.getPictureArray(memory.rows, memory.columns);
        memory.renderCards();
    },
    renderCards:function(){ //Funktion fär att få ut "brickorna" på "spelbordet"
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
                var Indeximg = document.createElement("img"); // bild
                
                link.picture = "pics/"+memory.RandomArray[memory.Imagecount]+".png"; 
                
                Indeximg.src ="pics/0.png"; //Brickan som är nedåtvänd har bild 0 angiven = altså (?)
                Indeximg.id ="Facedown";
                Indeximg.picture ="pics/"+memory.RandomArray[memory.Imagecount]+".png";
                Indeximg.notActive = false;
                
                memory.Imagecount +=1;
                
                link.href ="#";
                
                link.Indeximg = Indeximg;
                
                link.addEventListener("keypress", memory.click);
                link.addEventListener("click",memory.click);
                
                indexRow.appendChild(memory.cell);
                memory.cell.appendChild(link);
                link.appendChild(Indeximg);
            }
            Indextable.appendChild(indexRow);
        }
        memory.cardArea.appendChild(Indextable);
    },
    flipBrick:function(img, picture){ //Funktion för att kolla vid vända brickor med vilket av kraven som dom stämmer med.
        if(memory.flippedBricks === 2){
            memory.guesses += 1; //När man har tryckt 2 brickor läggs 1 gissning till
            memory.flippedBricks = 0;
            memory.check = false;
        }
            img.src = picture;
            img.id = "faceUp"+memory.flipOrder;
            document.getElementById('faceUp'+memory.flipOrder).notActive = true;
            memory.flipOrder +=1;
            if(memory.flippedBricks === 0) //Första brickan
            {
                memory.picOne = img.src;
            }
            if(memory.flippedBricks === 1) // Andra brickan
            {
                memory.picTwo = img.src;
                if(memory.picOne === memory.picTwo) // Om första är = andra = Rätt!
                {
                    document.getElementById('faceUp0').notActive = true; //Eftersom bilderna matchar lämnas dom "uppe" och får ID:t att dom är korrekta!
                    document.getElementById('faceUp0').parentNode.notActive = true;
                    document.getElementById("faceUp0").id="correct";
                    document.getElementById('faceUp1').notActive = true;
                    document.getElementById('faceUp1').parentNode.notActive = true;
                    document.getElementById("faceUp1").id="correct";
                    
                    memory.correctBricks +=1;
                    if(memory.correctBricks == memory.pairsOfBricks)
                    {
                        var text = document.createElement("p");
                        text.id ="textarea";
                        text.innerHTML ="Du klarade det på "+memory.guesses+" Försök, Snyggt! ";
                        memory.cardArea.appendChild(text);
                    }
                }
                else // Annars kör vänd tillbaka funktionen
                {
                    memory.canFlipBrick = false;
                    //setTimeout(memory.flipBack, 1000);
                    setTimeout(function(){
                        memory.canFlipBrick = true; 
                        document.getElementById('faceUp0').notActive = false; //Vänder tillbaka första bilden
                        document.getElementById("faceUp0").src="pics/0.png"; //sätter första bilden till bild 0 (?):net
                        document.getElementById("faceUp0").id="Facedown";    //Ger den ID:T "Facedown" igen
                        document.getElementById('faceUp1').notActive = false;//Vänder tillbaka andra bilden
                        document.getElementById("faceUp1").src="pics/0.png"; //sätter andra bilden till bild 0 (?):net
                        document.getElementById("faceUp1").id="Facedown";    //Ger den ID:T "Facedown igen"
                    }, 1000)
                }
                memory.flipOrder = 0;
            }
        },
    
    // Hade en separat FLipback som anropades ifrån else, valde istället att flytta in funktionen i else istället för att anropa den.
    
    /*flipBack:function(){ 
        memory.canFlipBrick = true; 
        document.getElementById('faceUp0').notActive = false;
        document.getElementById('faceUp1').notActive = false;
        document.getElementById("faceUp0").src="pics/0.png";
        document.getElementById("faceUp0").id="Facedown";
        document.getElementById("faceUp1").src="pics/0.png";
        document.getElementById("faceUp1").id="Facedown";
    },*/
    
        click:function(){ // Vad som ska hända när man trycker på 1 bricka
            if(this.Indeximg.notActive === false & memory.canFlipBrick === true)
            {
                memory.flipBrick(this.Indeximg,this.Indeximg.picture);
                memory.flippedBricks += 1;
            }
        },
};
window.onload = memory.init;
