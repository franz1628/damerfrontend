import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './shared/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private alert: AlertService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // Mostrar el error usando el servicio de notificación
          this.alert.showAlert('Advertencia','Error en el servidor, intente más tarde.','warning')

          return throwError(errorMsg);
        })
      );
    }
}
