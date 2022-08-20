import { Component, OnInit } from '@angular/core';
import { GenericService } from '../services/generic.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {

  constructor(public dataservice : GenericService) { }

  ngOnInit(): void {
  }

}
