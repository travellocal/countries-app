import { fetchApi } from "."

// https://restcountries.com/
const API_ROOT = "https://restcountries.com/v3.1"


export interface Country {
  id: number;
  name: {
    common: string,
    official: string,
  };
  continents: string[],
  flags: {
    png: string;
  }
}

export const getCountries = async () => {
  const response = await fetchApi<Country[]>(API_ROOT + "/all");
  return response ?? [];
};
