import { Certificate, CertificateStatus, UserRole } from './types';

export const ICQA_NAME = "International Civil Qualification Association";
export const DIRECTOR_NAME = "William Alexander Davis";
export const DIRECTOR_TITLE = "ICQA Director";
export const ASIAN_DIRECTOR_NAME = "Jonalyn Cacanindin";
export const ASIAN_DIRECTOR_TITLE = "Asian Director";

export const MOCK_USERS = [
  { id: '1', email: 'admin@icqa.org', name: 'Admin User', role: UserRole.ADMIN, password: 'password' },
  { id: '2', email: 'staff@icqa.org', name: 'Staff User', role: UserRole.STAFF, password: 'password' },
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    icqaNumber: 'GC01-24',
    name: 'AN CHANG NAM',
    dob: 'JUL 13, 1952',
    ncqaNumber: '414',
    qualificationType: 'Psychological Counselor Level 1',
    issueDate: 'DEC 06, 2021',
    eduDept: 'International Lifelong Education Center',
    issuingOffice: 'International Lifelong Education Center',
    issuingCountry: 'Korea',
    expirationDate: 'DEC 06, 2025', // Future date
    photoUrl: 'https://picsum.photos/300/400',
    status: CertificateStatus.ACTIVE,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    icqaNumber: 'GC02-99',
    name: 'JANE DOE',
    dob: 'JAN 01, 1980',
    ncqaNumber: '882',
    qualificationType: 'Art Therapist Level 2',
    issueDate: 'JAN 15, 2020',
    eduDept: 'Seoul Art Academy',
    issuingOffice: 'Seoul Main Office',
    issuingCountry: 'Korea',
    expirationDate: 'JAN 15, 2021', // Expired
    photoUrl: 'https://picsum.photos/300/401',
    status: CertificateStatus.EXPIRED,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];