import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: string = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  public getUsers(): Observable<User[] | HttpErrorResponse> {

    return this.http.get<User[]>(`${this.host}/user/list`)

  }


}
