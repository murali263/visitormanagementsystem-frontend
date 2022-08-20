import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GenericService } from '../services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concat } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import {MatSort} from '@angular/material/sort'

@Component({
  selector: 'app-notlistedvisitors',
  templateUrl: './notlistedvisitors.component.html',
  styleUrls: ['./notlistedvisitors.component.scss']
})
export class NotlistedvisitorsComponent implements OnInit  {
  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  displayedColumns: string[] = ['fromcompname', 'tocompname', 'menmbers', 'vechileno', 'visitdate', 'visittime','checkin', 'checkout'];
  companieslist;
  data:MatTableDataSource<any>
  subdata=[];
  company_code='';
  company_name='';
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
  //pagesize;
  public pagesize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public start: Date = new Date (""); 
  public end: Date = new Date ("");
  constructor(private _gservice: GlobalService, public dataservice:GenericService,private _snackBar: MatSnackBar) { 
    
  }

  ngOnInit(): void {
    // console.log(this.page);
    // console.log(this.limit);
    
    this.dataservice.page= this.page;
    this.dataservice.limit= this.limit;
  
    this.get_Companies();
    this.getvisitorsLog()
    this.gettingvisitordata(obj);
  }

 


gettingvisitordata(obj){
  console.log('hello')
    
  this._gservice.getttingvis(obj).subscribe((res:any)=>{
    this.data = res.filter( vistorData =>  {
      let serDate = this.changeDate(vistorData.visit_date);
      if(this.company_code && this.start_date && this.end_date) {
        return (vistorData.company_code == this.company_code) && (this.start_date <= serDate &&  serDate <= this.end_date)
      } 
      else if(this.start_date && this.end_date) {
        return this.start_date <= serDate &&  serDate <= this.end_date;
      }
      else if(this.company_code) {
        return vistorData.company_code == this.company_code;
      }
      else {
        return true;
      }
    });

    this.data = res;
    this.data = new MatTableDataSource(res)
    this.data.sort = this.sort
    console.log('my name is murali',res)
  // console.log(res['visitors']);
  //   console.log(data),err=>{
  //     console.log(err)
  //   };
   })
}

filterProjects(filterVal: any){
if(filterVal ==0){
  this.companieslist = this.subdata
}
else{
  this.companieslist = this.subdata.filter((name)=>(name.company_name)==filterVal)
}
}


selected_company(event){

  console.log(event);
 this.company_name = event;
 //this.get_data();
 this.gettingvisitordata(obj)
   }

filterChange(event){
  console.log('dropdown')
  
}

  getvisitorsLog() {
    this._gservice.toget_vlognotin_out().subscribe((res) => {
      // console.log(res);

      // visitors: {next: {…}, results: Array(1), count: 1

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

  // to get the total companies list
  get_Companies() {
    this._gservice.getCompanies().subscribe((obj:any) => {
     console.log(obj);
      this.companieslist = obj
      //this.gettingvisitordata()
    });
  }
 

  applyFilter(filterValue:string){
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  // to update in-time

  updateintime(obj){
    // console.log(obj);
    this._gservice.updatein_time(obj).subscribe((data)=>{
      // console.log(data['res']);
      if(data['res']=="updated"){
      this.ngOnInit();
      }
      
    });
  }

    // to update in-time

    updateouttime(obj){

      // console.log(obj);
      this._gservice.updateout_time(obj).subscribe((data)=>{
        // console.log(data['res']);
        if(data['res']=="updated"){
        this.ngOnInit();
        }
        
      });
    }
    getDater(data?:any){
      // console.log(data);
      if(data.value != null){
        this.start_date=this.convert(data?.value[0]);
        this.end_date=this.convert(data?.value[1]);
      }
       else if(data.value == null){
        this.start_date="";
        this.end_date="";
      }
      
      // console.log(this.start_date);
      
     this.gettingvisitordata(obj)
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
    

    get_data(){
      this._gservice.getttingvis(this.company_name).subscribe((res)=>{
         console.log(res);
        this.data = res
        // this.nextpage = res['visitors']?.next?.page
        // this.nextlimit = res['visitors']?.next?.limit
        // this.prepage = res['visitors']?.previous?.page
        // this.prelimit = res['visitors']?.previous?.limit
        // this.count = res['visitors']?.count;
        
      })
    }

    getPageLimit(event?:any) {
      this.page=event?.pageIndex + 1;
      this.limit=event?.pageSize
      console.log(this.page,this.limit);
      
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
                    this.dataSource = new MatTableDataSource(sezArray);
                  // console.log("next")
                  this.get_data()
                  
  
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
                    this.dataSource = new MatTableDataSource( sezArray);
        
                  // console.log("previous")
                  this.get_data()
                
  
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
                    this.dataSource = new MatTableDataSource( sezArray);
        
                  // console.log("current")
                  this.get_data();
            
  
                }
            this.eventValue = true;
  
           
  
  }

}
function obj(obj: any) {
  throw new Error('Function not implemented.');
}