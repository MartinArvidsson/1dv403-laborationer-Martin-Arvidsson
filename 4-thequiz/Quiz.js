"use strict";

var Quiz ={
    
    questionArray:[],
    tries: 0,
    serverObject: null,
    
    
    init:function(){
        var userInput = document.getElementById("svar");
        document.getElementById("repeatQuestion").value ="";
        Quiz.renderQuestion("http://vhost3.lnu.se:20080/question/1");
        document.getElementById("Button").addEventListener("click", function(e){ //Trycker på knappen funkion
            e.preventDefault();

                Quiz.answerQuestion(userInput.value, Quiz.serverObject.nextURL);
            
        });
        
    },
    
    renderQuestion: function(url){ //Renderar ut frågorna
        Quiz.tries = 1;
        var XHR  = new XMLHttpRequest();
        var Questionfromserver = document.getElementById("question");
        var userInput = document.getElementById("svar");
        document.getElementById("repeatQuestion").value ="";
        userInput.value ="";
        
        XHR.onreadystatechange = function(){
            if(XHR.readyState === 4 && XHR.status === 200)
            {
                Quiz.serverObject = JSON.parse(XHR.responseText);
                Questionfromserver.innerHTML = Quiz.serverObject.question;
            }
        };
        
        XHR.open("GET",url, true);
        XHR.send(null);
    },
    
    answerQuestion: function(answer, url){
        var questionrepeat  = document.getElementById("repeatQuestion");
        var XHRTwo = new XMLHttpRequest();
        var i;
        var status = document.getElementById("question");
        
        XHRTwo.onreadystatechange = function(){
            if(XHRTwo.readyState === 4)
            {
                var Serverresponse = JSON.parse(XHRTwo.responseText);
                if (Serverresponse.message === "Correct answer!")
                {
                    if(Serverresponse.nextURL !== undefined)
                    {
                        Quiz.questionArray.push(Quiz.tries);
                        Quiz.renderQuestion(Serverresponse.nextURL);
                        //status.innerHTML ="Rätt svar, bra jobbat";
                        questionrepeat.innerHTML ="";
                    }
                    else
                    {
                        Quiz.questionArray.push(Quiz.tries);
                        status.innerHTML ="Grattis!, Resultat:";
                        document.getElementById("Button").disabled = true;
                        document.getElementById("svar").value ="";
                        document.getElementById("svar").disabled = true;
                        
                        for (i = 1; i < Quiz.questionArray.length + 1; i +=1)
                        {
                            var questionTag = document.createElement("p");
                            questionTag.innerHTML = "fråga"+i+": "+Quiz.questionArray[i-1]+"försök";
                            status.appendChild(questionTag);
                        }
                    }
                }
                else
                {
                    Quiz.tries +=1;
                    document.getElementById("svar").value = "";
                    //status.innerHTML = "fel svar, försök igen";
                    questionrepeat.innerHTML="fel svar, försök igen";
                }
            }
        };
        var Json = {answer: answer};
        var sendanAnswer = JSON.stringify(Json);
        XHRTwo.open("POST",url,true);
        XHRTwo.setRequestHeader("Content-type","application/json");
        XHRTwo.send(sendanAnswer);
    },
};
window.onload = Quiz.init;