import { Component, OnInit,ViewChild } from '@angular/core';
import {MatGridList} from '@angular/material/grid-list';
import { DashboardService } from '../dashboard.service';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-sezusersandsezdetails',
  templateUrl: './sezusersandsezdetails.component.html',
  styleUrls: ['./sezusersandsezdetails.component.scss']
})
export class SezusersandsezdetailsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  displayedColumns: string[] = ['id', 'name', 'Phone Number', 'Email Address','Role'];
  sezArray;
  selectedSez;
  selectedLevel;
  sezcompnies;
  sezUsers;
  sezUsersCount;
  data
  companyvisitordata;
  
  selectedSezObj;
 

  

  
  constructor(private _gservice:GlobalService,private _dashboard:DashboardService,private _genric:GenericService) { }

  ngOnInit(){
  //  console.log('hello',)
   
  this.getsez();
  this.getszone();
  // this.getTotalusers()
  this.getcnamecount()
  //this.sezUsers.sort = this.sort;
  }




  //graph start












  

  

  getsez(){
    this._dashboard.getTotalSezs().subscribe(data=>{
      this.sezArray = data.res;

    // console.log('sez',data);
    })
  }

  getszone(){
    this._dashboard.getSezCompanies().subscribe(data=>{
      this.sezcompnies = data
     // console.log('jj',data)
    })
  }
  getTotalusers(value) {
    console.log(value.target.value);
  this._genric.scode = value.target.value;
    this.selectedSez = this.sezArray.find(sez => {
      return sez.scode == value.target.value
    });
  //console.log(this.selectedSez)
    this._dashboard.getSezUsers(this._genric.scode).subscribe((data) => {
       console.log(data.res);
      this.sezUsers = data?.res.sort( (a,b) => {
        if ( a.username < b.username ){
          return -1;
        }
        if ( a.username > b.username ){
          return 1;
        }
        return 0;
      });
//console.log(data)
     // this.noofGuards = this.sezUsers?.length - this.noofAdmins;
 //    this.sezUsers = new MatTableDataSource(this.sezUsers)

    });
  }

  getcnamecount(){
    this._gservice.getttingvis(this.data).subscribe(res=>{
     //console.log('l',res)
      this.companyvisitordata = res
    })
  }





sortData(sort: Sort) {
    const data = this.companyvisitordata.slice();
    if (!sort.active || sort.direction === '') {
      this.companyvisitordata = data;
      return;
    }

    this.companyvisitordata = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'company_name':
          return compare(a.company_name, b.company_name, isAsc);

        case 'members':
          return compare (a.members,b.members,isAsc)  
        default:
          return 0;
      }
    });
  }
  sortDatathree(sort: Sort) {
    const data = this.sezcompnies.slice();
    if (!sort.active || sort.direction === '') {
      this.sezcompnies = data;
      return;
    }

    this.sezcompnies = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'companyname':
          return compare(a.companyname, b.companyname, isAsc);

        case 'compcode':
          return compare (a.compcode,b.compcode,isAsc)  
        default:
          return 0;
      }
    });
  }









  sortDataone(sort: Sort) {
    const data = this.sezUsers.slice();
    if (!sort.active || sort.direction === '') {
      this.sezUsers = data;
      return;
    }

    this.sezUsers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'username':
          return compare(a.username, b.username, isAsc);
          case 'role':
            return compare(a.role, b.role, isAsc);
        default:
          return 0;
      }
    });
  }
  
//   changeState(){
// console.log('e')
// this._dashboard.getTotalSezs().subscribe(data=>{
//   this.sezArray = data

//   console.log('sez',data)
// })
//   }
//   selectedSez(scode) {
//     console.log(scode)
//    //To get SEZ companies
 


//    this._dashboard.getSezCompanies(scode).subscribe((data) => {
//     console.log('sagar',data);
//    this.sezcompnies = data?.res
//    //this.sezCompaniesCount = data?.res?.length

//    console.log(this.sezcompnies);
//    })
//    //To get SEZ users
//    this._dashboard.getSezUsers(scode).subscribe((data) => {
//      console.log('murali',data);
//      this.sezUsers = data?.res
//      this.sezUsersCount = data?.res?.length
//      console.log('count',this.sezUsersCount)
//    })
// // For Selected SEZ Details
//    for (let v in this.sezArray) {
//      if (this.sezArray[v].scode == scode) {
//        this.selectedSezObj = this.sezArray[v]
//      }
//     // console.log('dropdown',this.sezArray)
//    }
//  this.selectedSezVisitors(scode)

//  }
 //selectedSezVisitors(scode)
//  {
//    // console.log(scode);

//    this._dashboard.gettotal_visitors(scode).subscribe((data) => {
//        console.log(data)
//      //this.visitors_comapnies = data['company_visitors']
//      //this.noofVisitors = data['total_visitor']
//    });

//    // this._dservice.getSezVisitors(scode).subscribe((data) => {
//    //   console.log(data['visitors']);
//    //   this.sezVisitorsObj=data['visitors']


//    // });
//  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}