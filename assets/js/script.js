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

// Generate Password
var generatePassword = function () {
    // Function to make sure generated password has each user-specified character type
    function checkInclusions(stringToCheck) {
        let containsLowercase = false;
        let containsUppercase = false;
        let containsNumeric = false;
        let containsSpecial = false;

        //Make character array from password
        let array = stringToCheck.split("");

        //Check for lowercase character if user checked the checkbox for it
        if (includeLowercase.checked) {
            for (let i = 0; i < array.length; i++) {
                if (characterList.lowerCase.includes(array[i])) {
                    containsLowercase = true;
                }
            }
            //If no character in the password matches any character in the character list
            if (!containsLowercase) {
                //Return false which should trigger the password to be re-generated
                return false;
            }
        }
        
        //Same check for uppercase
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

        //Same check for numbers
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

        //Same check for special characters
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

    //Check to ensure user has selected at least 1 checkbox.
    if (
        !includeLowercase.checked &&
        !includeUppercase.checked &&
        !includeNumeric.checked &&
        !includeSpecial.checked
    ) {
        //If user doesn't have at least 1 checkbox checked
        //disable the copy button and notify user via main TextArea
        copyPasswordButton.disabled = true;
        passwordTextArea.textContent = "Select at least 1 character type.";
    } else {
        //Begin generating...
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

        // Build password from new char array charOptions
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
        } else {
            // If new password does not meet requirements set by user
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

//When slider is clicked, update global length value and TextArea value
function updateLengthSlider() {
    passwordLength = passwordLengthSlider.value;
    passwordLengthTextArea.value = passwordLength;

}

//When user updates password lenght TextArea input, update global length value and Slider value
function updateLengthTextArea() {
    passwordLength = passwordLengthTextArea.value;
    passwordLengthSlider.value = passwordLength;
}

//Sets length TextArea input to min or max if user inputs a number outside of that range
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

//Converts string to string of astrisks with same string length and returns that
function censorText(visibleText){
    let hiddenText = "";
    for (let i = 0; i < visibleText.length; i++){
        hiddenText = hiddenText + "*";
    }
    return hiddenText;
}

//Display the password
function displayPassword() {
    //Puts password in secret text area
    secretPasswordTextArea.textContent = password;
    //Displays password visible or censored in main password display area
    if (showPassword) {
        passwordTextArea.textContent = password;
    } else {
        passwordTextArea.textContent = censorText(password);
    }
}

//Function for Hide/Show switch
function hideSwitch() {
    //Switch showPassword global
    showPassword = !showPassword;
    //Update main password area
    displayPassword();
    //Switch hide button to show button
    decorateHideSwitch();
}

//Function to switch hide/show button back and forth
function decorateHideSwitch() {
    if (showPassword){
        hideButton.className = "btn btn-light";
        hideButton.textContent = "Hide";
    } else {
        hideButton.className = "btn btn-dark";
        hideButton.textContent = "Show";
    }

}