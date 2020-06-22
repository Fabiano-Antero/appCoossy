import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../controller/authService/auth.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authService: AuthService
    ){}

    canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const currentUser = this.authService.currentUserValue;
        if(currentUser){
            return true;
        }
        this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
        return false;
    }
}

