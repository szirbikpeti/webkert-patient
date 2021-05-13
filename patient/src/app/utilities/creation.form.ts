import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export function createNewIdentifierForm(fb: FormBuilder): FormGroup {
  return fb.group({
    use: [''],
    system: [''],
    value: ['']
  });
}

export function createNewPeriodForm(fb: FormBuilder): FormGroup {
  return fb.group({
    start: [''],
    end: ['']
  });
}

export function createNewNameForm(fb: FormBuilder): FormGroup {
  return fb.group({
    text: [''],
    family: ['']
  });
}

export function createNewTelecomForm(fb: FormBuilder): FormGroup {
  return fb.group({
    system: [''],
    value: [''],
    use: [''],
    rank: ['']
  });
}

export function createNewAddressForm(fb: FormBuilder): FormGroup {
  return fb.group({
    type: [''],
    text: [''],
    city: [''],
    state: [''],
    postalCode: [''],
    country: ['']
  });
}

export function createNewPhotoForm(fb: FormBuilder): FormGroup {
  return fb.group({
    language: [''],
    data: [''],
    url: [''],
    size: [''],
    title: ['']
  });
}

export function createNewContactForm(fb: FormBuilder): FormGroup {
  return fb.group({
    gender: ['']
  });
}

export function createNewLinkForm(fb: FormBuilder): FormGroup {
  return fb.group({
    type: ['', Validators.required],
    other: fb.group({
      reference: [''],
      type: [''],
      display: ['']
    }, Validators.required)
  });
}
