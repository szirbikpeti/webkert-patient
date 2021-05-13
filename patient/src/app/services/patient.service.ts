import { Patient } from './../models/Patient';
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

	private collectionName: string = 'Patient';

  constructor(private afs: AngularFirestore) {
  }
  
  async create(patient: Patient): Promise<void> {
    const uid = this.afs.createId()
    patient.id = uid;

    return await this.afs.collection(this.collectionName).doc(uid).set(patient);
  }
  
  async update(patient: Patient): Promise<void> {
    return await this.afs.collection(this.collectionName).doc(patient.id).set(patient);
  }

  get(): Observable<Patient[]> {
    return this.afs.collection(this.collectionName).valueChanges() as Observable<Patient[]>;
  }

  getOrderByBirthDateAsc(): Observable<Patient[]> {
    return this.afs
      .collection(this.collectionName, ref => ref
        .orderBy('birthDate', 'asc'))
      .valueChanges() as Observable<Patient[]>;
  }

  getOrderByBirthDateDesc(): Observable<Patient[]> {
    return this.afs
      .collection(this.collectionName, ref => ref
        .orderBy('birthDate', 'desc'))
      .valueChanges() as Observable<Patient[]>;
  }

  getActive(): Observable<Patient[]> {
    return this.afs
      .collection(this.collectionName, ref => ref
        .where('active', '==' , true))
      .valueChanges() as Observable<Patient[]>;
  }

  delete(id: string): Promise<void> {
    return this.afs.collection(this.collectionName).doc(id).delete();
  }
}
