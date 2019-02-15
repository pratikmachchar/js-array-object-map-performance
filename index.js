#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const _ = require("lodash")

const init = () => {
    console.log(
      chalk.green(
        figlet.textSync("Arr OBJ  MAP", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
  }
//get input from pormpt
  const askQuestions = () => {
    const questions = [
      {
        name: "DEFINEDSIZE",
        type: "input",
        message: "Define size of array, big is good fo comparision minimum 10000 recomended"
      },
      {
        name: "TOTALITERATION",
        type: "input",
        message: "To get Average time how many time you want to run an operation?"
      },
    ];
    return inquirer.prompt(questions);
  };
//calling main
const run = async () => {
    // show script introduction
    init();
    // ask questions
    const answers = await askQuestions();
    const { DEFINEDSIZE,TOTALITERATION} = answers;
    // create the type of objects and compare the find speed.
    var before = process.hrtime();
    var typeArray = await generateArray(DEFINEDSIZE);//generate the ArrayType
    var typeObject = _.zipObject(typeArray,typeArray); //Objects does not allow duplicate key values, old values are overwritten by the new values.
    var typeMap =  new Map(Object.entries(typeObject));; // Maps also does not allow duplicate keys during the creation.
    var resultTime ={};


    for(let ii=0;ii<TOTALITERATION;ii++)
    {
      //get a random key from the array to use it as find criteria
      searchKey = typeArray[Math.floor(Math.random() * typeArray.length)];
      //let's calculate find cost
      var before = process.hrtime();
      var findResult = typeArray.indexOf(searchKey);//find Array
      resultTime = addTwoObjects(resultTime,{"Find--->Array": getTimeDiffrence(before)});
      
      before = process.hrtime();
      findResult = typeObject[searchKey]; //find Object
      resultTime = addTwoObjects(resultTime,{"Find--->Object": getTimeDiffrence(before)});

      before = process.hrtime();
      findResult = typeMap.get(searchKey); //find Map
      resultTime = addTwoObjects(resultTime,{"Find--->Map  ": getTimeDiffrence(before)});


      //TO DO calculate delete cost
      searchKey = typeArray[Math.floor(Math.random() * typeArray.length)];
      before = process.hrtime();
      delete typeArray[searchKey]; //Delete Array
      resultTime = addTwoObjects(resultTime,{"Delete->Array": getTimeDiffrence(before)});

      before= process.hrtime();
      delete typeObject.searchKey; //Delete Object
      resultTime = addTwoObjects(resultTime,{"Delete->Object": getTimeDiffrence(before)});

      before = process.hrtime();
      typeMap.delete(searchKey); //Delete Map
      resultTime = addTwoObjects(resultTime,{"Delete->Map  ": getTimeDiffrence(before)});

    //calculate insert cost
      var newkey = generateQuickGuid();
      before = process.hrtime();
      typeArray.push(newkey); //Insert Array
      resultTime = addTwoObjects(resultTime,{"Insert->Array": getTimeDiffrence(before)});

      before = process.hrtime();
      typeObject.newkey = newkey; //Insert Object 
      resultTime = addTwoObjects(resultTime,{"Insert->Object": getTimeDiffrence(before)});

      before = process.hrtime();
      typeMap.set(newkey, newkey); //Insert Map
      resultTime = addTwoObjects(resultTime,{"Insert->Map  ": getTimeDiffrence(before)});
    }

    //now divide all values by the count to get average time
    resultTime = _.transform(resultTime, function(result, value, key) {
      result[key] = value / TOTALITERATION;
      return result;
    });
    console.table(resultTime);
};


run()


// library functions used

//create elementory array
 async function generateArray(DEFINEDSIZE){
  let outputArrya=[];
  for (var i = 0; i < DEFINEDSIZE; i++) {
      outputArrya.push(generateQuickGuid());
  }
  return outputArrya;
}
//get time diffrence in high resolution
function getTimeDiffrence(time) {
    function roundTo(decimalPlaces, numberToRound) {
      return +(Math.round(numberToRound + `e+${decimalPlaces}`)  + `e-${decimalPlaces}`);
    }
    const diff = process.hrtime(time);
    const NS_PER_SEC = 1e9;
    const result = (diff[0] * NS_PER_SEC + diff[1]); // Result in Nanoseconds
    const elapsed = result * 0.0000010;
    return roundTo(6, elapsed); // Result in milliseconds
  }

// generate GUID
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

//Add values of two objects in Javascript Only one level depth
function addTwoObjects( obj1,obj2){
  var obj ={}
//First add all object 1 to the relevant object2
  Object.keys(obj1).map(function(a){
    obj[a] = 
    (typeof obj1[a] !== typeof undefined ? obj1[a] : 0 )
      +
    (typeof obj2[a] !== typeof undefined ? obj2[a] : 0 );
  })
  //Now add  object 2 items not in Object1  to the output
  Object.keys(obj2).map(function(a){
    if(!obj1.hasOwnProperty(a)){ //not in object1
      obj[a] = 
      (typeof obj1[a] !== typeof undefined ? obj1[a] : 0 )
        +
      (typeof obj2[a] !== typeof undefined ? obj2[a] : 0 );
    }
  })
  //console.log(" obj "+JSON.stringify(obj)+" obj1 "+JSON.stringify(obj1)+" obj2 "+JSON.stringify(obj2));
  return obj;
}