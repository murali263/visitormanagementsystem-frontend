import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  companiesCount: number;
  visitorcount:number;
  noofGuards: number;
  noofAdmins: number;
  noofVisitors: number;
  countofcompany:any =[];
  companyvisitordata:any =[];
  sezCompanies;
  sezObj;
  sezArray:any=[];
  selectedSezObj;
  sezUsers;
  sezUsersCount;
  adminObj;
  datag;
  label;
  visitors_comapnies;
  from_date;
  to_date;
  data;
  CurrentYear;
  sezCompaniesCount;

  constructor(private _gservice: GlobalService,
     private _dservice: DashboardService,
     private dataService: GenericService,
     private _snackBar : MatSnackBar,
     
    ) { }

  ngOnInit(): void {
    // this._dservice.getSezUsers(scode).subscribe((data) =>{
    //  // console.log('chandu',data)
    // })
    this.visitorsmonth()
//this.month()
    this.getcnamecount()
    this.getSez();
    this.getsezone()
    // this.getTotalCompaniesdata()
    this.getTotalCompaniesdata();
    this.getTotaladmins();
    this.getsezObj();
    this.getTotalusers();
    this.togettotal_visitors();
    // this.DateFormats('week');
    this.selectedSez(scode)
    this.week();
    this.getTotaluserso();
    this.CurrentYear = new Date().getFullYear()
   
    //this.sezUsers()
    this.getvisitordata()
    this.getcompanycount()
   
  }













  visitorsmonth(){
    this._dservice.visitorbymonth().subscribe((data)=>{
      console.log('sagar',data)
    },err=>{
      console.log('murali',err)
    })
  }














  //get company count

  getcompanycount(){
    this._dservice.companycount().subscribe((res:any)=>{
      this.countofcompany = res.count
    //  console.log(res),err=>console.log(err)
    })
  }
//get visitor data count
getvisitordata(){
  
  this._dservice.visitorscount().subscribe((res:any)=>{
    this.visitorcount = res.count
  //  console.log(res)
  },err=>console.log(err))
}
  chartData = [
    { data: [0,0,0,0,0,0,0], label:'week'},
  ];
  
  chartLabels;
  // chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'sat', 'sun'];

 

  chartOptions = {
    responsive: true,
    
    scales:
    {
      yAxes: [{
        ticks: {
           precision: 0
        }
     }]
    }
  };


  // this._gservice.fetchSez().subscribe((sezs) => {
  //   this.sezArray = sezs.res.reverse();
  // }
  getTotalusers() {
    this._dservice.getSezUsers(this.dataService.scode).subscribe((data) => {
      // console.log(data.res);
      this.sezUsers = data?.res;

      this.noofGuards = this.sezUsers?.length - this.noofAdmins;

    });
  }
  getSez() {
    this._dservice.getTotalSezs().subscribe((sezs) => {
      // console.log("sez", sezs)
      if(sezs['message']=="relogin"){
        this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
       }
      else{
        this.sezArray = sezs.res
        //console.log("sez", this.sezArray)
  
        //this.SezCount = sezs.res.length
      }

    })
  }
  getsezone(){
    this._dservice.getSezCompanies().subscribe((data:any)=>{
      this.sezCompanies = data.res,
      //console.log(this.data?.res?.length)
      //this.sezCompaniesCount = data?.res?.length
     // console.log('sh',data)
      err=>console.log(err)
    })
    }
  selectedSez(scode) {
    //console.log(scode)
   //To get SEZ companies
 


   this._dservice.getSezCompanies(scode).subscribe((data) => {
    //console.log('sagar',data);
   this.sezCompanies = data?.res
   this.sezCompaniesCount = data?.res?.length

   console.log(this.sezCompanies);
   })
   //To get SEZ users
   this._dservice.getSezUsers(scode).subscribe((data) => {
    // console.log('murali',data);
     this.sezUsers = data?.res
     this.sezUsersCount = data?.res?.length
   })
// For Selected SEZ Details
   for (let v in this.sezArray) {
     if (this.sezArray[v].scode == scode) {
       this.selectedSezObj = this.sezArray[v]
     }
    // console.log('dropdown',this.sezArray)
   }
 this.selectedSezVisitors(scode)
 }
 selectedSezVisitors(scode)
 {
   // console.log(scode);

   this._dservice.gettotal_visitors(scode).subscribe((data) => {
       //console.log(data)
     this.visitors_comapnies = data['company_visitors']
     this.noofVisitors = data['total_visitor']
   });

   // this._dservice.getSezVisitors(scode).subscribe((data) => {
   //   console.log(data['visitors']);
   //   this.sezVisitorsObj=data['visitors']


   // });
 }

  onChartClick(event) {
     console.log(event);

  }


  getTotalCompaniesdata() {
    // console.log("companiescount");

    this._dservice.getSezCompanies().subscribe((data) => {
      //console.log("companiescount",data);
      if(data['message']=="relogin"){
        this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
     }
     else{
      this.companiesCount = data['res']?.length;
     // this.sezCompanies = data?.res;
     this.sezCompanies = data
     }

    })
  }

  getTotaladmins() {
    this._dservice.getTotaladmins().subscribe((admins) => {
      // console.log("Users",admins.res)
      this.adminObj = admins.res
      this.noofAdmins = admins['res']?.length
      // console.log("admins",admins.res)
    })
  }

  getsezObj() {
    this._dservice.getSez().subscribe((data) => {
      // console.log(data['res']);

      this.sezObj = data['res']
    })
  }

  getTotaluserso() {
    this._dservice.getSezUsers(this.dataService.scode).subscribe((data) => {
    //  console.log(data.res);
      this.sezUsers = data?.res;

      this.noofGuards = this.sezUsers?.length - this.noofAdmins;

    });
  }
  togettotal_visitors() {
    this._dservice.gettotal_visitors().subscribe((data) => {
  
      this.visitors_comapnies = data['company_visitors']
      this.noofVisitors = data['total_visitor']
    });
  }



