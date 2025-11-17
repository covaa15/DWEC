function asyncFunction(callbackFunction) {
  // More code here
  console.log('Prior to callback');
  callbackFunction();
  console.log('After callback');
  // More code here
}
function callbackFunction() {
  console.log('Calling callback');
}
asyncFunction(callbackFunction);
// Output:
// "Prior to callback"
// "Calling callback"
// "After callback"

// !!!! Cuidado, no se puede usar con paréntesis:
// asyncFunction(callbackFunction());
// aquí se estaría invocando callbackFunction inmediatamente
// y pasando su valor de retorno (undefined) a asyncFunction
