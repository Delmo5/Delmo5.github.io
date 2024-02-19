const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const phoneNumberInput = document.getElementById('user-input');
const result = document.getElementById('results-div');

const checkUserInput = () => {

    const phoneNumber = phoneNumberInput.value;

    if (!phoneNumber) {
        alert('Please provide a phone number');
        return;
    }

    if (isValidPhoneNumber(phoneNumber)) {
        result.innerText = `Valid US number: ${phoneNumber}`;
    } else {
        result.innerText = `Invalid US number: ${phoneNumber}`;
    }
};

function isValidPhoneNumber(phoneNumber) {
    
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    

    if (!regex.test(phoneNumber)) {
        return false;
    }

    return true;
}

const clearInput = () => {
    phoneNumberInput.value = '';
    result.innerText = '';
}

clearBtn.addEventListener('click', clearInput);

checkBtn.addEventListener('click', checkUserInput);

phoneNumberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      checkUserInput();
    }
  });