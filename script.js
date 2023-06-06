var generateBtn = document.querySelector("#generate");

generateBtn.addEventListener("click", gatherData);

function gatherData() {
  var chosenCriteria = criteriaSelection();
  var acceptedCharacters = setAcceptedCharacters(chosenCriteria);
  writePassword(acceptedCharacters, chosenCriteria);
}

function criteriaSelection() {
  let chosenCriteria = {
    length: 0,
    uppercase: confirm("Would you like to include a UPPERCASE letters?"),
    lowercase: confirm("Would you like to include lowercase letters?"),
    numbers: confirm("Would you like to include numbers"),
    specials: confirm("Would you like to include special characters?"),
  };

  if (
    !chosenCriteria.uppercase &&
    !chosenCriteria.lowercase &&
    !chosenCriteria.numbers &&
    !chosenCriteria.specials
  ) {
    window.alert("Must choose at least one criteria!!!");
    return criteriaSelection();
  }

  chosenCriteria.length = getPassLength();

  return chosenCriteria;
}

function setAcceptedCharacters(chosenCriteria) {
  var lowerCharacters = "abcdefghijklmnopqrstuvwxyz";
  var upperCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numbers = "1234567890";
  var special = "!@#$%^&*+-=_?<>;:/";
  var characters = "";

  if (chosenCriteria.uppercase) {
    characters += upperCharacters;
  }
  if (chosenCriteria.lowercase) {
    characters += lowerCharacters;
  }
  if (chosenCriteria.numbers) {
    characters += numbers;
  }
  if (chosenCriteria.specials) {
    characters += special;
  }

  return characters;
}

function getPassLength() {
  var passLength = window.prompt(
    "What is the desired length?",
    "Input number between 8 and 128."
  );

  // checks if inputed value is a number
  if (isNaN(Number(passLength))) {
    window.alert("Please input a number!!!");
    return getPassLength();
  }

  // Checks for proper password length
  if (passLength < 8 || passLength > 128) {
    window.alert(
      "Please choose a password length between 8 and 128 characters!!!"
    );
    return getPassLength();
  }

  return Number(passLength);
}

function writePassword(acceptedCharacters, chosenCriteria) {
  var password = generatePassword(acceptedCharacters, chosenCriteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword(acceptedCharacters, chosenCriteria) {
  var finalPassword = "";

  for (let index = 0; index < chosenCriteria.length; index++) {
    let randomCharacter = Math.floor(Math.random() * acceptedCharacters.length);
    finalPassword += acceptedCharacters[randomCharacter];
  }

  return finalPassword;
}
