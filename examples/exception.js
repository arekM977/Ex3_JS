/**
 * Wyjątek pojawia się w sytuacji, gdy wykonywany kod zawiera błąd np. odwołanie do nieistniejącej metody obiektu.
 */
let obj = {
    width: 12,
    height: 18
};
// console.log(obj.widthh(5));
/**
 * Zgłoszenie wyjątku powoduje zatrzymanie wykonywania skryptu.
 * Fragment kodu, który generuje błąd skutkujący zgłoszeniem wyjątku, można objąc blokiem try.
 * Jego zadaniem jest przechwycenie wyjątku, aby w bloku catch wykonać własny kod obsługi wyjątku.
 * Przechwycenie wyjątku powoduje, że skrypt może być dalej wykonywany (chyba, że w catch zostanie zgłoszony nowy wyjątek).  
 */
try{
    console.log(obj.widthh(5));
} catch(e){
    console.log("Error!!!")
}
/**
 * Opcjnalnie można także dodać klauzulę finally, która wykonuje swój kod zawsze, bez względu na to, czy błąd zostanie zgłoszony czy nie.
 * Rolą tej klauzuli jest wykonywanie pewnych operacji związamych najcześciej z zasobami, na których wykonywane były operacje w bloku try.
 * Przykładem może być zamknięcie pliku lub urządzenia, na którym były wykonywane działania. 
 */
try {
    console.log(obj.widthh(5));
} catch (e) {
    console.log("Error!!!")
} finally{
    console.log("Execution in finally block.");
}
/**
 * W funkcjach można zgłaszać wyjątki w sytuacjach, gdy np. nie można określić sensownej wartości zwracanej lub
 * brak kluczowego argumentu uniemożliwia wykonanie funkcji.
 */
function sendEmail(to, from, subject){
    if (!to){
        throw new Error("Cant send! Field <to> is empty or absent");
    }
}
sendEmail();
