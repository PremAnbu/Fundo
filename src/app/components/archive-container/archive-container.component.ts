import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/noteService/notes.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent implements OnInit {

  archvieNotesList: any = []
  constructor(private noteService:NotesService) { }

  ngOnInit(): void {
    this.noteService.getAllNotesApiCall().subscribe(res => {
      this.archvieNotesList = res.data.filter((note: any)=> note.isArchived==true)
    },
    (err) => {
      console.log(err);
    }
    )
  }

  updateNotesList($event: {action: string, data: any}) {
     if ($event.action === "unarchive" || $event.action == "trash") {
      this.archvieNotesList = this.archvieNotesList.filter((note:any) => note.UserNotesId != $event.data.UserNotesId)
    }
  }
}
