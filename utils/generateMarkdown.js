// function to generate markdown for README
function generateMarkdown(sectionNames,data) {
    let compiledREADME = "";
    for (let i=0; i<sectionNames.length; i++){
        // specifically for project name, align with heading
        if (i===0){
            console.log(`PROJECT NAME: ${data[sectionNames[i]]}`)
            compiledREADME += `\n## **${data[sectionNames[i]]}**\n \n ${getLicenseBadge(data["License"])}\n`
        }
        // specifically for license, align with project name
        else if (sectionNames[i]==="License"){
            compiledREADME += `\n### ${sectionNames[i]} \n\nThis project is licensed under the terms of the ${data[sectionNames[i]]} license.\n\n`
        }
        // specifically for content: create unordered list of content
        else if (sectionNames[i]==="Table of Content"){
            compiledREADME += `\n### ${sectionNames[i]}\n`;
            sectionNames.forEach(element => {
                compiledREADME += `\n- ${element}\n\n`
            }); 
        }
        // specifically for questions/FAQ
        else if (sectionNames[i]==="Troubleshooting & FAQs"){
            compiledREADME += `\n### ${sectionNames[i]} \n\n${data[sectionNames[i]]}\n`;
            compiledREADME += `\n If in doubt, contact us via email on ${data["email"]}. Also don't forget to checkout our Github account ([${data["git"]}](https://github.com/${data["git"]})) for more exciting projects\n`
        }
        // All other sections: populate with a vengance!!!!
        else {
            compiledREADME += `\n### ${sectionNames[i]} \n\n${data[sectionNames[i]]}\n`
        }
    }

    console.log("all text: ", compiledREADME)

    return compiledREADME;
}

const getLicenseBadge = (license) =>{
  switch(license){
      case "MIT": return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
      case "Apache": return `![![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
      case "GNU": return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
      case "ISC": return `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`
      default: return "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)"
  }
}

module.exports = generateMarkdown;
