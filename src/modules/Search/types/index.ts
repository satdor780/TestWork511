export type ISearchData = City[];

export interface City {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface LocalNames {
  ru?: string;
  el?: string;
  fr?: string;
  ja?: string;
  oc?: string;
  mk?: string;
}

export interface SearchState {
  searchQuery: string;
  results: ISearchData;
  isLoading: boolean;
  error: string | null;
  setSearchQuery: (query: string) => void;
  fetchCities: (query: string) => Promise<void>;
  clearResults: () => void;
}
