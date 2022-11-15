/**
 * Funkcje moga byc parametrami innych funkcji.
 * Funkcje, które wywołują argumenty funkcyjne są funkcjami wyższego rzędu.
 */
let calculatorOperation = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};
function evaluateExpression(fun, a, b) {         //fun jest funkcją, którą wywołujemy wewnątrz naszej funkcji
    return fun(a, b);                            //zakładamy, że funkcja posiada dwa argumenty
}
let expression = "1.2 + 3.5";
const tokens = expression.split(" ");
let operation = calculatorOperation[tokens[1]];
let argument1 = Number(tokens[0]);
let argument2 = Number(tokens[2]);
let result = evaluateExpression(operation, argument1, argument2);
console.log(result);
/**
 * Funkcje wyższego rzędu służą do wykonywania zleconego kodu po wykonaniu jakiegoś zadania.
 * Przykładem jest funkcja generująca opóznienie, która po zadanyn interwale wywołuje inna funkcję.
 * Funkcje wywolywane jako potwierdzenie wykonania zadania noszą nazwe callback function.
 */
setTimeout(
    () => console.log("Time elapsed"),          //funkcja strzałkowa jest callback'iem
    1000
);
/**
 * Testowanie czy argument jest funkcją.
 */
function higherOrderFunction(arg1, arg2, callback) {
    if (callback instanceof Function) {

        console.log("Calling callback")
        console.log(callback(arg1, arg2));
    } else {
        console.log("Argument callback is not a function!");
    }
}
higherOrderFunction(1, 2, (a, b) => a + b);
higherOrderFunction(1, 2, "function");
/**
 * Funkcje wyższych rzędów do przetwarzania tablic są zdefiniowane w protypie Array.
 * Funkcje te przyjmują parametr typu callback.
 * Metody te aplikują przekazy callback dla każdego elementu tablicy i część z nich zwraca tzw. płytką kopię tablicy.
 * W wielu sytuacjach najwygodniej definiować callback'i jako funkcje strzałkowe. 
 * Większość funkcji callback posiada listę argumentów:
 * - bieżący element tablicy 
 * - indeks bieżącego elementu
 * - tablicę na której wykonywana jest operacja
 * Metody wyższych rzędów protypytu Array można składać ze sobą w tzw. fluet API (płynna składnia), co pozwala
 * przy pomocy jednej instrukcji wykonywać złożone zadania.
 */
let students = [
    { name: "Karol", ects: 24, studyYear: 1 },
    { name: "Ewa", ects: 40, studyYear: 2 },
    { name: "Robert", ects: 30, studyYear: 1 },
    { name: "Ania", ects: 28, studyYear: 3 },
    { name: "Adam", ects: 28, studyYear: 1 },
    { name: "Tomasz", ects: 29, studyYear: 3 },
    { name: "Krzysztof", ects: 31, studyYear: 2 },
    { name: "Julia", ects: 31, studyYear: 1 }
];
let ectsSum = students
    .filter(student => student.studyYear == 1)                    //wybór studentów pierwszego roku
    .map(student => Number(student.ects))                         //zamiana każdego studenta na jego punkty ects, map zwraca tablicę punktów
    .reduce((previous, current) => previous + current, 0);        //zredukowanie tablicy z punktami ects do ich sumy
console.log("Suma punktów ects studentów 1 roku: " + ectsSum);
/**
 * Funkcja filter wymaga podania callback'u w podstaci predykatu, który zwraca wartość logoczną.
 * Parametrem obowiązkowym callback'u jest bieżący element, a opcjonalnymi są indeks tego elemntu oraz sama tablica.
 * Poniższy przykład zwraca tablicę studetów z I roku, których imię kończy się literą 'a'.
 */
console.log(
    students.filter(
        (student, index, arr) => {
            console.log(`Current index ${index}`);
            console.log(`Current student ${JSON.stringify(arr[index])}`);
            return student.studyYear === 1 && student.name.endsWith('a');
        }
    )
    );
/**
 * Funkcja map wymaga podania callback'u, który wyznaczy nową wartość.
 * Argumentami callbak'u jest bieżący element tablici, indeks tego elementu oraz sama tablica to parametry opcjonalne. 
 * Przykład parsuje łańcuch z opisami osób (jeden wiersz - jedna osoba), Funkcja map zamienia wiersz tekstu na obiekt. 
 */
let studentsStr = "Adam\t23\nEwa\t22\nKarol\t26";
let studentObj = studentsStr.split('\n').map(line => {
    let tokens = line.split('\t');
    return {
        name: tokens[0],
        age: Number(tokens[1])
    }
});
studentObj.forEach(s => console.log(s))
/**
 * Callback metody reduce przyjmuje dwa parametry: poprzednia wartość kojarzona z akumulatorem i bieżący element tablicy.
 * Drugim parametrem reduce (po callbak) jest wartość początkowa argumentu akumulatora, jeśli go brak to początkową wartością jest pierwszy element tablicy
 * Wartość obliczona przez callback jest przypisywana do poprzedniej wartości, co jest równoznaczne z akumulowaniem
 * np dla tablicy.
 * let arr = [1, 2, 3, 4, 5];
 * poniższe wywołanie
 * let sum = arr.reduce((sum, item) => sum + item) 
 * spowoduje zdefiniowaniu akumulatora 'sum':
 * let sum = arr[0]
 * dla każdego elementu tablicy jest wykonywane wyrażenie funkcji callback
 * [sum =] sum + item
 * w nazwiasie [] podano kod wykonywany niejawnie przez reduce, a callback definiuje tylko prawą stroną (sum + item)
 * Wartośćc zwraca przez reduce to wartość akumulatora.
 */
/**
 * Przykład redukcji tablicy do iloczynu wszystkich elememntów 
 */
let arr = [1, 2, 5, 7];
console.log(`Iloczyn liczb tablicy: ${arr.reduce((acc, item) => acc * item)}`);
/**
 * Przykład redukcji wyznaczającej największy element w tablicy
 */
console.log(`Największy element: ${arr.reduce((max, item) => item > max ? item : max)}`);
/**
 * Funkcja flatMap służy do przeglądania tablic, których elementy są tablicami. Funckja ta daje możliwość usuwania zagnieżdzeń np.
 * utworzenie tablicy jednowymiarowej złożnej z wszystkich elementów podtablic. 
 */
let array2D = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
console.log(array2D.flatMap((arr1D) => arr1D));                    //`spłaszczenie` tablicy dwuwymiarowej do jednowymiarowej
console.log(array2D.flatMap((arr1D) => arr1D.join(":")));
/**
 * Funkcje 'some' i 'every' przyjmują predykat (funkcja zwracająca wartość logiczną) jako callback.
 */
console.log("Czy każdy student ma co najmniej 10 punktów ects? " + students.every(student => student.ects > 10));
console.log("Czy jest jakiś student o imieniu Robert? " + students.some(student => student.name === "Robert"));
/**
 * Metoda forEach wykonuje przekazany callback dla każdego elementu, ale nic nie zwraca.
 */
students.forEach(item => console.log(item.name));
