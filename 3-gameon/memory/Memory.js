"use strict";
var memory = {
    RandomArray:[],
    rows: 4,
    columns: 4,
    init:function()
    {
        memory.RandomArray = RandomGenerator.getPictureArray(memory.rows, memory.columns);
        console.log(memory.RandomArray)
    }
};
window.onload = memory.init;
//Kommentar så jag kan pusha