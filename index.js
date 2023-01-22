const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const inquirerV2 = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const console = require("console");

// compile all user relevant sections
const markdownSections = [];

// array of questions for user
let questions = [];

// object of user answers
let userAnswers;

const getLicenseBadge = (license) =>{
    switch(license){
        case "MIT": return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
        case "Apache": return `![![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
        case "GNU": return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
        case "ISC": return `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`
        default: return "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)"
    }
}

// this function expression gives the user the option of choosing which
// optional sections to add to the file
const userSectionChoice = async() => {
    console.log(`This is a dynamic README.md file generator. Users however may want not want some of the optional sections so these could be removed. Please select the optional sections you would like to add to the README.md: `)
    // First phase of inquiry
    await inquirer.prompt([
        {
            type: 'checkbox',
            message: 'What optional sections would you like to add?',
            name: 'optionals',
            choices:["TOC","recommendedModules", "FAQs", "License"]
        },
    ]).then((response)=>{
        //console.log(response)
        // Compile list of all compulsory and user-picked optional headings in order 
        // 1
        markdownSections.push("Project Name")
        // 2
        if (response.optionals.includes("License")){
            markdownSections.push("License")
        }
        // 3
        markdownSections.push("Introduction")
        // 4
        if (response.optionals.includes("TOC")){
            markdownSections.push("Table of Content")
        }
        // 5
        markdownSections.push("Requirements")
        // 6
        if (response.optionals.includes("recommendedModules")){
            markdownSections.push("Recommended Modules")
        }
        // 7
        markdownSections.push("Installation")
        // 8
        markdownSections.push("Configuration")
        // 9
        if (response.optionals.includes("FAQs")){
            markdownSections.push("Troubleshooting & FAQs")
        }
        //console.log("User sections compiled: ", markdownSections);
        return markdownSections;
    }).then((responseVer2)=>{
        console.log('Now, populate the necesary sections with desired repo info...');
        questions = populateQuestions(responseVer2);
        //console.log(questions);
    })

    // Second phase of inquiry
    userAnswers = await inquirer.prompt(questions)

    // third
    await writeToFile('meowy', [markdownSections,userAnswers])

    // return answers
    //console.log(userAnswers)
}


const populateQuestions = (...array) =>{
    const questions = [];
    for (let i=0; i<array[0].length; i++){
        let sections = array[0][i]
        if (sections==="License"){
            questions.push({
                type: "list",
                message: `What Is Your Preferred ${sections}?`,
                name: `${sections}`,
                choices: ["MIT", "Apache", "GNU", "ISC"]
            })
        }
        else {
                questions.push({
                    type: "input",
                    message: `Type In Your ${sections}...`,
                    name: `${sections}`
                })
            }
    }
    return questions;
}


// function to write README file
const writeToFile = async (fileName, [sectionNames, data]) => {
    let compiledREADME = "";
    console.log(sectionNames, data, sectionNames.length)
    for (let i=0; i<sectionNames.length; i++){
        compiledREADME += `**${sectionNames[i]}**
                        ${data[sectionNames[i]]}
                        
                        `
    }
    console.log("all done: ", compiledREADME)
}

// function to initialize program
function init() {
    userSectionChoice();
}

// function call to initialize program
init();
