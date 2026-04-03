export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  GUEST = 'GUEST'
}

export enum CertificateStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Holder {
  id: string;
  name: string;
  dob: string;
  email?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  certificates?: Certificate[];
}

export interface Certificate {
  id: string;
  holderId?: string; // New FK
  holderEmail?: string; // Optional: For creating/linking holder
  holderPhone?: string; // Optional: For creating/linking holder
  kcqaNumber: string; // ICQA display number
  name: string;
  dob: string;
  ncqaNumber: string;
  qualificationType: string;
  issueDate: string;
  eduDept: string;
  issuingOffice: string;
  issuingCountry: string;
  expirationDate: string;
  photoUrl: string; // Base64 or URL
  status: CertificateStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateSearchParams {
  query?: string;
  status?: CertificateStatus | 'ALL';
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  content: string;
  created_at?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at?: string;
}
