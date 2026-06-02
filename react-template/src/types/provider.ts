export const GENDERS = ["male", "female", "other"] as const;

export type Gender = (typeof GENDERS)[number];

export type Specialty = {
  id: number;
  name: string;
};

export type Clinic = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  phone: string | null;
};

export type Provider = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  about: string | null;
  languages: string[] | null;
  profilePic: string | null;
  specialty: Specialty | null;
  clinics: Clinic[];
};

export type ProviderFilters = {
  name?: string;
  specialtyId?: number;
  clinicId?: number;
  gender?: Gender;
};
