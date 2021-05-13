import { Reference } from './Reference';
import { Period } from './Period';
import { CodeableConcept } from './CodeableConcept';

export interface Identifier {
    use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
    type?: CodeableConcept;
    system?: string;
    value?: string;
    period?: Period;
    assigner?: Reference;
}