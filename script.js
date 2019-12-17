var password = "";
var showPassword = true;

var hideButton = document.getElementById("hide-button");

var generatePasswordButton = document.getElementById("generatePassword");
var copyPasswordButton = document.getElementById("copyPassword");

var includeLowercase = document.getElementById("includeLowercase");
var includeUppercase = document.getElementById("includeUppercase");
var includeNumeric = document.getElementById("includeNumeric");
var includeSpecial = document.getElementById("includeSpecial");

var passwordLengthSlider = document.getElementById("passwordLengthSlider");
var passwordLengthTextArea = document.getElementById("passwordLengthTextArea");

var passwordLength = 8;

var passwordTextArea = document.getElementById("password");

var secretPasswordTextArea = document.getElementById("secretTextArea")

var characterList = {
    lowerCase: Array.from("abcdefghijklmnopqrstuvwxyz"),
    upperCase: Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    numeric: Array.from("0123456789"),
    specialCase: Array.from(` !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`)
};

function genRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generatePassword = function () {
    function checkInclusions(stringToCheck) {
        let containsLowercase = false;
        let containsUppercase = false;
        let containsNumeric = false;
        let containsSpecial = false;
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
        copyPasswordButton.disabled = true;
        passwordTextArea.textContent = "Select at least 1 character type.";
    } else {
        let charOptions = [];
        let newPassword = "";
        let newChar = "";
        // Build character array from character lists specified by user
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

        // Build password
        for (let i = 0; i < passwordLength; i++) {
            //Choose a random character using random index value
            newChar = charOptions[genRandInt(0, charOptions.length - 1)];
            //Add character to password string
            newPassword = newPassword + newChar;
        }
        // If new password meets requirements set by user
        if (checkInclusions(newPassword)) {
            console.log(`The new generated password ${newPassword} contains all required characters.`)
            // Update global password variable
            password = newPassword;
            // Displays password as censored or visable and adds password to #secretTextArea
            displayPassword();
            // Enable the Copy Password button
            copyPasswordButton.disabled = false;
            // If new password does not meet requirements set by user
        } else {
            console.log(`Password ${newPassword} is missing a required character, re-making...`);
            // Generate a new password
            generatePassword();
        }
    }
}
// Copy password
function copyPassword() {
    // Select the text in TextArea
    secretPasswordTextArea.select();
    secretPasswordTextArea.setSelectionRange(0, 99999); // For mobile devices
    // Copy whatever is selected
    document.execCommand("copy");
}

function updateLengthSlider() {
    passwordLength = passwordLengthSlider.value;
    passwordLengthTextArea.value = passwordLength;

}

function updateLengthTextArea() {
    passwordLength = passwordLengthTextArea.value;
    passwordLengthSlider.value = passwordLength;
}

function verifyNumberInput() {
    if (passwordLengthTextArea.value < 8){
        passwordLengthTextArea.value = 8;
        updateLengthTextArea();
    }
    if (passwordLengthTextArea.value > 128){
        passwordLengthTextArea.value = 128;
        updateLengthTextArea();
    }
}

function censorText(visibleText){
    let hiddenText = "";
    for (let i = 0; i < visibleText.length; i++){
        hiddenText = hiddenText + "*";
    }
    return hiddenText;
}

function displayPassword() {
    secretPasswordTextArea.textContent = password;
    if (showPassword) {
        passwordTextArea.textContent = password;
    } else {
        passwordTextArea.textContent = censorText(password);
    }
}

function hideSwitch() {
    showPassword = !showPassword;
    displayPassword();
    decorateHideSwitch();
}

function decorateHideSwitch() {
    if (showPassword){
        hideButton.className = "btn btn-light";
        hideButton.textContent = "Hide";
    } else {
        hideButton.className = "btn btn-dark";
        hideButton.textContent = "Show";
    }

}
// passwordLengthSlider.addEventListener(event, function, useCapture);