import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl:string = "https://localhost:7004/api"
  private authHeader =new HttpHeaders({
    Authorization : `Bearer ${localStorage.getItem('authToken')}` 
  })
  constructor(private httpclient : HttpClient) { }

  loginApi(email : string,password : string) : Observable<any>{
   return this.httpclient.get(`https://localhost:7004/api/User/${encodeURIComponent(email)}/${encodeURIComponent(password)}`,{})
  }

  signinApi(requestBody:any): Observable<any>{
    return this.httpclient.post("https://localhost:7004/api/User",requestBody,{})}

  getAllNotesApi(): Observable<any>{
   return this.httpclient.get("https://localhost:7004/api/Notes",{headers:this.authHeader})
  }
  addNoteApi(data:any): Observable<any>{
    return this.httpclient.post("https://localhost:7004/api/Notes",data,{headers:this.authHeader})
  }
  updateNoteApi(data:any): Observable<any>{
    return this.httpclient.put("https://localhost:7004/api/Notes",data,{headers:this.authHeader})
  }
}
