import { Certificate, CertificateStatus, UserRole } from './types';

export const ICQA_NAME = 'International Civil Qualification Association';
export const ORGANIZATION_SHORT_NAME = 'ICQA';
export const DIRECTOR_NAME = 'William Alexander Davis';
export const DIRECTOR_TITLE = 'ICQA Executive Director';
export const ASIA_PACIFIC_DIRECTOR_NAME = 'Jonalyn Cacanindin';
export const ASIA_PACIFIC_DIRECTOR_TITLE = 'Asia-Pacific Director';

export const MOCK_USERS = [
  { id: '1', email: 'admin@icqa.org', name: 'Admin User', role: UserRole.ADMIN, password: 'password' },
  { id: '2', email: 'staff@icqa.org', name: 'Staff User', role: UserRole.STAFF, password: 'password' },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    kcqaNumber: 'IC-2026-001',
    name: 'AN CHANG NAM',
    dob: 'JUL 13, 1952',
    ncqaNumber: 'ICQA-414',
    qualificationType: 'International Psychological Counselor Level 1',
    issueDate: 'DEC 06, 2025',
    eduDept: 'ICQA Global Learning Center',
    issuingOffice: 'ICQA International Secretariat',
    issuingCountry: 'Singapore',
    expirationDate: 'DEC 06, 2028',
    photoUrl: 'https://picsum.photos/300/400',
    status: CertificateStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    kcqaNumber: 'IC-2024-099',
    name: 'JANE DOE',
    dob: 'JAN 01, 1980',
    ncqaNumber: 'ICQA-882',
    qualificationType: 'Global Art Therapist Level 2',
    issueDate: 'JAN 15, 2022',
    eduDept: 'ICQA Professional Academy',
    issuingOffice: 'ICQA Europe Office',
    issuingCountry: 'United Kingdom',
    expirationDate: 'JAN 15, 2024',
    photoUrl: 'https://picsum.photos/300/401',
    status: CertificateStatus.EXPIRED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
