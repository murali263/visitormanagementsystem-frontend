import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent implements OnInit {
  // public dialogRef: MatDialogRef<DeletedialogComponent>;
  constructor(public dialogRef: MatDialogRef<DeletedialogComponent>,    @Inject(MAT_DIALOG_DATA) public deleteObj) { }

  ngOnInit(): void {
  }
  delete(data){
    // console.log(data)
    this.dialogRef.close(data);
  }

}
