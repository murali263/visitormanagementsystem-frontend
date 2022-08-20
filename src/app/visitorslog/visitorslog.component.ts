import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';
import { VisitordetailsComponent } from '../visitordetails/visitordetails.component';

@Component({
  selector: 'app-visitorslog',
  templateUrl: './visitorslog.component.html',
  styleUrls: ['./visitorslog.component.scss']
})
export class VisitorslogComponent implements OnInit {
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['fromcompname', 'tocompname', 'menmbers', 'vechileno', 'visitdate', 'visittime', 'checkin','checkout'];
  companieslist;
  data;
  //datasource;

  company_code='';
  start_date='';
  end_date='';
  length: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  page:number=1;
  limit:number=5;
  skip: number = 1;
  eventValue: boolean;
  count: number;
  currentpage
  previouspage
  nextlimit
  prelimit
  nextpage
  prepage:number;
  pagesize;
  allvisitorsdata=[];
  
  public start: Date = new Date (""); 
  public end: Date = new Date ("");
  res: unknown[];
  constructor(private _gservice: GlobalService,
    private dialog: MatDialog,
     private dataservice:GenericService,
     private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // console.log(this.page);
    // console.log(this.limit);
    this.dataservice.page= this.page;
    this.dataservice.limit= this.limit;
  this.get_Companies();
   this.getvisitorsLog()
   // this.get_data()
   this.getvisitordata(obj)

    
  }



  getvisitorsLog() {
    this._gservice.toget_vistorslog().subscribe((res) => {
      //console.log(res['visitors']);
      if(res['message']=="relogin"){
        this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
     }
     else{
      this.data = res;
      this.data = res['visitors']['results'];
      this.nextpage = res['visitors']?.next?.page
      this.nextlimit = res['visitors']?.next?.limit
      this.prepage = res['visitors']?.previous?.page
      this.prelimit = res['visitors']?.previous?.limit
      this.count = res['visitors']?.count;
    }

    })
  }

  // to get the total companies list

  get_Companies() {
    console.log('hey')
    this._gservice.getCompanies().subscribe((obj:any) => {
      // console.log(obj);
      this.companieslist = obj;
    });
  }


  getvisitordata(obj){
    console.log('hello')
      
  //   this._gservice.getttingvis(obj).subscribe((res:any)=>{
  //     this.data = res.filter( vistorData =>  {
  //       let serDate = this.changeDate(vistorData.visit_date);
  //       if(this.company_code && this.start_date && this.end_date) {
  //         return (vistorData.company_code == this.company_code) && (this.start_date <= serDate &&  serDate <= this.end_date)
  //       } 
  //       else if(this.start_date && this.end_date) {
  //         return this.start_date <= serDate &&  serDate <= this.end_date;
  //       }
  //       else if(this.company_code) {
  //         return vistorData.company_code == this.company_code;
  //       }
  //       else {
      
  //        // this.data.paginator = this.paginator
  //         return true;
  //       }
       
  //     });

  //     this.data = res
  //     // this.data=new MatTableDataSource(res)
  //     // this.data.sort = this.sort
  //  console.log('coming',res)
  //    })
  }

  // to update in-time

  updateintime(obj){
    console.log(obj);
    this._gservice.updatein_time(obj).subscribe((data)=>{
     //  console.log(data['res']);
      if(data['res']=="updated"){
      this.ngOnInit();
      }
    });
  }

    // to update in-time

