var includeLowercase = document.querySelector("#includeLowercase");
var includeUppercase = document.querySelector("#includeUppercase");
var includeNumeric = document.querySelector("#includeNumeric");
var includeSpecial = document.querySelector("#includeSpecial");

var passwordLengthSlider = document.querySelector("#passwordLengthSlider");

var passwordLengthTextArea = document.querySelector("#passwordLengthTextArea");

passwordLengthSlider.oninput = function() {
    passwordLengthTextArea.innerHTML = this.value;
}

passwordLengthTextArea.oninput = function() {
    passwordLengthSlider.value = this.innerHTML;
}