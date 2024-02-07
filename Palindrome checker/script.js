const result = document.getElementById('result');
const input = document.getElementById('text-input');
const button = document.getElementById('check-btn');

const formatString = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

const isValidInput = (str) => {
    return formatString(str).length === 0 ?false:true;
}

const isPalindrome = (str) => {
    let cleanedString = formatString(str);
    let reversedString = cleanedString.split('').reverse().join('');
    return cleanedString === reversedString;
}

const displayResult = () => {
    if(!isValidInput(input.value)) {
        alert("Please input a value");
        return;
    }
    if(isPalindrome(input.value)){
        result.textContent  = `${input.value} is a palindrome.`;
    }
    else{
        result.textContent  = `${input.value} is not a palindrome.`;
    }
}

button.addEventListener("click", displayResult);