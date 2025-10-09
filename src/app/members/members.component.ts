import { Component } from '@angular/core';
import { Member } from '../../interfaces/member.interface';
import { MembersService } from '../../service/members.service';
import { NavigationService } from '../../service/navigation.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

  constructor(
    private nav: NavigationService,
    private membersService: MembersService,
    private loadingService: LoadingService
  ) {}

  membersList: Member[] = [];
  
  ngOnInit(): void {
    this.loadingService.show();
    this.membersService.getDBMembers().subscribe(async data => {
      console.log(data);
      this.membersList = data;
      this.loadingService.hide();
    })
  }

  // ROUTER
  navToLibrary() {
    this.nav.toLibrary();
  }

  navToSearch() {
    this.nav.toSearch();
  }

  navToMembers() {
    this.nav.toMembers();
  }

  navToLogin() {
    this.nav.toLogin();
  }

  navToDashboard() {
    this.nav.toDashboard();
  }

  navToMemberDetail(member: Member) {
    this.nav.toMemberDetail(member.id);
  }
}
