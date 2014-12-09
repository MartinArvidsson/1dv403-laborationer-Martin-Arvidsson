"use strict";

var Quiz ={
    tries: 0,
    array:[],
    init:function(){
        Quiz.renderQuestion("http://vhost3.lnu.se:20080/question/1")
    },
    
    renderQuestion:function(url){
        Quiz.tries = 0;
        var Serverquestion = document.getElementById("Question");
        var XHR = new XMLHttpRequest();
        var userInput = document.getElementById("Svar");
        
        userInput.value = "";
        
        XHR.onreadystatechange = function(){
            if (XHR.readyState === 4 && XHR.status === 200)
            {
                var Serverobject = JSON.parse(XHR.responseText);
                Serverquestion.innerHTML = Serverobject.question;
                
                document.getElementById("Button").addEventListener("click", function(e){
                    if (userInput.value !== "")
                    {
                        //SVARA FRÅGA ( EJ KLAR)
                    }
                    else
                    {
                        e.preventDefault();
                    }
                })
                document.getElementById("Svar").addEventListener("keydown", function(e) {
                    if (e.keyCode === 13)
                    {
                        if (userInput.value !== "")
                        {
                            //SVARA
                        }
                        else
                        {
                            e.preventDefault();
                        }
                    }
                })
            }
        }
        XHR.open("GET",url , true)
        XHR.send(null)
    
        
    },
    
    questionAnswer: function(answer,url){
        var XHRTwo = new XMLHttpRequest();
        var i;
        XHRTwo.onreadystatechange = function(){
            if(XHRTwo.readyState === 4)
            {
                var 
            }
        }
    }
}