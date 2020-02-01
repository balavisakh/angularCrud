import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-students-attendance',
  templateUrl: './students-attendance.component.html',
  styleUrls: ['./students-attendance.component.css']
})
export class StudentsAttendanceComponent implements OnInit {
  @ViewChild('check1',{static:true}) check: ElementRef
  studentsNames = [];
  

  constructor(private userApi:UserService) { 
    this.getStudentsNames();
  }

  ngOnInit() {
  }

  checkAll(event){
   if(event.target.checked){
     this.check.nativeElement.checked = true;
   }
   else{
     this.check.nativeElement.checked = false;
   }
  }

  getStudentsNames(){
    this.userApi.getStudentsNames()
    .subscribe(data=>{
      this.studentsNames = data;
      console.log(this.studentsNames);
    })
  }

}
