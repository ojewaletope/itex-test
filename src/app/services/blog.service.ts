import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, map, tap} from "rxjs/operators";
import {Post} from "../interfaces/post";
import {Comment} from "../interfaces/comment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }
  handleError(error: HttpErrorResponse) {
    return throwError(error)
  }
  getPosts():Observable<any> {
    return this.http.get(`${environment.api_url}posts`).pipe(tap(), map(res => {
      return res
    }), catchError(this.handleError))
  }
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.api_url}posts/${id}`).pipe(tap(), map(res => {
      return res
    }), catchError(this.handleError))
  }
  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.api_url}posts/${id}/comments`).pipe(tap(res => {
      return res
    }), catchError(this.handleError))
  }
  addNewPost(payload: any): Observable<any> {
    return this.http.post(`${environment.api_url}posts`, payload).pipe(tap(), map(res => {
      return res
    }), catchError(this.handleError))
  }
}
