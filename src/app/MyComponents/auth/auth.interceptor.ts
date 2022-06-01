import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler,  HttpInterceptor, HttpRequest } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

        constructor (private userService: UserService, private router : Router) {}
    
        intercept(req: HttpRequest<any>, next: HttpHandler) {
             
            if(req.headers.get('noauth'))
                return next.handle(req.clone())
                
            else {
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "Bearer "+ this.userService.getToken())
                });
                return next.handle(clonedreq);
                }
            }
    }
    

