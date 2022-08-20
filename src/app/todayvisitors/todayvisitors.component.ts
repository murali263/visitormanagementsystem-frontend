import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitordetailsComponent } from '../visitordetails/visitordetails.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GenericService } from '../services/generic.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { error } from 'console';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-todayvisitors',
  templateUrl: './todayvisitors.component.html',
  styleUrls: ['./todayvisitors.component.scss']
})
export class TodayvisitorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  displayedColumns: string[] = ['fromcompname', 'tocompname', 'menmbers', 'vechileno', 'visitdate', 'visittime', 'checked'];
  companieslist;
  data;
  dataone;
  searchedText: String = '';
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
  todayvisitor = [];
  public errormsg;
 


  

 
  constructor(private _gservice: GlobalService,private dialog: MatDialog,private dataservice:GenericService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // console.log(this.page);
    // console.log(this.limit);
    
    this.dataservice.page= this.page;
    this.dataservice.limit= this.limit;

    this.getTodaysvisitors();
    this.get_Companies();
  //  this.getvisitorsLogone();
  //  this.getvisitoring();
  }


  // getvisitorsLogone(){
  // this._gservice.getttingvis(this.data).subscribe(res=>{
  //   //console.log(this.data?.res?.length)
  //   this.data = res
  //   console.log('mm',res)
  // },error=>this.errormsg = error)
  // }


// getvisitoring(){
//   console.log('button working')
// this._gservice.gettodaysvisitors().subscribe((res:any)=>{
//   console.log(res),err=>{
//     console.log(err)
//   };
// })
// }

  getTodaysvisitors() {

    if(this.searchedText!=""){
      this._gservice.gettodaysvisitors().subscribe((res) => {

        console.log(res['message']);
        if(res['message']=="relogin"){
          this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
       }

       else{

        this.data = res['visitors']['results'];
        this.nextpage = res['visitors']?.next?.page
        this.nextlimit = res['visitors']?.next?.limit
        this.prepage = res['visitors']?.previous?.page
        this.prelimit = res['visitors']?.previous?.limit
        this.count = res['visitors']?.count;
       }


    })
    }
    else{
      this._gservice.gettodaysvisitors().subscribe((res) => {

        if(res['message']=="relogin"){
           this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
        }
        else{
          this.data = res['visitors']['results'];
          this.nextpage = res['visitors']?.next?.page
          this.nextlimit = res['visitors']?.next?.limit
          this.prepage = res['visitors']?.previous?.page
          this.prelimit = res['visitors']?.previous?.limit
          this.count = res['visitors']?.count;
        }
        

  
      })
    }

  }

  // to get the total companies list

  get_Companies() {
    this._gservice.getCompanies().subscribe((obj) => {
      // console.log(obj);
      this.companieslist = obj.res;
    });
  }

  // to update in-time

  updateintime(obj) {
    // console.log(obj);
    this._gservice.updatein_time(obj).subscribe((data) => {
      // console.log(data['res']);
      if (data['res'] == "updated") {
        this.ngOnInit();
      }

    });
  }

  // to update in-time

  updateouttime(obj) {

    // console.log(obj);
    this._gservice.updateout_time(obj).subscribe((data) => {
      // console.log(data['res']);
      if (data['res'] == "updated") {
        this.ngOnInit();
      }

    });
  }


  // __________ search filter__________
  applyfiltervehicle(){
  //  console.log('he')
      this.data = this.data.filter((ele) =>{
        //return ele.vehicle_number = this.searchedText.trim().toLowerCase()
        return ele.vehicle_number.indexOf(this.searchedText.toUpperCase()) > -1;
      });
    
   
  }





  applyFilter(event) {
    // console.log(event.target.value);
    this.dataservice.page= this.page;
    this.dataservice.limit= this.limit;
    this.searchedText=event.target.value;
    // this._gservice.gettodaysvisitors(event.target.value).subscribe((res) => {
    //   console.log(res.visitors);
    //   this.data = res.visitors;

    // })

  }
  clear() {
    this.searchedText = ""
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
                 // this.data = new MatTableDataSource(sezArray);
                // console.log("next")
                this.getTodaysvisitors()
                

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
                //  this.data = new MatTableDataSource( sezArray);
      
                // console.log("previous")
                this.getTodaysvisitors()
              

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
                this.getTodaysvisitors();
          

              }
          this.eventValue = true;

         

}
sortData(sort: Sort) {
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
      case 'vehicle_number':
        return compare(a.vehicle_number, b.vehicle_number, isAsc);
      case 'visit_date':
        return compare(a.visit_date, b.visit_date, isAsc);
      
      default:
        return 0;
    }
  });
}
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}