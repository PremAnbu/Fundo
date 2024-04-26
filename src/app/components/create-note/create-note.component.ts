import { NotesService } from './../../services/noteService/notes.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, LIST_VIEW_ICON, MORE_ICON, NOTE_ICON, PIN_ICON, REMINDER_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  title: string = ""
  description: string = ""

  createNote : boolean=false;


@Output() updateList=new EventEmitter<any>()

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private notesService:NotesService) {
    iconRegistry.addSvgIconLiteral("list-icon", sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON)),
    iconRegistry.addSvgIconLiteral("brush-icon", sanitizer.bypassSecurityTrustHtml(BRUSH_ICON)),
    iconRegistry.addSvgIconLiteral("image-icon", sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
  }

  ngOnInit(): void {
  }

  handleCreateNote(action:string){
      this.createNote=!this.createNote
    if(action=='close')
      {
        this.notesService.addNoteApiCall({title:this.title,description:this.description,colour:"#ffffff"})
                         .subscribe(res=>{
        console.log(res);

        this.updateList.emit(res.data)

        this.title=""
        this.description=""
      },err=>{console.log(err);
      })
      }

    // {
    //   "title": "string",
    //   "description": "string",
    //   "colour": "string",
    //   "reminder": "2024-04-25T06:22:00.544Z",
    //   "isArchived": true,
    //   "isPinned": true,
    //   "isDeleted": true
    // }

  }



}
