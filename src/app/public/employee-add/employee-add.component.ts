import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeInputDTO } from 'src/app/shared/dto/input/EmployeeInputDTO';
import { PatternsRegister } from 'src/app/shared/dto/register/patternsRegister';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  buttonClicked = false;
  isRegisterFailed= false;

  constructor(private router: Router){}


  registerForm = new FormGroup({
    
    firstName:  new FormControl('', [
      Validators.required,
      Validators.pattern(PatternsRegister.TextPattern),
    ]),
    lastName:  new FormControl('', [
      Validators.required,
      Validators.pattern(PatternsRegister.TextPattern),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(150),
      Validators.pattern(PatternsRegister.EmailAddress)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    address:  new FormControl('', [
      Validators.required,
    ]),
    dateOfBirth:  new FormControl('', [
      Validators.required,
    ]),
    salary:  new FormControl('', [
      Validators.required,
    ]),
  }
  );

  get rf(){
    return this.registerForm.controls;
  }


 ///*\*----- for the image uploading  
  imageUrl: string = '../assets/images/avatars/placeholder.png'; // Default image URL

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  ResetPhoto()
  {
    this.imageUrl= '../assets/images/avatars/placeholder.png';
  }

  onSubmit()
  {
    
    if (this.buttonClicked) {
      return;
    }
    this.buttonClicked = true;
    
    if (this.registerForm.invalid  ) {
     
      this.buttonClicked = false;
      return;
    }
    
    this.isRegisterFailed=false;
    const input : EmployeeInputDTO ={
      imageUrl: '',
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      contactNumber: this.registerForm.value.phone!,
      age: this.calculateAge(this.registerForm.value.dateOfBirth!),
      dob: this.registerForm.value.dateOfBirth!,
      salary: parseFloat(this.registerForm.value.salary!) ,
      address: this.registerForm.value.address!,
    };
    console.log("Employee",input);
    
    //Display loading modal with SweetAlert2 ( Usually I use spinner for this kind of actions )
    
    // Swal.fire({
    //   title: 'Adding a new Employee',
    //   text: 'Please wait...',
    //   allowOutsideClick: false, //to  Prevent user interaction
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    
    // Call the method from the emplyee.server that communicates with the backend to create the employee
    
    // stop the spinner or the sweat alerte
    //Swal.close();

    // case the success operation 
    Swal.fire({
      title: 'Adding a new Employee',
      text: 'Do you want to stay on this page or leave?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Stay',
      cancelButtonText: 'Quit',
    }).then((result) => {
      if (result.isConfirmed) {
        this.registerForm.reset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/public']);
      }
    });
    

  }

//Calculate the Employee Age based on the given dateOfBirth 
  calculateAge(dateOfBirthStr: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirthStr);

  const yearsDiff = today.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has occurred this year
  const hasBirthdayOccurred = (
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
  );

  // Subtract 1 from age if the birthday hasn't occurred yet this year
  const age = hasBirthdayOccurred ? yearsDiff : yearsDiff - 1;

  return age;
  }

}
