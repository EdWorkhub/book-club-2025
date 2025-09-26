import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibraryComponent } from './library/library.component';
import { SearchComponent } from './search/search.component';
import { MembersComponent } from './members/members.component';
import { BookDetailComponent } from './library/book-detail/book-detail.component';
import { SearchDetailComponent } from './search/search-detail/search-detail.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'book/:id',
    component: BookDetailComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'search/:id',
    component: SearchDetailComponent
  },
  {
    path: 'members',
    component: MembersComponent
  },
  {
    path: 'member/:id',
    component: MemberDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
