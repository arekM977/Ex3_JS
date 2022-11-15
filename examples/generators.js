'use strict';
/**
 * Specjalnym typem funkcji są generatory zwracające obiekty typy iterable.
 * Obiekty te posiadają metody: next(), return() i throw().
 */
function *evenNumbers(){
    let num = 2;
    while(true){
        yield num;
        num += 2;
    }
}
/**
 * Przykład wykorzystania iteratora w instrukcji for ... of
 */
let evenNumbersIterator = evenNumbers();
for(let n of evenNumbersIterator){
    console.log(n);
    if (n > 100){
        break;
    }
}
/**
 * Przykład wykorzystania metod iteratora
 */
let iterator1 = evenNumbers();
console.log(iterator1.next().value);   //pierwsza liczba
console.log(iterator1.next().value);   //druga
console.log(iterator1.next().value);   //trzecia
iterator1.return();                    //zakończenie działania iteratora
console.log(iterator1.next());         //wartość zwracana to undefined, iterator po wywołaniu return kończy działanie 
/**
 * Iterator w klasycznej pętli for 
 */
let iterator = evenNumbers();
for (let item = iterator.next(); item.done == false && item.value < 10; item = iterator.next()){
    console.log(item);
}
/**
 * Iterowanie po właściwościach obiektu
 */
let car = {
    model: "A4",
    brand: "BMW",
    power: 160
}
for(let property in car){
    console.log(property);
}