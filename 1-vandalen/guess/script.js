"use strict";

window.onload = function(){
	
	var secret = Math.floor( Math.random() * 100)+1;
	var guessesDone = 0; //Sätter antal gissningar till 0 för att man ska hålla koll på hur många gissingar som görs.
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function(number){
		console.log("Det hemliga talet: " + secret); // Du når den yttre variabeln secret innifrån funktionen.
		console.log("Du gissade: " + number); // Detta nummer är det som användaren gissade på.
			
		// Plats för förändring.
		if (isNaN(number) === false) //Så länge som man inte har gissat korrekt är den false Check whether a number is an illegal number:
		{
			guessesDone +=1; // efter varje gissing + den antal gissningar man har gjort med +1
			if (number < 0 || number > 100)
			{
				return [false, "Talet är utanför intervallet 0 - 100"];
			}
			if (+number === secret)
			{
				return [true, "Grattis du vann! Det hemliga talet var "+secret+" och du behövde "+guessesDone+" gissningar för att hitta det."]
			}
			if (+number < secret)
			{
				return [false, "Det hemliga talet är högre!"]
			}
			if (+number > secret)
			{
				return [false, "Det hemliga talet är lägre!"]
			}
		else
		{
			return [false,"du har inte använt ett tal, försök igen"];		
		}
		}
		// Returnera exempelvis: 
		// [true, "Grattis du vann! Det hemliga talet var X och du behövde Y gissningar för att hitta det."]
		// [false, "Det hemliga talet är högre!"]
		// [false, "Det hemliga talet är lägre!"]
		// [false, "Talet är utanför intervallet 0 - 100"]		
	};
	
	// ------------------------------------------------------------------------------



	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // Läser in talet från textrutan och skickar till funktionen "guess"
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};