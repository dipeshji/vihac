import { Injectable } from '@angular/core';
import { EnvService } from '../../../env.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private env:EnvService) { }
  rootURL = this.env.apiUrl;
}
