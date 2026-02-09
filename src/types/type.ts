export interface Area {
  id: string;
  name: string;
}

export interface BigDataCloudResponse {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  localityInfo?: {
    administrative?: {
      adminLevel: number;
      name: string;
    }[];
    informative?: {
      name: string;
    }[];
  };
}

export interface NominatimResult {
  lat: string;
  lon: string;
}

export interface BigDataCloudLocation {
  location: {
    latitude: number;
    longitude: number;
  };
}
