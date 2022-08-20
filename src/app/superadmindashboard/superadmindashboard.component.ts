import { Component, OnInit, ViewChild } from "@angular/core";
import { OCT } from "@angular/material/core";
import { DashboardService } from "../dashboard.service";
import { GenericService } from "../services/generic.service";
import { GlobalService } from "../services/global.service";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
//import { STATUS_CODES } from 'http';

@Component({
  selector: "app-superadmindashboard",
  templateUrl: "./superadmindashboard.component.html",
  styleUrls: ["./superadmindashboard.component.scss"],
})
export class SuperadmindashboardComponent implements OnInit {
  @ViewChild(MatSort) Sort: MatSort;
  count = [];
  SezCount: number;
  visitorcount = [];
  CompaniesCount;
  TotalUsers;
  sezArray;
  selectedSezObj;
  sezVisitorsObj;
  sezCompanies;
  sezUsers: MatTableDataSource<any>;
  sezUsersCount;
  LablesArray = [];
  Year: any;
  monthInNumber: any;
  today;
  from_date;
  to_date;
  weekArray = [];
  chartLabels = [];
  CurrentYear: any;
  totalVisitorsCount;
  sezCompaniesCount;
  visitors_comapnies;
  noofVisitors;
  companyvisitordata;

  YearAndMonthArray = [];

  //m
  sezcompanys;
  data: any;

  constructor(
    private _dservice: DashboardService,
    private _gservice: GlobalService,
    private dataservice: GenericService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.CurrentYear = new Date().getFullYear();
    // console.log(this.CurrentYear);

    this.getSez();
    this.getchTotalVisitorsCount();
    // this.getTotalCompaniesdata()
    this.getTotalCompaniesdata();
    this.getTotalUsers();
    this.DateFormats();
    this.week();
    this.getsezone();
    // this.visitortotalcount()
    this.getCompaniesdata();
    this.getcnamecount();
  }

  //get  companyname and visitors count

  getcnamecount() {
    this._gservice.getttingvis(this.data).subscribe((res) => {
      this.companyvisitordata = res;
      //  console.log(res)
    });
  }

  getsezone() {
    this._dservice.getSezCompanies().subscribe((res: any) => {
      (this.sezCompanies = res),
        //console.log(this.data?.res?.length)
        //this.sezCompaniesCount = data?.res?.length
        //console.log(res)
        (err) => console.log(err);
    });
  }

  chartOptions = {
    responsive: true,

    scales: {
      yAxes: [
        {
          ticks: {
            precision: 0,
          },
        },
      ],
    },
  };
  chartData = [{ data: [0, 0, 0, 0, 0, 0, 0], label: "Week" }];
  // chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'sat', 'sun'];

  // this._dservice.fetchSez().subscribe((sezs) => {
  //   this.sezArray = sezs.res.reverse();
  // }

  onChartClick(event) {
    // console.log(event);
  }
  getSez() {
    this._dservice.getTotalSezs().subscribe((sezs) => {
      // console.log("sez", sezs)
      if (sezs["message"] == "relogin") {
        this._snackBar.open("Session expired . Please relogin", "ok", {
          duration: 5000,
        });
      } else {
        this.sezArray = sezs.res;
        // console.log("sez", this.sezArray)

        this.SezCount = sezs.res.length;
      }
    });
  }
  getCompaniesdata() {
    this._dservice.getTotalCompanies().subscribe((data) => {
      // console.log("companiescount", data.res);
      this.CompaniesCount = data?.res?.length;
    });
  }
  getTotalCompaniesdata() {
    // console.log("companiescount");

    this._dservice.getTotalCompanies().subscribe((data) => {
      // console.log("companiescount", data.res);
      this.CompaniesCount = data?.res?.length;
    });
  }

  getTotalUsers() {
    this._dservice.getTotalUsers().subscribe((admins: any) => {
      //console.log("Users", admins)
      this.sezUsers = admins?.res;
      this.sezUsersCount = admins?.res?.length;
      this.sezUsers = admins;
      this.sezUsers = new MatTableDataSource(admins);
      this.sezUsers.sort = this.Sort;
      // console.log("admins",admins.res)
    });
  }
  // getTotalusers() {
  //   this._dservice.getSezUsers(this.dataService.scode).subscribe((data) => {
  //     // console.log(data.res);
  //     this.sezUsers = data?.res;

  //     this.noofGuards = this.sezUsers?.length - this.noofAdmins;

  //   });
  // }

