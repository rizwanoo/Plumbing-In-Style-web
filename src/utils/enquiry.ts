export type ProjectState = 'NY' | 'NJ' | 'CT';
export type ProjectSector = 'Residential' | 'Commercial';
export type ProjectService = 'Repairs' | 'Installations' | 'Renovations';
export type PreferredContactMethod = 'Instagram DM' | 'Email' | 'Phone';

export interface EnquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: PreferredContactMethod;
  state: ProjectState | '';
  city: string;
  sector: ProjectSector | '';
  service: ProjectService | '';
  description: string;
  honeypot: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryFormData, string>>;

export const INITIAL_ENQUIRY_FORM: EnquiryFormData = {
  fullName: '',
  email: '',
  phone: '',
  preferredContact: 'Instagram DM',
  state: '',
  city: '',
  sector: '',
  service: '',
  description: '',
  honeypot: '',
};

export function sanitizeField(value: string): string {
  return value.replace(/[<>]/g, '').trim();
}

export function validateEnquiryForm(data: EnquiryFormData): EnquiryErrors {
  const errors: EnquiryErrors = {};

  if (data.honeypot.trim().length > 0) {
    errors.honeypot = 'Automated submission blocked.';
    return errors;
  }

  const name = sanitizeField(data.fullName);
  if (name.length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const email = sanitizeField(data.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = data.phone.replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  }

  if (!data.state || !['NY', 'NJ', 'CT'].includes(data.state)) {
    errors.state = 'Please select NY, NJ, or CT.';
  }

  if (sanitizeField(data.city).length < 2) {
    errors.city = 'Please enter your city or town.';
  }

  if (!data.sector || !['Residential', 'Commercial'].includes(data.sector)) {
    errors.sector = 'Please choose Residential or Commercial.';
  }

  if (!data.service || !['Repairs', 'Installations', 'Renovations'].includes(data.service)) {
    errors.service = 'Please select Repairs, Installations, or Renovations.';
  }

  if (sanitizeField(data.description).length < 12) {
    errors.description = 'Please describe your plumbing project (at least 12 characters).';
  }

  return errors;
}

export function formatInstagramBrief(data: EnquiryFormData): string {
  const stateLabel =
    data.state === 'NY'
      ? 'New York (NY)'
      : data.state === 'NJ'
        ? 'New Jersey (NJ)'
        : data.state === 'CT'
          ? 'Connecticut (CT)'
          : '';

  return [
    'Hi Tiffany / Plumbing In Style,',
    '',
    `Project Type: ${sanitizeField(data.sector)} — ${sanitizeField(data.service)}`,
    `Location: ${sanitizeField(data.city)}, ${stateLabel}`,
    `Name: ${sanitizeField(data.fullName)}`,
    `Preferred Contact: ${data.preferredContact}`,
    `Email: ${sanitizeField(data.email)}`,
    `Phone: ${sanitizeField(data.phone)}`,
    '',
    'Project Details:',
    sanitizeField(data.description),
  ].join('\n');
}
