import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersService } from '../../../service/members.service';

@Component({
  selector: 'app-member-detail',
  standalone: false,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent {

  member: any;

  constructor(private router: Router, private route: ActivatedRoute, private membersService: MembersService) {}

  ngOnInit() {
      // id becomes id passed in from ActivatedRoute (when clicked on from list)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Then calls OL Detail api and populates 
    this.membersService.getMemberDetail(id).subscribe(data => {
      console.log(data); 
      this.member = data;
    }
  )};

}
