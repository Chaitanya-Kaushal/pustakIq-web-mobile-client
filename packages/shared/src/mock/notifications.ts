import { AppNotification } from '../types';

export const notifications: AppNotification[] = [
  {
    id: 'ntf-1',
    userId: 'usr-me',
    title: 'Your listing is live 🎉',
    body: '"Comprehensive Physics for Class 10" has been approved and is now visible to buyers.',
    isRead: false,
    createdAt: '2024-02-02T09:30:00.000Z',
  },
  {
    id: 'ntf-2',
    userId: 'usr-me',
    title: 'New interest in your book',
    body: 'A buyer near R.K. Puram viewed your Physics listing. Respond fast to close the deal.',
    isRead: false,
    createdAt: '2024-02-01T17:10:00.000Z',
  },
  {
    id: 'ntf-3',
    userId: 'usr-me',
    title: 'Welcome to PustakIQ',
    body: 'Discover affordable school & exam books, verified tutors and trusted stores near you.',
    isRead: true,
    createdAt: '2024-01-28T08:00:00.000Z',
  },
];
