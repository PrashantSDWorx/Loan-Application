import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';


// Fully AI Generated
export const errorToastInterceptor: HttpInterceptorFn = (req, next) => {
    const toastService = inject(ToastService);

    return next(req).pipe(
        catchError((error: unknown) => {
            const message =
                error instanceof HttpErrorResponse
                    ? getHttpErrorMessage(error)
                    : 'An unexpected error occurred.';

            toastService.show(message, 'error');

            return throwError(() => error);
        })
    );
};

function getHttpErrorMessage(error: HttpErrorResponse): string {
    const serverMessage =
        typeof error.error === 'string'
            ? error.error
            : error.error?.message;

    return serverMessage ?? error.status ?? `Request failed (${error.status})`;
}

