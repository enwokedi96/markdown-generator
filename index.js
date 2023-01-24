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
            choices:["TOC","Contributing", "Test", "FAQs", "License"]
        },
    ]).then((response)=>{
        //console.log(response)
        // Compile list of all compulsory and user-picked optional headings in order 
        // 1
        markdownSections.push("Project Name")
        // 2
        markdownSections.push("Description")
        // 3
        if (response.optionals.includes("TOC")){
            markdownSections.push("Table of Content")
        }
        // 4
        markdownSections.push("Installation")
        // 5
        markdownSections.push("Requirements")
        // 6
        if (response.optionals.includes("License")){
            markdownSections.push("License")
        }
        // 7
        if (response.optionals.includes("Contributing")){
            markdownSections.push("Contributing")
        }
        // 8
        if (response.optionals.includes("Tests")){
            markdownSections.push("Tests")
        }
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

    // Third and final phase:  write to file
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
        else if (sections==="Table of Content"){
            continue;
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
    
    // construct contents of markdown file
    const readMeContents = generateMarkdown(sectionNames,data);
    console.log("All text compiled.... ")
    // now write text to file
    fs.writeFile(fileName+'.md', readMeContents, (err) =>
            err ? console.error(err) : console.log('All Done! Powered by Your Fav Uncle (Ruckus) Israel!')
            );
    //await console.log('');
}

// function to initialize program
function init() {
    userSectionChoice();
}

// function call to initialize program
init();
