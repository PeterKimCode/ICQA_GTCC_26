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

export interface Certificate {
  id: string;
  icqaNumber: string; // Red text
  name: string; // Blue text
  dob: string; // MMM DD, YYYY
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