    updateouttime(obj){

       console.log(obj);
      this._gservice.updateout_time(obj).subscribe((data)=>{
        console.log(data['res']);
        if(data['res']=="updated"){
        this.ngOnInit();
        }
        
      });
    }
    getDater(data?:any){
      console.log('date')
      console.log(data);

     // const tempdata = this.data;
      // if(this.start_date !== '' && this.end_date !==''){
      //   tempdata.foreach((item,index)=>{
      //     if(item.dob >= this.start_date && item.dob <=this.end_date)
      //     data.push(item);
      //   })
      // }

      console.log(data?.endDate);
      console.log(data?.startDate);
      if(data.value != null){
        this.start_date=this.convert(data?.value[0]);
        this.end_date=this.convert(data?.value[1]);
      }
       else if(data.value == null){
        this.start_date="";
        this.end_date="";
      }
      
      console.log(this.start_date);
      
     this.getvisitordata(obj);
      // this.get_data();
      
    }
     convert(str) {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    changeDate(recDate) {
      return recDate.split('-').reverse().join('-');
    }
    selected_company(event){
      console.log(event)
      // this._gservice.getCompanies().subscribe((obj:any) => {
      //   console.log(obj);
      //  this.companieslist = obj.filter( comDetails=> comDetails.compcode == event);
      this.company_code = event;
    //  });
     this.getvisitordata(obj);
  

  //this.get_data();
    }

    get_data(){
      this._gservice.toget_vistorslog(this.start_date , this.end_date, this.company_code).subscribe((res)=>{
       console.log(res);
        this.data = res['visitors']['results'];
        this.nextpage = res['visitors']?.next?.page
        this.nextlimit = res['visitors']?.next?.limit
        this.prepage = res['visitors']?.previous?.page
        this.prelimit = res['visitors']?.previous?.limit
        this.count = res['visitors']?.count;
        
      }),err=>{
        //console.log(err)
      }
    }

    open_details(data){
      // console.log(data);
      const dialogref = this.dialog.open(VisitordetailsComponent, { width:'600px', height:'400px', data:data});
       dialogref.afterClosed().subscribe((data)=>{
         if(data=='updated'){
           this.ngOnInit();
         }
       })
    }


    getPageLimit(event?:any) {
      this.page=event?.pageIndex + 1;
      this.limit=event?.pageSize
      // console.log(this.page,this.limit);
      
    this.eventValue = true;
  
   
                this.currentpage=event?.pageIndex
                this.previouspage=event?.previousPageIndex
                this.pagesize=event?.pageSize
                    
                if(this.currentpage>this.previouspage )
                {
                  if(event?.pageSize >= this.count ){
                    if(event.pageIndex==0){
                      this.prepage=event.pageIndex+1
                      this.nextpage=event.pageIndex+1
                  }
                    
                    this.nextlimit=this.count;
                    this.prelimit=this.count;
                    
  
                  }
                  if(event?.pageSize < this.count){
                    if(event.pageIndex==0){
                      this.prepage=event.pageIndex+1
                      this.nextpage=event.pageIndex+1
                  }
                    this.nextlimit=event.pageSize;
                    this.prelimit=event.pageSize;
                    
  
                  }
  
                    this.dataservice.page=this.nextpage;
                    this.dataservice.limit=this.nextlimit;
  
            let sezArray=[]
                    this.data = new MatTableDataSource(sezArray);
                  // console.log("next")
                 // this.get_data()
                 this.getvisitordata(obj)
  
                }
                if(this.currentpage<this.previouspage)
                {
                  if(event?.pageSize >= this.count ){
                    if(event.pageIndex==0){
                      this.prepage=event.pageIndex+1
                      this.nextpage=event.pageIndex+1
                  }
                    this.nextlimit=this.count;
                    this.prelimit=this.count;
                    
  
                  }
                  if(event?.pageSize < this.count){
                    if(event.pageIndex==0){
                      this.prepage=event.pageIndex+1
                      this.nextpage=event.pageIndex+1
                  }
                  else{
                    this.prepage=event.pageIndex+1
                }
                    this.nextlimit=event.pageSize;
                    this.prelimit=event.pageSize;
                    
  
                  }
                  this.dataservice.page=this.prepage;
                  this.dataservice.limit=this.prelimit;
                  let sezArray=[]
                    this.data = new MatTableDataSource( sezArray);
        
                  // console.log("previous")
                 // this.get_data()
                 this.getvisitordata(obj)
                
  
                }
                if(this.currentpage==this.previouspage)
                {
                  if(event?.pageSize >= this.count ){

                    
                    this.nextlimit=this.count;
                    this.prelimit=this.count;
                    
  
                  }
                  if(event?.pageSize < this.count){

                    if(event.pageIndex==0){
                        this.prepage=event?.pageIndex+1
                    }
                    else{
                      this.prepage=event?.pageIndex+1
                    }
                    
                    this.nextlimit=event?.pageSize;
                    this.prelimit=event?.pageSize;
                    
  
                  }
                  if (this.prelimit==undefined) {
                    this.prelimit = event?.pageSize
                  }

                  this.dataservice.page=this.prepage;
                  this.dataservice.limit=this.prelimit;
                  let sezArray=[]
                  //  this.data = new MatTableDataSource( sezArray);
        
                  // console.log("current")
                  //this.get_data();
                  this.getvisitordata(obj)
            
  
                }
            this.eventValue = true;
  
           
  
  }
  sortData(sort: Sort) {
    console.log(Array.isArray(this.data))
    console.log(typeof this.data);
    const dataone = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.data = dataone;
      return;
    }

    this.data = dataone.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'members':
          return compare(a.members, b.members, isAsc);
        case 'visit_date':
          return compare(a.visit_date, b.visit_date, isAsc);
        case 'visit_time':
          return compare(a.visit_time, b.visit_time, isAsc);
        case 'checkin':
          return compare(a.checkin, b.checkin, isAsc);
        case 'checkout':
          return compare(a.checkout, b.checkout, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function obj(obj: any) {
  throw new Error('Function not implemented.');
}

