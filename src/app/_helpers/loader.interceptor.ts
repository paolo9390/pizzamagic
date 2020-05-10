import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { LoaderService } from '../_services/loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loader: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const isApiUrl = request.url.startsWith('http://localhost:5000');

        if (isApiUrl) this.loader.show();

        return next.handle(request).pipe(
            finalize(() => {
                if (isApiUrl) this.loader.hide();
            })
        );
    }
}