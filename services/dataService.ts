import { Certificate, CertificateSearchParams, CertificateStatus, Holder } from '../types';
import { supabase } from './supabase';

// Map database snake_case to frontend camelCase
const mapFromDB = (data: any): Certificate => ({
  id: data.id,
  holderId: data.holder_id,
  kcqaNumber: data.icqa_number,
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
  if (cert.holderId) mapped.holder_id = cert.holderId;
  if (cert.kcqaNumber) mapped.icqa_number = cert.kcqaNumber;
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

  // Updated to return multiple certificates
  getByNumberAndName: async (kcqaNumber: string, name: string): Promise<Certificate[]> => {
    // 1. Verify existence of at least one matching certificate (authentication step)
    const { data: authCert, error: authError } = await supabase
      .from('certificates')
      .select('holder_id')
      .eq('icqa_number', kcqaNumber.trim().toUpperCase())
      .eq('name', name.trim().toUpperCase()) // Case-insensitive might be better but let's stick to exact for security
      .maybeSingle();

    if (authError || !authCert) return [];

    // 2. Fetch all certificates for the holder
    if (authCert.holder_id) {
      const { data: allCerts, error: fetchError } = await supabase
        .from('certificates')
        .select('*')
        .eq('holder_id', authCert.holder_id);

      if (fetchError) throw fetchError;
      return (allCerts || []).map(mapFromDB);
    }

    // Fallback for legacy records without holder_id (just return the single match)
    // Re-fetch full object
    const { data: legacyCert } = await supabase
      .from('certificates')
      .select('*')
      .eq('icqa_number', kcqaNumber.trim().toUpperCase())
      .eq('name', name.trim().toUpperCase())
      .single();

    return legacyCert ? [mapFromDB(legacyCert)] : [];
  },

  // New: Search by Name + Phone (for "Find My Certs")
  getByNameAndPhone: async (name: string, phone: string): Promise<Certificate[]> => {
    // 1. Find Holder (Case-insensitive)
    const { data: holder } = await supabase
      .from('holders')
      .select('id')
      .ilike('name', name.trim())
      .eq('phone_number', phone.trim()) // Phone should be exact match usually, or sanitized
      .maybeSingle();

    if (!holder) return [];

    // 2. Fetch Certs
    const { data: certs, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('holder_id', holder.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (certs || []).map(mapFromDB);
  },

  // Deprecated: Search by Name + Email (kept for backward compatibility or admin if needed)
  getByNameAndEmail: async (name: string, email: string): Promise<Certificate[]> => {
    // 1. Find Holder (Case-insensitive)
    const { data: holder } = await supabase
      .from('holders')
      .select('id')
      .ilike('name', name.trim())
      .ilike('email', email.trim())
      .maybeSingle();

    if (!holder) return [];

    // 2. Fetch Certs
    const { data: certs, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('holder_id', holder.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (certs || []).map(mapFromDB);
  },

  create: async (cert: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certificate> => {
    // Normalize data
    const normalizedName = cert.name.trim().toUpperCase();
    const normalizedDob = cert.dob.trim();
    const normalizedEmail = cert.holderEmail ? cert.holderEmail.trim() : undefined;
    const normalizedPhone = cert.holderPhone ? cert.holderPhone.trim() : undefined;

    // Check if holder exists, if not create
    let holderId = cert.holderId;

    if (!holderId && normalizedName && normalizedDob) {
      let query = supabase.from('holders').select('id').eq('name', normalizedName).eq('dob', normalizedDob);

      // If email is provided, include it in search (more specific)
      if (normalizedEmail) {
        query = query.eq('email', normalizedEmail);
      }
      // If phone is provided, include it in search
      if (normalizedPhone) {
        query = query.eq('phone_number', normalizedPhone);
      }

      const { data: existingHolder } = await query.maybeSingle();

      if (existingHolder) {
        holderId = existingHolder.id;
      } else {
        const { data: newHolder, error: holderError } = await supabase
          .from('holders')
          .insert({
            name: normalizedName,
            dob: normalizedDob,
            email: normalizedEmail || null,
            phone_number: normalizedPhone || null
          })
          .select()
          .single();

        if (holderError) throw holderError;
        holderId = newHolder.id;
      }
    }

    // Create Cert with holder_id
    const dbData = mapToDB({
      ...cert,
      name: normalizedName, // Ensure cert also has uppercase name
      holderId
    });

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