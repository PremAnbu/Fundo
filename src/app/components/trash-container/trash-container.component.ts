import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/noteService/notes.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent implements OnInit {

  trashNotesList: any = []
  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesApiCall().subscribe(res => {
      console.log(res.data);
      this.trashNotesList = res.data.filter((note: any)=> note.isDeleted==true)
      console.log(this.trashNotesList);
    },
    (err) => {
      console.log(err);
    }
    )
  }

  updateNotesList($event: {action: string, data: any}) {
    
     if ($event.action == "trash" || $event.action ==="delete") {
      this.trashNotesList = this.trashNotesList.filter((note:any) => note.userNotesId != $event.data.userNotesId)
    }
  }

}
