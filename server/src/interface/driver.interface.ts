interface DriverFormula1 {
  id: number,
  code: string,
  firstname: string,
  lastname: string,
  country: string,
  team: string,
  imageUrl: string,
  place: string,
}

interface DriverFromJSON {
  id: number,
  code: string,
  firstname: string,
  lastname: string,
  country: string,
  team: string,
}


export type Driver = DriverFormula1 | DriverFromJSON;