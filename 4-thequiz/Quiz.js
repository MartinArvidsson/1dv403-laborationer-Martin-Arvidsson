"use strict";

var Quiz ={
    tries: 0,
    array:[],
    serverObject: null,
    init:function(){
        var userInput = document.getElementById("Svar");
        Quiz.renderQuestion("http://vhost3.lnu.se:20080/question/1");
        document.getElementById("Button").addEventListener("click", function(e){
            if(userInput.value !== "")
            {
                Quiz.answerQuestion(userInput.value, Quiz.serverObject.nextURL);
            }
            else
            {
                e.preventDefault();
            }
        });
        
    userInput.addEventListener("keydown",function(e) {
            if(e.keycode === 13)
            {
                if(userInput.value !== "")
                {
                    Quiz.answerQuestion(userInput.value, Quiz.serverObject.nextURL);
                }
                else
                {
                    e.preventDefault();
                }
            }
        });
    },
    
    renderQuestion: function(url){
        Quiz.tries = 0;
        var Questionfromserver = document.getElementById("question");
        var XHR  = new XMLHttpRequest();
        var userInput = document.getElementById("Svar");
        userInput.value ="";
        
        XHR.onreadystatechange = function(){
            if(XHR.readystate === 4 && XHR.status === 200)
            {
                Quiz.serverObject = JSON.parse(XHR.responseText);
                Questionfromserver.innerHTML = Quiz.serverObject.question;
            }
        };
        XHR.open("GET",url, true);
        XHR.send(null);
    },
    answerQuestion: function(answer, url){
        var XHRTwo = new XMLHttpRequest();
        var i;
        
        var status = document.getElementById("Questions");
        
        XHRTwo.onreadystatechange = function(){
            if(XHRTwo.readystate === 4)
            {
                var Serverresponse = JSON.parse(XHRTwo.responseText);
                if (Serverresponse.message === "Correct answer!")
                {
                    if(Serverresponse.nextURL !== undefined)
                    {
                        Quiz.array.push(Quiz.tries);
                        Quiz.renderQuestion(Serverresponse.nextURL);
                        status.innerHTML ="Rätt svar!!"
                    }
                    else
                    {
                        Quiz.array.push(Quiz.tries)
                        status.innerHTML ="Grattis!, Resultat:"
                        document.getElementById("Button").disabled = true;
                        document.getElementById("Svar").value ="";
                        document.getElementById("Svar").disabled = true;
                        
                        for (i = 1; i < Quiz.array.length + 1; i +=1)
                        {
                            var questionTag = document.createElement("p");
                            questionTag.innerHTML = "fråga"+i+": "+Quiz.array[i-1]+"försök";
                            status.appendChild(questionTag);
                        }
                    }
                }
                else
                {
                    Quiz.tries +=1;
                    document.getElementById("Svar").value = "";
                    status.innerHTML = "fel svar, försök igen"
                }
            }
        }
    }
}
window.onload = Quiz.init;