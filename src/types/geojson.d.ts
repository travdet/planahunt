declare namespace GeoJSON {
  type Position = [number, number] | [number, number, number];

  interface Geometry {
    type:
      | "Point"
      | "MultiPoint"
      | "LineString"
      | "MultiLineString"
      | "Polygon"
      | "MultiPolygon"
      | "GeometryCollection";
    coordinates: any;
  }

  interface Feature {
    type: "Feature";
    id?: string | number;
    geometry: Geometry | null;
    properties: Record<string, unknown> | null;
  }

  interface FeatureCollection {
    type: "FeatureCollection";
    features: Feature[];
  }
}
