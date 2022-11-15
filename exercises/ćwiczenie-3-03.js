/**
 * Zdefiniuj funkcję, która zgłasza wyjątek, jeśli argument nie jest oczekiwanym obiektem.
 * Funkcja powinna akceptować tylko obiekty o właściwościach:
 *  amount
 *  sourceAccount
 *  targetAccount
 * Brak której z właściwości powinien zgłosić wyjątek z komunikatem wg wzoru: 
 * 'Impossible to complete the transaction. Absent property <propert-name> in transaction!'
 * W przypadku braku kilku właściwości wyjątek powinien być zgłoszony dla pierwszej brakującej z listy. 
 * W przypadku `amount` ujemnego należy także zgłosić wyjątek z komunikatem:
 * 'Impossible to complete the transaction. Amount is negative!'  
 */

function makeTransaction(transaction)
{
    try
    {
        const object = 
        {
            amount : transaction.amount,
            sourceAccount : transaction.sourceAccount,
            targetAccount : transaction.targetAccount
        }
        
        let absentProperty = []

        // szukanie nazwy właściwości w obiekcie, która nie ma wartości
        for (const name in object)  //dla każdej nazwy właściwości w obiekcie
        {
            if(object[name] == null)    // null == undefined  ---> true
            {
                absentProperty.push(name)
                
                console.log(`Absent property ${absentProperty[0]}`)
                throw new Error (`Impossible to complete the transaction. Absent property ${absentProperty[0]} in transaction!`)
            }
        }

        if (object.amount < 0)
        {
            throw new Error('Impossible to complete the transaction. Amount is negative!')
        }
    }
    catch (error) 
    {
        throw error
    }
}




try {
    makeTransaction({amount: 20, sourceAccount: "1224", targetAccount: "2345"});
    console.log("Test 31 passed.");
} catch(e){
    console.log("Test 31 failed.")
}
try {
    makeTransaction({ amount: 20, sourceAccounts: "1224", targetAccount: "2345" });
    console.log("Test 31 failed.");
} catch (e) {
    if (e.message === 'Impossible to complete the transaction. Absent property sourceAccount in transaction!') {
        console.log("Test 31 passed.")
    } else {
        console.log("Test 31 failed.")
    }
}

try {
    makeTransaction({ amount: -20, sourceAccount: "1224", targetAccount: "2345" });
    console.log("Test 31 failed.");
} catch (e) {
    if (e.message === 'Impossible to complete the transaction. Amount is negative!') {
        console.log("Test 31 passed.")
    } else {
        console.log("Test 31 failed.")
    }
}