import { Period } from './Period';

export interface ContactPoint {
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: string;
    rank?: number;
    period?: Period;
}