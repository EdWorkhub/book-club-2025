import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-member',
  standalone: false,
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {

  @Input() memberName: string = '';
  @Input() memberRole: string = '';
  @Input() memberTeam: string = '';
  @Input() memberEmail: string = '';
  @Input() memberLocation: string = '';
  @Input() memberJoinDate: string = '';
  @Input() memberPhoto: string = '';
  @Input() memberStatus: string = '';


}
