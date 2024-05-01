import { Subscription } from 'rxjs';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/dataService/data.service';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, DELETE_FOREVER_ICON, IMG_ICON, LIST_VIEW_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON, RESTORE_ICON, UNARCHIVE_ICON } from 'src/assets/svg-icons';
import { NotesService } from 'src/app/services/noteService/notes.service';
import { MatDialog } from '@angular/material/dialog';
import { EditnoteComponent } from '../edit-note/editnote/editnote.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit,OnDestroy {
  @Input() notesData! : any [];
  @Output() updateList=new EventEmitter<any>()
  @Input() container!: string
  searchString:string=''
  subscription!:Subscription

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private dataService:DataService,private noteService:NotesService,private dialogue:MatDialog) {
    iconRegistry.addSvgIconLiteral("list-icon", sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON)),
    iconRegistry.addSvgIconLiteral("brush-icon", sanitizer.bypassSecurityTrustHtml(BRUSH_ICON)),
    iconRegistry.addSvgIconLiteral("image-icon", sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
    iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON)),
    iconRegistry.addSvgIconLiteral('delete-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON)),
    iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON))  
  }

  ngOnInit(): void {
    this.subscription=this.dataService.currSearchString.subscribe(res=>this.searchString=res)

  }

  handleNoteIconsClick(action: string, note: any,color? :string) {
    if(action=="archive" || action=="unarchive"){
      this.noteService.archiveNoteApiCall(note.userNotesId).subscribe(() => {
        this.updateList.emit({action:action,data:note})
      },err=>console.log(err));    }
    else if(action=="trash"){
      this.noteService.trashNoteApiCall(note.userNotesId ).subscribe(() => {
      this.updateList.emit({action:action,data:note})
    },err=>console.log(err)); 
  }
  else if(action=="colour" && color !== undefined){    
    this.noteService.colorNoteApiCall(note.userNotesId,color).subscribe(() => { 
    this.updateList.emit({action:action,data:{...note,colour:color}})
  },err=>console.log(err)); }
  else if(action=="delete"){
    this.noteService.deleteNoteCall(note.userNotesId).subscribe(() => {
    this.updateList.emit({action:action,data:note})
  },err=>console.log(err)); 
  }
}
ngOnDestroy(){
  this.subscription.unsubscribe()
}
handleEditNote(noteData:any){
  const dialogRef=this.dialogue.open(EditnoteComponent, {
    data:noteData
  })
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    this.noteService.updateNoteApiCall(result).subscribe(() => {
      this.updateList.emit({action:'update', data:result})
    },err=>console.log(err)); 

  });
}
}