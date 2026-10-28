const crearId = (aleatorio) => `id-${Math.floor(aleatorio() * 1000)}`
crearId(Math.random)
crearId(() => 0.5)  