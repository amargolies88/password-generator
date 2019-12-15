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
};

passwordLengthSlider.oninput = function () {
    passwordLengthTextArea.textContent = this.value;
};



function genRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generatePassword = function () {
    let charOptions = [];
    let newPassword = "";
    let newChar = "";

    let containsLowercase = false;
    let containsUppercase = false;
    let containsNumeric = false;
    let containsSpecial = false;

    function checkInclusions(stringToCheck) {
        let array = stringToCheck.split("");
        if (includeLowercase.checked) {
            for (let i = 0; i < array.length; i++) {
                if (characterList.lowerCase.includes(array[i])) {
                    containsLowercase = true;
                }
            }
            if (!containsLowercase) {
                return false;
            }
        }

        if (includeUppercase.checked) {
            for (let i = 0; i < array.length; i++) {
                if (characterList.upperCase.includes(array[i])) {
                    containsUppercase = true;
                }
            }
            if (!containsUppercase) {
                return false;
            }
        }

        if (includeNumeric.checked) {
            for (let i = 0; i < array.length; i++) {
                if (characterList.numeric.includes(array[i])) {
                    containsNumeric = true;
                }
            }
            if (!containsNumeric) {
                return false;
            }
        }

        if (includeSpecial.checked) {
            for (let i = 0; i < array.length; i++) {
                if (characterList.specialCase.includes(array[i])) {
                    containsSpecial = true;
                }
            }
            if (!containsSpecial) {
                return false;
            }
        }
        return true;
    }

    if (
        !includeLowercase.checked &&
        !includeUppercase.checked &&
        !includeNumeric.checked &&
        !includeSpecial.checked
    ) {
        alert("At least 1 checkbox must be selected");
    } else {
        if (includeLowercase.checked) {
            charOptions = charOptions.concat(characterList.lowerCase);
        }
        if (includeUppercase.checked) {
            charOptions = charOptions.concat(characterList.upperCase);
        }
        if (includeNumeric.checked) {
            charOptions = charOptions.concat(characterList.numeric);
        }
        if (includeSpecial.checked) {
            charOptions = charOptions.concat(characterList.specialCase);
        }

        for (let i = 0; i < passwordLengthSlider.value; i++) {
            newChar = charOptions[genRandInt(0, charOptions.length - 1)];
            newPassword = newPassword + newChar;
        }
        if (checkInclusions(newPassword)){
            console.log(`The new generated password ${newPassword} contains all required characters`)
            passwordTextArea.textContent = newPassword;
        } else {
            console.log(`Password ${newPassword} is missing a required character, re-making...`);
            generatePassword();
        }
    }
}

function copyPassword() {
    passwordTextArea.select();
    passwordTextArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
}


//ENABLES POPPER TOOLTIPS
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});