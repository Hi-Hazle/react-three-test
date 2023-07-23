export function createCubeGrid() {
   const grid = []
   const cubeSize = 1.5

   for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 5; y++) {
         for (let z = 0; z < 5; z++) {
            const position = [-3 + x * cubeSize, -3 + y * cubeSize, -3 + z * cubeSize]
            grid.push({ position })
         }
      }
   }
   return grid
}
