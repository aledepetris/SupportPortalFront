import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { CustomHttpResponse } from '../model/customHttpResponse';

@Injectable({providedIn: 'root'})
export class UserService {

  private host: string = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
    {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUser(username: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${username}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] | null {
    const usersJson = localStorage.getItem('users');
    if (usersJson === null) return null;
    return JSON.parse(usersJson);
  }

  public createUserFormData(loggedInUsername: string | null, user: User, profileImage: File | null): FormData {

    const formData = new FormData();
    if (loggedInUsername) formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    if (profileImage)  formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.isActive));
    formData.append('isNonLocked', JSON.stringify(user.isNotLocked));

    return formData;

  }

}