  selectedSez(scode) {
    // console.log(scode)
    //To get SEZ companies
    this._dservice.getSezCompanies(scode).subscribe((data) => {
      // console.log('sagar',data);
      this.sezCompanies = data?.res;
      this.sezCompaniesCount = data?.res?.length;

      //console.log(this.sezCompanies);
    });
    //To get SEZ users
    this._dservice.getSezUsers(scode).subscribe((data) => {
      // console.log(data);
      this.sezUsers = data?.res;
      this.sezUsersCount = data?.res?.length;
    });
    // For Selected SEZ Details
    for (let v in this.sezArray) {
      if (this.sezArray[v].scode == scode) {
        this.selectedSezObj = this.sezArray[v];
      }
      // console.log('get',this.sezArray)
    }
    this.selectedSezVisitors(scode);
  }

  //To get select sez visitors
  selectedSezVisitors(scode) {
    // console.log(scode);

    this._dservice.gettotal_visitors(scode).subscribe((data) => {
      // console.log(data)
      this.visitors_comapnies = data["company_visitors"];
      this.noofVisitors = data["total_visitor"];
    });

    // this._dservice.getSezVisitors(scode).subscribe((data) => {
    //   console.log(data['visitors']);
    //   this.sezVisitorsObj=data['visitors']

    // });
  }

  getchTotalVisitorsCount() {
    this._dservice.fetchTotalVisitorsCount().subscribe((data) => {
      // console.log("data",data['visitors']);

      this.totalVisitorsCount = data["visitors"];
    });
  }

  DateFormats() {
    let startdate = moment().startOf("week");
    this.from_date = startdate.format().split("T")[0];
    // console.log(this.from_date );

    let enddate = moment().endOf("week");
    this.to_date = enddate.format().split("T")[0];
  }

  week(steps = 1) {
    const dateArray = [];
    let currentDate = new Date(this.from_date);

    while (currentDate <= new Date(this.to_date)) {
      dateArray.push(new Date(currentDate).toJSON().split("T")[0]);
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    // this.chartLabels = dateArray;
    this.chartLabels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    this._dservice.getVisitorsByWeek(dateArray).subscribe((data) => {
      console.log("vinay", data);
      if (data["visitors"]["resArray"]?.length > 0) {
        this.chartData = [
          { data: data["visitors"]["resArray"], label: "Week" },
        ];
      } else {
        this.chartData = [{ data: [0, 0, 0, 0, 0, 0, 0], label: "Week" }];
      }
    });
  }
  month() {
    this.chartLabels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var YearAndMonthArray = [];
    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        var DateFormat = this.CurrentYear + "-" + 0 + i;
        // console.log("if", DateFormat);
        YearAndMonthArray.push(DateFormat);
      } else {
        var DateFormat = this.CurrentYear + "-" + i;
        //  console.log("else");
        YearAndMonthArray.push(DateFormat);
      }
    }
    //console.log(YearAndMonthArray);
    this._dservice.getVisitorsByMonth(YearAndMonthArray).subscribe(
      (data) => {
        // console.log('month api',data)
        if (data["visitors"]["resArray"]?.length > 0) {
          this.chartData = [
            { data: data["visitors"]["resArray"], label: "Month" },
          ];
        } else {
          this.chartData = [
            { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Month" },
          ];
        }
      },
      (err) => {
        //console.log('month',err)
      }
    );
  }

  year() {
    // console.log(this.CurrentYear);
    var CurrentYear = new Date().getFullYear();

    var YearArray = [];
    for (let i = 0; i < 5; i++) {
      if (i == 0) {
        YearArray.push(CurrentYear.toString());
      } else if (i > 0) {
        // console.log(this.Year + 1)
        CurrentYear = CurrentYear - 1;
        YearArray.push(CurrentYear.toString());
      }
    }
    this.chartLabels = YearArray.reverse();
    // console.log("yeararray", YearArray);

    this._dservice.getVisitorsByYear(YearArray).subscribe((data) => {
      //console.log(data)
      if (data["visitors"]?.length > 0) {
        this.chartData = [{ data: data["visitors"], label: "Year" }];
      } else {
        this.chartData = [{ data: [0, 0, 0, 0, 0], label: "Year" }];
      }
    });
  }

  //count of visitors

  // visitortotalcount(){
  //   this._dservice.visitorscount().subscribe((visitors:any)=>{
  //  // this.visitorcount = visitors.
  //  //console.log(visitors)
  // this.visitorcount = visitors.count;
  //   },err=>console.log(err))
  // }
}
