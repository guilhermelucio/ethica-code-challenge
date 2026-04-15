export type PrivacyDeclaration = {
  name: string;
  data_categories: string[];
  data_subjects: string[];
  data_use: string;
};

export type DataMap = {
  name: string;
  description: string;
  fides_key: string;
  system_dependencies: string[];
  system_type: string;
  privacy_declarations: PrivacyDeclaration[];
};

export type DataMaps = DataMap[];

export type SystemType = {
  id: string;
  name: string;
  theme: string;
};

export type SystemTypes = SystemType[];

export type DBData = {
  system_types: SystemTypes;
  data_maps: DataMaps;
};

export type APIListOutput<T> = {
  total: number;
  hasNext: boolean;
  data: T;
  cursor: string;
  size: number;
};

export type APIGenericOutput<T> = {
  data: T;
};

export type APIMutationOutput<T> = {
  prevItem: T | null;
  currItem: T | null;
};
