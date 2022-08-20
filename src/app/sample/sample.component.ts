import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements AfterViewInit {
  displayedColumns: string[] = ['fromcompname', 'tocompname', 'menmbers', 'vechileno', 'visitdate', 'visittime', 'checked',];
  
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  

}
export interface PeriodicElement {
  tocompname:string,
  fromcompname:string,
  
  menmbers: string,
  vechileno:string,
   visitdate: string,
   visittime:string,
   checked: string
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  { fromcompname: 'ABC',tocompname:'XYZ', menmbers: '3',vechileno:'AP31TZ3434', visitdate: '19-11-2021',visittime:'12:30pm',checked: 'check in'},
  
];
