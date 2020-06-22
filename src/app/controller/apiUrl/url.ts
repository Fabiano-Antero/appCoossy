import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})



export class Urls {
    
    //Nome dos EndPoints
    public cadUsers = "api/registrar"
    public acesseUser = "api/login"
    //Url do EndPoint
    url = 'http://localhost:27017/';

    constructor() {
    }
}
