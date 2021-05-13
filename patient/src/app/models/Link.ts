import { Reference } from './Reference';

export interface Link {
    other: Reference;
    type: 'replaced-by' | 'replaces' | 'refer' | 'seealso'
}