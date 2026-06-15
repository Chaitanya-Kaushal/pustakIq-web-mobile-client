import { SellerSummary } from '../types';

const IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDOZjdIASkwTlqdHqLdhduEgtQHRs5w5zqfGaVsRzT3FI3j6ugKKKst8BS3wdQrpajoBLCnfYakmxOTRsIM4v8WCPL63-7nh_K4VDkWVN2o-8wwssel1kdkjKH3PQyYgxhE72Vug3QuDyf10ANAjgQaSJBFj6f7yYMu9sK5aBjfqYSt59uZhXlUtQImZ_QZscDSsz9lMPQU2_VHdWcOivnr6i9wK6HpZyySJoFwM4RzghJQeJMxMKaroDoTgDoEFWGFDYM0CM134Owh';

export const sellers: Record<string, SellerSummary> = {
  'usr-arjun': {
    id: 'usr-arjun',
    name: 'Arjun Sharma',
    avatar: IMG,
    isTrusted: true,
    rating: 4.9,
    reviewCount: 12,
    phone: '+919811111111',
    whatsapp: '+919811111111',
  },
  'usr-priya': {
    id: 'usr-priya',
    name: 'Priya Nair',
    isTrusted: true,
    rating: 4.7,
    reviewCount: 28,
    phone: '+919822222222',
    whatsapp: '+919822222222',
  },
  'usr-rahul': {
    id: 'usr-rahul',
    name: 'Rahul Mehta',
    isTrusted: false,
    rating: 4.4,
    reviewCount: 6,
    phone: '+919833333333',
    whatsapp: '+919833333333',
  },
};
