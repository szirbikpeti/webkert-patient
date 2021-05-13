import { ContactPoint } from './ContactPoint';
import { HumanName } from './HumanName';
import { Link } from './Link';
import { Communication } from './Communication';
import { Contact } from './Contact';
import { CodeableConcept } from './CodeableConcept';
import { Address } from './Address';
import { Identifier } from './Identifier';
import { Attachment } from './Attachment';
import { Reference } from './Reference';

export interface Patient {
    id: string;
    identifier?: Identifier[];
    active?: boolean;
    name?: HumanName[];
    telecom?: ContactPoint[];
    gender?: 'male' | 'female' | 'other' | 'unknown';
    birthDate?: string;
    deceasedBoolean?: boolean;
    address?: Address[];
    maritalStatus?: CodeableConcept;
    multipleBirth?: boolean;
    photo?: Attachment[];
    contact?: Contact[];
    communication?:  Communication[];
    generalPractitioner?: Reference[];
    managingOrganization?: Reference;
    link?: Link[];
}