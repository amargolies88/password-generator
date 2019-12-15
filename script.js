var generatePasswordButton = document.querySelector("#generatePassword");
var copyPasswordButton = document.querySelector("#copyPassword");

var includeLowercase = document.querySelector("#includeLowercase");
var includeUppercase = document.querySelector("#includeUppercase");
var includeNumeric = document.querySelector("#includeNumeric");
var includeSpecial = document.querySelector("#includeSpecial");

var passwordLengthSlider = document.querySelector("#passwordLengthSlider");
var passwordLength = passwordLengthSlider.value;

var passwordLengthTextArea = document.querySelector("#passwordLengthTextArea");

var passwordTextArea = document.querySelector("#password");

var characterList = {
    lowerCase: Array.from("abcdefghijklmnopqrstuvwxyz"),
    upperCase: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    numeric: Array.from("0123456789"),
    specialCase: Array.from(` !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`)
}


passwordLengthSlider.oninput = function() {
    passwordLengthTextArea.innerHTML = this.value;
}

// console.log(characterList.specialCase);
// console.log(Array.from(characterList.lowerCase));
// console.log(Array.from(characterList.specialCase));
// console.log(Array.from(characterList.upperCase));



function genRandInt(min, max){
    return Math.floor( Math.random() * ( ( max - min ) + 1 ) ) + min
}

function generatePassword(){
    var charOptions = [];
    var newPassword = "";
    var newChar = "";

    if (!includeLowercase.checked && 
        !includeUppercase.checked &&
        !includeNumeric.checked &&
        !includeSpecial.checked){
            alert("At least 1 checkbox must be selected");
        } else {
            if (includeLowercase.checked){
                charOptions = charOptions.concat(characterList.lowerCase);
            }
            if (includeUppercase.checked){
                charOptions = charOptions.concat(characterList.upperCase);
            }
            if (includeNumeric.checked){
                charOptions = charOptions.concat(characterList.numeric);
            }
            if (includeSpecial.checked){
                charOptions = charOptions.concat(characterList.specialCase);
            }

            for (let i = 0; i < passwordLengthSlider.value; i++){
                newChar = charOptions[genRandInt(0,charOptions.length - 1)];
                console.log(newChar);
                newPassword = newPassword + newChar;
            }
        }
    passwordTextArea.textContent = newPassword;
}

function copyPassword(){
    passwordTextArea.select();
    passwordTextArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
}