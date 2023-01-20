const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const markdownSections = [];

const getLicenseBadge = (license) =>{
    switch(license){
        case "MIT": return `![MIT License](link-to-badge)`
        case "Apache": return `![Apache License](link-to-badge)`
        case "GNU": return `![GNU License](link-to-badge)`
        case "MIT": return `![MIT](link-to-badge)`
        default: "No License"
    }
}

// this function expression gives the user the option of choosing which
// optional sections to add to the file
const userSectionChoice = () => {
    console.log(`This is a dynamic README.md file generator. Users however may want not want some of the optional sections so these could be removed. Please select the optional sections you would like to add to the README.md: `)
    inquirer.prompt([
        {
            type: 'checkbox',
            message: 'What optional sections would you like to add?',
            name: 'optionals',
            choices:["Table of Content","Recommended Modules", "Troubleshooting & FAQ", "License"]
        },
    ]).then((response)=>{
        //console.log(response)
        // Compile list of all compulsory and user-picked optional headings in order 
        markdownSections.push("Project Name")
        if (response.optionals.includes("License")){
            markdownSections.push("License")
        }
        markdownSections.push("Introduction")
        if (response.optionals.includes("Table of Content")){
            markdownSections.push("Table of Content")
        }
        markdownSections.push("Requirements")
        if (response.optionals.includes("Recommended Modules")){
            markdownSections.push("Recommended Modules")
        }
        markdownSections.push("Installation")
        markdownSections.push("Configuration")
        if (response.optionals.includes("Troubleshooting & FAQ")){
            markdownSections.push("Troubleshooting & FAQ")
        }
        console.log("User sections compiled: ", markdownSections)
    })
}

userSectionChoice()

// array of questions for user
const questions = [

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {

}

// function call to initialize program
init();