//get  companyname and visitors count 


getcnamecount(){
  this._gservice.getttingvis(this.data).subscribe(res=>{
   //console.log(res)
    this.companyvisitordata = res
  })
}




  DateFormats(time) {
    if (time == 'week') {
      let startdate = moment().startOf(time)
      this.from_date = startdate.format().split('T')[0];
     // console.log(this.from_date);


      let enddate = moment().endOf(time);
      this.to_date = enddate.format().split('T')[0];
     // console.log(this.to_date);
    }
    if (time == 'month') {
      let startdate = moment().startOf(time)
      this.from_date = startdate.format().split('T')[0];

      let current_month = parseInt(startdate.format('M'));
      // console.log(current_month);
      // console.log(typeof (current_month));

      // console.log(this.from_date);


      let enddate = moment().endOf(time);
      this.to_date = enddate.format().split('T')[0];
      // console.log(this.to_date);

      for (let i = 1; i < current_month; i++) {
        // console.log(i);

        let start_date = moment(startdate).subtract(i, 'months');
        // console.log(start_date);
        let end_date = moment(enddate).subtract(i, 'months');
        // console.log(end_date);



      }


    }
  }
  week(steps = 1) {
    // this.chartData[0].data = [50, 89, 28, 190, 300, 254, 108];
    // this.chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.DateFormats('week');
    const dateArray = [];
    let currentDate = new Date(this.from_date);
    while (currentDate <= new Date(this.to_date)) {
      dateArray.push(new Date(currentDate).toJSON().split('T')[0]);
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    this.chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this._dservice.getVisitorsByWeek(dateArray).subscribe((data) => {
       console.log('chart',data);
      // this.chartData[0].data = data['visitors']
      if(data['visitors']['resArray']?.length>0){

        this.chartData = [{data:data['visitors']['resArray'],label:"Week"}]
      }
      else{
        this.chartData = [{data:[0,0,0,0,0,0,0],label:"Week"}]

      }

    });


  }
  month() {
    //console.log('mine')
    this.chartLabels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    var YearAndMonthArray = []
    for (let i = 1; i <= 12; i++) {
     // console.log(i);
      if (i < 10) {
        var DateFormat = this.CurrentYear + '-' + 0 + i
        YearAndMonthArray.push(DateFormat)
      }
      else {
        var DateFormat = this.CurrentYear + '-' + i
        YearAndMonthArray.push(DateFormat)

      }
    }
    // console.log(YearAndMonthArray);
    
    this._dservice.getVisitorsByMonth(YearAndMonthArray).subscribe((data)=>{
     // console.log(data);    
      this.chartData[0].data=data['visitors']
      if(data['visitors']['resArray']?.length>0){

        this.chartData = [{data:data['visitors']['resArray'],label:"Month"}]
      }
      else{
        this.chartData = [{data:[0,0,0,0,0,0,0,0,0,0,0,0],label:"Month"}]

      }
    })
  }
  year() {
    // console.log(this.CurrentYear);
    var CurrentYear = new Date().getFullYear()
  
    var YearArray = []
    for (let i = 0; i < 5; i++) {
      if (i == 0) {
        YearArray.push(CurrentYear.toString())
      }
      else if (i > 0) {
        // console.log(this.Year + 1)
        CurrentYear = CurrentYear - 1
        YearArray.push(CurrentYear.toString())
      }
  
  
    }
    this.chartLabels= YearArray.reverse()
    console.log("yeararray", YearArray);
  
  this._dservice.getVisitorsByYear(YearArray).subscribe((data)=>{
   
    if(data['visitors']?.length>0){

    this.chartData = [{data:data['visitors'],label:"Year"}]

    }
    else{
    this.chartData = [{data:[0,0,0,0,0],label:"Year"}]

    }
  })
  }

  
}











function scode(scode: any, any: any) {
  throw new Error('Function not implemented.');
}

