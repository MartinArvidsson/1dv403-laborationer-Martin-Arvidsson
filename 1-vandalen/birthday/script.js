"use strict";

window.onload = function(){

	
	var birthday = function(date){
		
		var today = new Date();
		var Birthday = new Date(date);
		var Days = 0;
		var MatchingYear = new Date();
		var day = 0;
		var month = 0;
		var year = 0;
		
		Birthday.setFullYear(today.getFullYear());
		
		Days = (Birthday.getTime() - today.getTime())/(1000*60*60*24);
		day = Birthday.getDate() - today.getDate();
		month = Birthday.getMonth() - today.getMonth();
		
		if (date === "")
		{
			throw new Error("Fel, ange din födelsedag")
		}
			if ((Birthday.getTime() - today.getTime())/(1000*60*60*24) >= -1)
			{
				if (day === 0 && month === 0)
				{
					return 0;
				}
				if (day === 1 && month === 0)
				{
					return 1;
				}
				return Days;
			}
			else
			{
				MatchingYear.setFullYear(Birthday.getFullYear()-1);
				return (Birthday.getTime() - MatchingYear.getTime())/(1000*60*60*24);
			}
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};