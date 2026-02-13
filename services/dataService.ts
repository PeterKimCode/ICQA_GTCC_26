import { Certificate, CertificateSearchParams, CertificateStatus } from '../types';
import { supabase } from './supabase';

// Map database snake_case to frontend camelCase
const mapFromDB = (data: any): Certificate => ({
  id: data.id,
  icqaNumber: data.icqa_number,
  name: data.name,
  dob: data.dob,
  ncqaNumber: data.ncqa_number,
  qualificationType: data.qualification_type,
  issueDate: data.issue_date,
  eduDept: data.edu_dept,
  issuingOffice: data.issuing_office,
  issuingCountry: data.issuing_country,
  expirationDate: data.expiration_date,
  photoUrl: data.photo_url,
  status: data.status as CertificateStatus,
  createdAt: data.created_at,
  updatedAt: data.updated_at
});

const mapToDB = (cert: Partial<Certificate>) => {
  const mapped: any = {};
  if (cert.icqaNumber) mapped.icqa_number = cert.icqaNumber;
  if (cert.name) mapped.name = cert.name;
  if (cert.dob) mapped.dob = cert.dob;
  if (cert.ncqaNumber) mapped.ncqa_number = cert.ncqaNumber;
  if (cert.qualificationType) mapped.qualification_type = cert.qualificationType;
  if (cert.issueDate) mapped.issue_date = cert.issueDate;
  if (cert.eduDept) mapped.edu_dept = cert.eduDept;
  if (cert.issuingOffice) mapped.issuing_office = cert.issuingOffice;
  if (cert.issuingCountry) mapped.issuing_country = cert.issuingCountry;
  if (cert.expirationDate) mapped.expiration_date = cert.expirationDate;
  if (cert.photoUrl) mapped.photo_url = cert.photoUrl;
  if (cert.status) mapped.status = cert.status;
  return mapped;
};

export const CertificateService = {
  getAll: async (params?: CertificateSearchParams): Promise<Certificate[]> => {
    let query = supabase.from('certificates').select('*').order('created_at', { ascending: false });

    if (params?.query) {
      const q = `%${params.query}%`;
      query = query.or(`name.ilike.${q},icqa_number.ilike.${q},qualification_type.ilike.${q}`);
    }

    if (params?.status && params.status !== 'ALL') {
      query = query.eq('status', params.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(mapFromDB);
  },

  getById: async (id: string): Promise<Certificate | undefined> => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return undefined;
    return mapFromDB(data);
  },

  getByNumberAndName: async (icqaNumber: string, name: string): Promise<Certificate | undefined> => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('icqa_number', icqaNumber.trim().toUpperCase())
      .eq('name', name.trim().toUpperCase())
      .maybeSingle(); // Better for guest search

    if (error || !data) return undefined;
    return mapFromDB(data);
  },

  create: async (cert: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certificate> => {
    const dbData = mapToDB(cert);
    const { data, error } = await supabase
      .from('certificates')
      .insert(dbData)
      .select()
      .single();

    if (error) throw error;
    return mapFromDB(data);
  },

  update: async (id: string, updates: Partial<Certificate>): Promise<Certificate> => {
    const dbData = mapToDB(updates);
    const { data, error } = await supabase
      .from('certificates')
      .update({ ...dbData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return mapFromDB(data);
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};