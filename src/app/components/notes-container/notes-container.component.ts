import { Subscription } from 'rxjs';
import { NotesService } from './../../services/noteService/notes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent implements OnInit {

  notesList: any = []
  constructor(private NotesService:NotesService ) { }

  ngOnInit(): void {
    this.NotesService.getAllNotesApiCall().subscribe((res : any) => {
      console.log(res);
      this.notesList=res.data
    },err => console.log(err)
  )
  }
  handelUpdateNotesList($event:{action:string,data:any}){
    console.log("event",$event);
    if($event.action=="create"){
      this.notesList=$event
     // this.notesList=[...this.notesList,$event.data] // if you return only one object format that time newly created note not able to add so use ... create one array to store old all the notes after that at last newly created note addad
    }
    else if($event.action=="archive"){
      this.NotesService.archiveNoteApiCall($event.data.userNotesId).subscribe((res : any) => {
        console.log(res);
      },err => console.log(err))
      this.notesList=this.notesList.filter((ele:any)=>ele.userNotesId!=$event.data.userNotesId)
    }
    else if($event.action=="trash"){
         this.NotesService.trashNoteApiCall($event.data.userNotesId).subscribe((res : any) => {
          console.log(res);
        },err => console.log(err))
      this.notesList=this.notesList.filter((ele:any)=>ele.userNotesId!=$event.data.userNotesId)
    }
  }

  

}
