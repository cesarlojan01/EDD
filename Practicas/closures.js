function crearContador() {
  let cuenta = 0;

  return function () {
    cuenta++;
    return cuenta;
  };
}

const contador = crearContador();

console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador());