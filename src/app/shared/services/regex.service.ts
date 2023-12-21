import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegexService {
  regexCombo = /^[1-9]\d*$/;
  regexFecha = /^\d{4}-\d{2}-\d{2}$/;
  regexFloat = /^-?\d+(\.\d+)?$/;
}
