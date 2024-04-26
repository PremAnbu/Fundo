import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { FundooHeaderComponent } from './components/fundoo-header/fundoo-header.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"signin",
    component: SigninComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent, //parent
    children:[
      {
        path:"notes",
        component: NotesContainerComponent
      },
      {
        path:"archive",
        component: ArchiveContainerComponent
      },
      {
        path:"trash",
        component: TrashContainerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
