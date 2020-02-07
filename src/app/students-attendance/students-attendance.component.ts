import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-students-attendance',
  templateUrl: './students-attendance.component.html',
  styleUrls: ['./students-attendance.component.css']
})
export class StudentsAttendanceComponent implements OnInit {
  @ViewChildren('check1') check: QueryList<any>
  studentsNames = [];
  check1;
  

  constructor(private userApi:UserService) { 
    this.getStudentsNames();
  }

  ngOnInit() {
  }
  checkAll(event){ 
    console.log(event);
   if(event.target.checked){
  this.check.forEach(eve=>{(eve.nativeElement.checked = true)});
  
   }
   else{
     this.check.forEach(eve=>{(eve.nativeElement.checked = false)});
   }
  }

  getStudentsNames(){
    this.userApi.getStudentsNames()
    .subscribe(data=>{
      this.studentsNames = data;
      console.log(this.studentsNames);
    })
  }

  checkboxChange(student_name){
    console.log(this.check1);
    let studentName = student_name;
    console.log(studentName);
  }

}
