import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { LoadingService } from '../../../service/loading.service';

@Component({
  selector: 'app-member',
  standalone: false,
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {

  constructor(private loadingService: LoadingService) {}

  placeholder = 'assets/member.png';

  ngOnInit() {
    this.loadingService.show();
  }

  // Inserts placeholder image 
  onPhotoError(event: any) {
    event.target.src = this.placeholder
    this.loadingService.hide();
  }

  @Input() memberName: string = '';
  @Input() memberRole: string = '';
  @Input() memberTeam: string = '';
  @Input() memberEmail: string = '';
  @Input() memberLocation: string = '';
  @Input() memberJoinDate: string = '';
  @Input() memberPhoto: string = '';
  @Input() memberStatus: string = '';
}
