import { CodeableConcept } from './CodeableConcept';

export interface Communication {
    language: CodeableConcept;
    preffered?: boolean;
}