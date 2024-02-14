const convertDecimalToRoman = ()=>{

    const outputDiv = document.getElementById('output');
    const arabicNumerals = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    var input = document.getElementById('number').value;
    var output = "";
    var multiplier;

    if(!input){
        alert("Please enter a valid number");
        output = "Please enter a valid number";
        outputDiv.innerText = output;
        return;
    }
    if(input<=0){
        alert("Please enter a number greater than or equal to 1");
        output = "Please enter a number greater than or equal to 1";
        outputDiv.innerText = output;
        return;
    }
    if(input>=4000){
        alert("Please enter a number less than or equal to 3999");
        output = "Please enter a number less than or equal to 3999";
        outputDiv.innerText = output;
        return;
    }

    arabicNumerals.forEach((arabicNumeral)=>{
        multiplier = Math.floor(input/arabicNumeral[0]);
        output+=arabicNumeral[1].repeat(multiplier);
        input-= multiplier*arabicNumeral[0];
    });

    outputDiv.innerText = output;
}