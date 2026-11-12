import { createContext, useContext } from 'react';
import { clinics, DEFAULT_CLINIC } from './data/clinics';

export const ClinicContext = createContext(clinics[DEFAULT_CLINIC]);

export const useClinic = () => useContext(ClinicContext);

/** Reads ?c=slug from the URL and returns the matching clinic (falls back to default). */
export function resolveClinic() {
  const slug = new URLSearchParams(window.location.search).get('c');
  const key = slug && clinics[slug.toLowerCase()] ? slug.toLowerCase() : DEFAULT_CLINIC;
  return { slug: key, ...clinics[key] };
}

