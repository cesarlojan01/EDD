const fs = require('fs/promises')
const path = require("path")
const readline = require("readline/promises")

const archivo = path.join(__dirname, "usuarios.json")

async function existe(path){
  try{
    await fs.access(path)
    return true
  }catch{
    return false
  }

}


async function main(){
  const rl = readline.createInterface({input: process.stdin, output: process.stdout})
  const nombre= await rl.question("Nombre: ")
  const correo = await rl.question("Correo: ")
  rl.close()

  const usuario = {nombre, correo, fecha: new Date().toISOString() }

  let usuarios = []
  let tLectura = null // ms que tardó la lectura (solo si el archivo ya existía)
  if(await existe(archivo)){
    try{
      const inicioLectura = performance.now()
      usuarios = JSON.parse(await fs.readFile(archivo, "utf8"))
      tLectura = performance.now() - inicioLectura

    }catch{
      console.log("El archivo no es un json")
      return
    }
    console.log("Archivo existente\nSe agregara un nuevo usuario")
  }else{
    console.log("Archivo creado")
  }

  usuarios.push(usuario)

  const inicioEscritura = performance.now()
  await fs.writeFile(archivo, JSON.stringify(usuarios, null, 2))
  const tEscritura = performance.now() - inicioEscritura
  const { size } = await fs.stat(archivo)

  console.log(`Guardado\nUsuarios en el archivo: ${usuarios.length}`)
  console.log(`Lectura: ${tLectura === null ? "no aplica (archivo nuevo)" : tLectura.toFixed(2) + " ms"}`)
  console.log(`Escritura: ${tEscritura.toFixed(2)} ms`)
  console.log(`Tamaño: ${(size / 1024).toFixed(2)} KB`)
}

main()