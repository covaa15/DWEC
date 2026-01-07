const jugadores = [
    { nombre: "Erik", puntos: 450 },
    { nombre: "Valeria", puntos: 980 },
    { nombre: "Matias", puntos: 120 },
    { nombre: "Sandra", puntos: 750 }
];

console.log('\n--Ejercicio C2--');

const jugadoresOrdenados = jugadores.sort((a, b) => b.puntos - a.puntos);
console.table(jugadoresOrdenados);