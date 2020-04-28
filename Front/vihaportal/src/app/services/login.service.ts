import { Injectable } from '@angular/core';
import { EnvService } from '../../../src/env.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private env:EnvService) { }
  rootURL = this.env.apiUrl;
}
