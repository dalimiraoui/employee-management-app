import { Component, OnInit } from '@angular/core';
import { EmployeeOutputDTO } from 'src/app/shared/dto/output/EmployeeOutputDTO';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeOutputDTO[] = [];

  //---- For Pagination Purpose
  itemsPerPage = 5;
  itemsEmployeesNumber=5;
  totalEmployees = 100;
  currentPage: number =1; // Default value of 1
  pageSize : number =5;

  constructor( private employeeService : EmployeeService){}

  ngOnInit() {
    this.loadEmployees(this.currentPage,this.itemsPerPage); // Load employees when the component initializes
  }

  loadEmployees( pageNumber: number,pageSize: number,) {
    // Use the getEmployees method from EmployeeService to retrieve employees
    this.employeeService.getEmployees(pageNumber, pageSize)
      .subscribe((data: EmployeeOutputDTO[]) => {
        this.employees = data; // Update the employees array with the retrieved data
        console.log(this.employees)
      });
  }

  get totalPages(): number {
    return Math.ceil(this.totalEmployees / this.itemsPerPage);
  }

  changePage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(this.totalEmployees / this.itemsPerPage)) {
      this.currentPage = pageNumber;
      this.loadEmployees( this.currentPage,this.pageSize,);
    }
  }
}
