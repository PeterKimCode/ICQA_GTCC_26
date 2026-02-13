export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  GUEST = 'GUEST'
}

export enum CertificateStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED'
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
  createdAt: string;
  updatedAt: string;
  certificates?: Certificate[];
}

export interface Certificate {
  id: string;
  holderId?: string; // New FK
  holderEmail?: string; // Optional: For creating/linking holder
  kcqaNumber: string; // Red text
  name: string; // Blue text (Legacy/Display redundancy)
  dob: string; // MMM DD, YYYY (Legacy/Display redundancy)
  ncqaNumber: string;
  qualificationType: string; // Blue text
  issueDate: string; // MMM DD, YYYY
  eduDept: string; // Blue text
  issuingOffice: string; // Blue text
  issuingCountry: string; // Blue text
  expirationDate: string; // MMM DD, YYYY
  photoUrl: string; // Base64 or URL
  status: CertificateStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateSearchParams {
  query?: string;
  status?: CertificateStatus | 'ALL';
}