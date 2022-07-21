function simple(count){
    if (count === 0){
        return [];
    }
    let number = 2
    let simples = [number]
    while (simples.length < count) {
        number++;
        check = true;
        for (let i = 0; i<=simples.length; i++){
            if (number % simples[i] === 0){
                check = false;
                break;
            }
        }
        if (check){
            simples.push(number);
        }        
    }
    return simples
}


let enteredNumber = process.argv[2];
if (! enteredNumber) {
    console.log("Вы не чего не ввели."); 
} else if (isNaN(enteredNumber)) {
    console.log("Вы ввели не число.");
} else {
    console.log(simple(enteredNumber));
}
