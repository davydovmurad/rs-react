export interface Country {
  name: { common: string };
  population: number;
  region: string;
  flag: string;
  visited: boolean;
}

export enum SortValue {
  PopulationAsc = 'PopulationAsc',
  PopulationDesc = 'PopulationDesc',
  NameAsc = 'NameAsc',
  NameDesc = 'NameDesc',
}
