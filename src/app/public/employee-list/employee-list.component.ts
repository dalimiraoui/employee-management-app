import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeOutputDTO } from 'src/app/shared/dto/output/EmployeeOutputDTO';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  employees: EmployeeOutputDTO[] = [];
  unFilteredEmployees: EmployeeOutputDTO[] = [];
  filteredEmployees: EmployeeOutputDTO[] = []; // Filtered employees list
  minAge: number =0;
  maxAge: number =100;
  minSalary: number =0;
  maxSalary: number =1000;
  //---- For Pagination Purpose
  itemsPerPage = 10;
  itemsEmployeesNumber=10;
  totalEmployees = 1000;
  currentPage: number =1; // Default value of 1
  pageSize : number =10;

  constructor( 
               private employeeService : EmployeeService,
               private router: Router
             ){}

  ngOnInit() {
    this.loadEmployees(this.currentPage,this.itemsPerPage); // Load employees when the component initializes
  }

  loadEmployees( pageNumber: number,pageSize: number,) {
    // Use the getEmployees method from EmployeeService to retrieve employees
    this.employeeService.getEmployees(pageNumber, pageSize)
      .subscribe((data: EmployeeOutputDTO[]) => {
        this.employees = data; // Update the employees array with the retrieved data
        console.log(this.employees)
        this.itemsEmployeesNumber= this.employees.length;
        this.unFilteredEmployees=data;
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

  // Delete an Employee
  deleteEmployee(employee: EmployeeOutputDTO) {
  this.sweetAlert2(employee);
  
}

/**----this is for a sweat alert  method for employee deleting----*/

sweetAlert2(employee: EmployeeOutputDTO) {
  const swalWithTailwindButtons = Swal.mixin({
    customClass: {
      confirmButton: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-4",
      cancelButton: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    },
    buttonsStyling: false
  });
  

  swalWithTailwindButtons.fire({
      title:
        "Are you sure you want to delete this ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: false
    })
    .then((result) => {
      if (result.isConfirmed) {

        // Basically here the method of delete employee from the employee.service will be called 
        // Find the index of the employee to delete
        const index = this.employees.findIndex((emp) => emp.id === employee.id);

        if (index !== -1) {
          // Remove the employee from the employees array
          this.employees.splice(index, 1); 
            // if the delete is successfully done this message will be displayed
                swalWithTailwindButtons.fire(
                  "Deleted!",
                  "The employee has been deleted.",
                  "success"
                ); 
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithTailwindButtons.fire("Cancelled", "", "error");
      }
    });
  }

  // Function to handle dropdown change
  onItemsPerPageChange() {
    console.log(this.itemsPerPage)
    this.pageSize=this.itemsPerPage;
    this.currentPage=1;
    this.loadEmployees(this.currentPage,this.itemsPerPage);
  }

  // Filter function
  applyFilters() {
    // Since I Can not modify the backend and I only have access for an endpoint that retrieve the data without filtering I am going to filter only the employees returned for each page
    this.employees=this.unFilteredEmployees;
    this.filteredEmployees = this.employees.filter((employee) => {
      return (
        employee.age >= this.minAge &&
        employee.age <= this.maxAge &&
        employee.salary >= this.minSalary &&
        employee.salary <= this.maxSalary
      );
    });
    this.employees=this.filteredEmployees;
  }

  // Sort employees By FirstName 
  sortEmployeesByNameAsc()
  {
    this.employees.sort((a, b) => {
      
        return a.firstName.localeCompare(b.firstName);
      
    });
  }
  sortEmployeesByNameDesc()
  {
    this.employees.sort((a, b) => {
      return b.firstName.localeCompare(a.firstName);
   });

  }
  // Sort employees By Date of birth 
  sortEmployeesByDateOfBirthAsc()
  {
    this.employees.sort((a, b) => {
      const dateA = new Date( a.dob.split('/').reverse().join('-'));
      const dateB = new Date(b.dob.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
      
    });
  }
  sortEmployeesByDateOfBirthDesc()
  {
    this.employees.sort((a, b) => {
      const dateA = new Date( a.dob.split('/').reverse().join('-'));
      const dateB = new Date(b.dob.split('/').reverse().join('-'));
      return dateB.getTime() - dateA.getTime();
      
   });

  }
  // Sort employees By Age 
  sortEmployeesByAgeAsc() {
    this.employees.sort((a, b) => {
      return a.age - b.age;
    });
  }

  sortEmployeesByAgeDesc() {
    this.employees.sort((a, b) => {
      return b.age - a.age;
    });
  }

  // Sort employees By Address 
  sortEmployeesByAddressAsc()
  {
    this.employees.sort((a, b) => {
      
        return a.address.localeCompare(b.address);
      
    });
  }
  sortEmployeesByAddressDesc()
  {
    this.employees.sort((a, b) => {
      return b.address.localeCompare(a.address);
   });

  }
  // Sort employees By Salary in Ascending Order
sortEmployeesBySalaryAsc() {
  this.employees.sort((a, b) => {
    return a.salary - b.salary;
  });
}

// Sort employees By Salary in Descending Order
sortEmployeesBySalaryDesc() {
  this.employees.sort((a, b) => {
    return b.salary - a.salary;
  });
}

 // Naviage to Edit Page 
 goToEditPage( employee : EmployeeOutputDTO)
 {
  console.log(employee);
  //this.router.navigate(['/public/edit-employee'], { state: { employee: employee } });
 }

}
