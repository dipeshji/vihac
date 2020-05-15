import { Injectable } from '@angular/core';
import { EnvService } from '../../../env.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private env: EnvService, private http: HttpClient) { }
  rootURL = this.env.apiUrl;

  getUserAddress(pinCode): Observable<any> {
    let Headers = new HttpHeaders();
    let Params = new HttpParams().set('pinCode', pinCode);
    Headers.append('Content-Type', 'application/json');
    return this.http.get(`${this.rootURL}/registerUser/useraddress`,
      {
        headers: Headers,
        params: Params
      });
  }
  registerUser(userData): Observable<any> {
    let Headers = new HttpHeaders();
    Headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.rootURL}/registerUser/register`, userData,
      {
        headers: Headers
      }
    )
  }
}
