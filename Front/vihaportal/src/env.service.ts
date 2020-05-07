import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  public apiUrl = 'http://localhost:4000';

  // Whether or not to enable debug mode
  public enableDebug = false;

  constructor() {
  }
}
