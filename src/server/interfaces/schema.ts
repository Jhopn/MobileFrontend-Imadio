export enum Theme {
  STANDARD = 'STANDARD',
  GOLDEN_EVENING = 'GOLDEN_EVENING',
  STAINLESS_STEEL_CYANO = 'STAINLESS_STEEL_CYANO',
  CARAMEL_ORANGE = 'CARAMEL_ORANGE'
}

export interface UpdateSettings{
    theme: Theme,
    fontSize: string
}