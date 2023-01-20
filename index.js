const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const markdownSections = [];

const userSectionChoice = () => {
    console.log(`This is a dynamic README.md file generator. Users however may want not want some of the opptional 
                sections so these could bbe removed. Please select the optional sections you would like to add to the README.md: `)
    inquirer.createPromptModule([
        {
            type: 'checkbox',
            message: 'What optional sections would you like to add?',
            name: '',
            values:["Table of Content","Recommended Modules", "Troubleshooting & FAQ"]
        },
    ]).then((response)=>{
        markdownSections.push("Project Name")
        markdownSections.push("Introduction")
        if ("Table of Content" in Object.values(response)){
            markdownSections.push("Table of Content")
        }
        markdownSections.push("Requirements")
        if ("Recommended Modules" in Object.values(response)){
            markdownSections.push("Recommended Modules")
        }
        markdownSections.push("Installation")
        markdownSections.push("Configuration")
        if ("Troubleshooting & FAQ" in Object.values(response)){
            markdownSections.push("Troubleshooting & FAQ")
        }
        console.log("User sections compiled!")
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
