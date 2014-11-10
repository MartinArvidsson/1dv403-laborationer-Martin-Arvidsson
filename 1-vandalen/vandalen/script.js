"use strict";

var makePerson = function(persArr){
    
    var minAge;             // variabel för lägsta åldern
    var maxAge;             // variabel för högsta åldern
    var averageAge;         // variabel för medelåldern
    var names ="";          // strängvariabel för namnen
    var namesArray = [];    // Array för namnen
    var agesArray = [];     // Array för åldrarna
    var results = {};       // variabel för resultaten
    
    for (var i=0;i<persArr.length; i += 1) //så länge som innehållet i "persArr" är längre/större än 0 skriv ut innehhållet (namn)
    {
        namesArray[i] = persArr[i]['name']; // namesArray får värdet persArr hade
    }
    
    for(var i=0;i<persArr.length; i+= 1) //Samma som ovan fast med ålder.
    {
        agesArray[i] =persArr[i]['age'];
    }
    
    namesArray.sort(function (a,b) {return a.localeCompare (b, 'sv');}); // jämför a mot b, http://www.w3schools.com/jsref/jsref_localecompare.asp , jämför 2 lokala strängar mot varandra.
    names = namesArray.toString();  // retunerar namesarrays värde till names
    names = names.split(",").join(", "); // Delar names beroende på "," ", "
    
    agesArray.sort(); // Sorterar
    
    maxAge = Math.max.apply(Math, agesArray); //tar den högsta åldern ur agesArray och anger värdet till maxAge
    minAge = Math.min.apply(Math, agesArray); // tar den minsta åldern ur agesArray och anger värdet till minAge
    
    averageAge = agesArray.reduce(function (a,b) { return a + b}); //Sätter averageAge till 
    averageAge = averageAge / agesArray.length; //Sätter averageAge till  
    
    results = {minAge: minAge, maxAge: maxAge, averageAge: Math.round(averageAge), names: names};
    return results;
}
var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}]; //Tog exemplet från "https://coursepress.lnu.se/kurs/webbteknik-i/laborationer/l01-vandalen/" 
var results = makePerson(data); //initierar makePerson 
console.log(results); //Skriver ut resultatet.

