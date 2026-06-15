import { books } from './books';
import { tutors } from './tutors';
import { stores } from './stores';
import { schools, areas, cities, states } from './locations';

export * from './locations';
export * from './sellers';
export * from './books';
export * from './tutors';
export * from './stores';
export * from './notifications';
export * from './currentUser';

// ---- Lightweight selectors (stand in for API calls) ----------------------

export const getBookById = (id: string) => books.find((b) => b.id === id);
export const getTutorById = (id: string) => tutors.find((t) => t.id === id);
export const getStoreById = (id: string) => stores.find((s) => s.id === id);
export const getSchoolById = (id: string) => schools.find((s) => s.id === id);
export const getAreaById = (id: string) => areas.find((a) => a.id === id);
export const getCityById = (id: string) => cities.find((c) => c.id === id);
export const getStateById = (id: string) => states.find((s) => s.id === id);
