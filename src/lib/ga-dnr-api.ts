export interface InfrastructureFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    geometry: any;
    properties: Record<string, unknown>;
  }>;
}

export class GADNRInfrastructureAPI {
  private baseUrl = 'https://services6.arcgis.com/9QlSLDqa0P1cHLhu/arcgis/rest/services';
  private wmaService = `${this.baseUrl}/WRD_WMA_Public/FeatureServer`;

  private layers = {
    parking: 6,
    campgrounds: 7,
    boatRamps: 8,
    roads: 3,
    trails: 4,
    openings: 19
  } as const;

  private async queryLayer(layerId: number, where = '1=1'): Promise<InfrastructureFeatureCollection> {
    const params = new URLSearchParams({
      where,
      outFields: '*',
      returnGeometry: 'true',
      f: 'geojson',
      resultRecordCount: '2000'
    });

    const url = `${this.wmaService}/${layerId}/query?${params}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch layer ${layerId}: ${response.statusText}`);
    }
    return response.json();
  }

  async getParking(wmaName?: string) {
    const where = wmaName ? `PropName LIKE '%${wmaName.replace(/'/g, "''")}%'` : '1=1';
    return this.queryLayer(this.layers.parking, where);
  }

  async getCampgrounds(wmaName?: string) {
    const where = wmaName ? `PropName LIKE '%${wmaName.replace(/'/g, "''")}%'` : '1=1';
    return this.queryLayer(this.layers.campgrounds, where);
  }

  async getBoatRamps(wmaName?: string) {
    const where = wmaName ? `PropName LIKE '%${wmaName.replace(/'/g, "''")}%'` : '1=1';
    return this.queryLayer(this.layers.boatRamps, where);
  }

  async getWildlifeOpenings(wmaName?: string) {
    const where = wmaName ? `PropName LIKE '%${wmaName.replace(/'/g, "''")}%'` : '1=1';
    return this.queryLayer(this.layers.openings, where);
  }
}

let apiInstance: GADNRInfrastructureAPI | null = null;

export function getInfrastructureAPI(): GADNRInfrastructureAPI {
  if (!apiInstance) {
    apiInstance = new GADNRInfrastructureAPI();
  }
  return apiInstance;
}
