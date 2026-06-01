import type { Gender } from "@/types/provider";

export type { Clinic, Gender, Provider, Specialty } from "@/types/provider";

export type ProvidersFilter = {
  name?: string;
  specialtyId?: number;
  clinicId?: number;
  gender?: Gender;
};
