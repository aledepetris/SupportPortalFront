import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpResponse } from '../model/customHttpResponse';

@Injectable({providedIn: 'root'})
export class UserService {

  private host: string = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData):Observable<HttpEvent<any>| HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
    {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] | null {
    const usersJson = localStorage.getItem('users');
    if (usersJson === null) return null;
    return JSON.parse(usersJson);
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {

    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firsName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.isActive));
    formData.append('isNonLocked', JSON.stringify(user.isNotLocked));

    return formData;

  }

}
