import { HttpService } from './../httpService/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpService:HttpService) { }

  getAllNotesApiCall(){
    return this.httpService.getAllNotesApi()
  }
  addNoteApiCall(data:any){
    return this.httpService.addNoteApi(data)
  }
  updateNoteApiCall(data:any){
    return this.httpService.updateNoteApi(data)
  }
}
