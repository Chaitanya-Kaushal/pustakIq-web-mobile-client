import { User, UserRole } from '../types';

/** The signed-in user used by the stub auth flow + Profile screen. */
export const currentUser: User = {
  id: 'usr-me',
  name: 'Rohan Gupta',
  mobile: '+919812345678',
  email: 'rohan.gupta@example.com',
  cityId: 'ct-newdelhi',
  areaId: 'ar-rkpuram',
  role: UserRole.USER,
  createdAt: '2024-01-28T08:00:00.000Z',
};
