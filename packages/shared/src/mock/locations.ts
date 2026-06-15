import { Area, City, School, State } from '../types';

export const states: State[] = [
  { id: 'st-dl', name: 'Delhi' },
  { id: 'st-mh', name: 'Maharashtra' },
  { id: 'st-ka', name: 'Karnataka' },
];

export const cities: City[] = [
  { id: 'ct-newdelhi', stateId: 'st-dl', name: 'New Delhi' },
  { id: 'ct-mumbai', stateId: 'st-mh', name: 'Mumbai' },
  { id: 'ct-pune', stateId: 'st-mh', name: 'Pune' },
  { id: 'ct-bengaluru', stateId: 'st-ka', name: 'Bengaluru' },
];

export const areas: Area[] = [
  { id: 'ar-rkpuram', cityId: 'ct-newdelhi', name: 'R.K. Puram' },
  { id: 'ar-southext', cityId: 'ct-newdelhi', name: 'South Extension' },
  { id: 'ar-cp', cityId: 'ct-newdelhi', name: 'Connaught Place' },
  { id: 'ar-barakhamba', cityId: 'ct-newdelhi', name: 'Barakhamba Road' },
  { id: 'ar-andheri', cityId: 'ct-mumbai', name: 'Andheri' },
  { id: 'ar-whitefield', cityId: 'ct-bengaluru', name: 'Whitefield' },
];

export const schools: School[] = [
  {
    id: 'sch-dps-rkpuram',
    name: 'Delhi Public School (DPS), R.K. Puram',
    address: 'Sector 12, R.K. Puram, New Delhi',
    cityId: 'ct-newdelhi',
    areaId: 'ar-rkpuram',
  },
  {
    id: 'sch-xaviers',
    name: "St. Xavier's Collegiate",
    address: 'South Extension, New Delhi',
    cityId: 'ct-newdelhi',
    areaId: 'ar-southext',
  },
  {
    id: 'sch-kv',
    name: 'Kendriya Vidyalaya',
    address: 'R.K. Puram, New Delhi',
    cityId: 'ct-newdelhi',
    areaId: 'ar-rkpuram',
  },
  {
    id: 'sch-modern',
    name: 'Modern School, Barakhamba',
    address: 'Barakhamba Road, New Delhi',
    cityId: 'ct-newdelhi',
    areaId: 'ar-barakhamba',
  },
];
