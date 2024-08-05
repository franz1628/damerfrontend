import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../../environments/environments';
import { Sku } from '../../mantenimiento/components/variedades/interfaces/sku.interface';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  private apiUrl = environments.baseUrl + 'api/upload';


  constructor(private http: HttpClient, private alert:AlertService) { }

  uploadImageSku(file: File, sku: Sku): Observable<HttpEvent<any>> {
   
  
    const formData: FormData = new FormData();
    formData.append('image', file);
  
    // Agrega las propiedades del objeto sku a FormData
    for (const key in sku) {
      if (sku.hasOwnProperty(key)) {
        formData.append(key, (sku as any)[key]);
      }
    }
  
    // Log FormData content
    formData.forEach((value, key) => {
  
    });
  
    return this.http.post<any>(`${this.apiUrl}/uploadImage`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => event),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
