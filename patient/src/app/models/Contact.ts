import { Period } from './Period';
import { Reference } from './Reference';
import { Address } from './Address';
import { ContactPoint } from './ContactPoint';
import { HumanName } from './HumanName';
import { CodeableConcept } from './CodeableConcept';

export interface Contact {
    relationship?: CodeableConcept[];
    name?: HumanName;
    telecom?: ContactPoint[];
    address?: Address;
    gender?: 'male' | 'female' | 'other' | 'unknown';
    organization?: Reference; 
    period?: Period;
}