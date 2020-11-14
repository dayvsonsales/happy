import { Orphanage } from "./Orphanage";

export interface Image {
  id?: number;
  path: string;
  orphanage?: Orphanage;
}
