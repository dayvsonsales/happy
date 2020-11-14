import { Image } from "./Image";

export interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  open_on_weekends: boolean;
  opening_hours: string;
  pending?: boolean;
  images?: Image[];
}
