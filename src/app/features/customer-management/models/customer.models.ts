export type CustomerStatus = 'Active' | 'Inactive' | 'Suspended';
export type EnterpriseTier = 'Platinum' | 'Gold' | 'Silver' | 'Standard';

export interface FinancialProfile {
  creditLimit: number;
  creditUtilized: number;
  lifetimeValue: number;
  outstandingBalance: number;
}

export interface CompanyContact {
  primaryName: string;
  primaryEmail: string;
  primaryPhone: string;
  designation: string;
}

export interface Customer {
  id: string;
  accountNumber: string;
  companyName: string;
  tier: EnterpriseTier;
  status: CustomerStatus;
  contact: CompanyContact;
  financials: FinancialProfile;
  onboardingDate: Date;
}

export interface CustomerFilters {
  search: string;
  status: string;
  tier: string;
}