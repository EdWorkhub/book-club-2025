import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from '../../../service/members.service';
import { LoadingService } from '../../../service/loading.service';

@Component({
  selector: 'app-member-detail',
  standalone: false,
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss',
})
export class MemberDetailComponent {
  member: any;
  placeholder = 'assets/member.png';

  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    // id becomes id passed in from ActivatedRoute (when clicked on from list)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadingService.show();
    this.membersService.getMemberDetailByLocalId(id).subscribe((data) => {
      console.log(data);
      this.member = data;
      this.loadingService.hide();
    });
  }

    onPhotoError(event: any) {
    event.target.src = this.placeholder
  }
}
