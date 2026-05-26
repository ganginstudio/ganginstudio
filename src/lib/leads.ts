import { fetchSupabaseState, saveSupabaseState, isSupabaseConfigured } from './supabase';
import { EstimateSubmit } from '../types';

export interface Lead {
  id: string;
  type: string;
  name: string;
  phone: string;
  category: string;
  region: string;
  area: string;
  budget: string;
  schedule: string;
  details: string;
  uploadsCount: number;
  uploads: { name: string; type?: string; dataUrl: string }[];
  timestamp: string;
}

export interface Consultation {
  id: string;
  type: string;
  name: string;
  phone: string;
  category: string;
  region: string;
  area: string;
  budget: string;
  schedule: string;
  details: string;
  uploadsCount: number;
  uploads: any[];
  timestamp: string;
}

export async function getLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured) return [];
  try {
    return await fetchSupabaseState<Lead[]>('gangin_all_leads', []);
  } catch (e) {
    console.error('Failed to fetch leads from Supabase:', e);
    return [];
  }
}

export async function getEstimates(): Promise<EstimateSubmit[]> {
  if (!isSupabaseConfigured) return [];
  try {
    return await fetchSupabaseState<EstimateSubmit[]>('gangin_estimates', []);
  } catch (e) {
    console.error('Failed to fetch estimates from Supabase:', e);
    return [];
  }
}

export async function getConsultations(): Promise<Consultation[]> {
  if (!isSupabaseConfigured) return [];
  try {
    return await fetchSupabaseState<Consultation[]>('gangin_consultations', []);
  } catch (e) {
    console.error('Failed to fetch consultations from Supabase:', e);
    return [];
  }
}

export async function saveLeads(leads: Lead[]): Promise<void> {
  if (!isSupabaseConfigured) return;
  await saveSupabaseState('gangin_all_leads', leads);
}

export async function saveEstimates(estimates: EstimateSubmit[]): Promise<void> {
  if (!isSupabaseConfigured) return;
  await saveSupabaseState('gangin_estimates', estimates);
}

export async function saveConsultations(consultations: Consultation[]): Promise<void> {
  if (!isSupabaseConfigured) return;
  await saveSupabaseState('gangin_consultations', consultations);
}

export async function addLeadSubmission(params: {
  lead?: Lead;
  estimate?: EstimateSubmit;
  consultation?: Consultation;
}) {
  try {
    if (params.lead) {
      const list = await getLeads();
      await saveLeads([params.lead, ...list]);
    }
    if (params.estimate) {
      const list = await getEstimates();
      await saveEstimates([params.estimate, ...list]);
    }
    if (params.consultation) {
      const list = await getConsultations();
      await saveConsultations([params.consultation, ...list]);
    }
  } catch (err) {
    console.error('[Supabase] Failed to write lead submission:', err);
  }
}
