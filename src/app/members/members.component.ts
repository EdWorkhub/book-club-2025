import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../interfaces/member.interface';
import { MembersService } from '../../service/members.service';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-members',
  standalone: false,
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {

  constructor(private router: Router, private membersService: MembersService, private firebaseService: FirebaseService) {}

  membersList: Member[] = [];
  membersDBList: Member[] = [];
  userProfile: any = null; 
  authUser: any = null; 
  

  ngOnInit(): void {
    this.membersService.getDBMembers().subscribe(async data => {
      console.log(data);
      this.membersDBList = data;

      // Test firestore auth implmentation in template 
      const user = this.firebaseService.auth.currentUser
      console.log(user);

      if (user) {
        this.authUser = user;
        this.userProfile = await this.firebaseService.getUserProfile(user.uid);
      }
      console.log(this.authUser);
      console.log(this.userProfile);
    })
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }

  navigateToLibrary() {
    this.router.navigate(['/library']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToMemberDetail(member: Member) {
    const id = member.id;
    this.router.navigate(['/member', id]);
  }

}
