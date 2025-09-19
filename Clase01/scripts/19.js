const numero1 = 20
const numero2 = 20
// con == "20" y 20 son iguales
// con === "20" y 20 no son iguales 
// const numero2 = "20"

/*
    ==  (Comparador no estricto) solo compara el valor: num='20' == num2=20: Me va a decir que son iguales
    === (Comparador estricto) compara el valor y el tipo de dato: num='20' === num2=20: Me va a decir que no son iguales
*/
//Para hacer verificaciones mejor usar: ===

if(numero1 === numero2) {
    console.log('Si, son iguales')
} else {
    console.log('No, no son iguales')
}