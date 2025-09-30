let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15

//El método arr.reduceRight realiza lo mismo, pero va de derecha a izquierda.