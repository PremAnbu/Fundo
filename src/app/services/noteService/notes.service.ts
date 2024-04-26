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
  // updateNoteApiCall(data:any){
  //   return this.httpService.updateNoteApi(data)
  // }
  trashNoteApiCall(noteId: number){
    return this.httpService.trashNoteApi(noteId)
  }
  archiveNoteApiCall(noteId: number){
    return this.httpService.archiveNoteApi(noteId)
  }
  colorNoteApiCall(noteId: number,color:string){
    return this.httpService.colorNoteApi(noteId,color)
  }

}
