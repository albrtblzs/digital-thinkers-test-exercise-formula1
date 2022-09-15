export interface Driver {
  id: number,
  code: string,
  firstname: string,
  lastname: string,
  country: string,
  team: string,
  imageUrl: string,
  place: number,
}

export interface DriverFromJSON {
  id: number,
  code: string,
  firstname: string,
  lastname: string,
  country: string,
  team: string,
}