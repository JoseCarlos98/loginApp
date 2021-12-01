import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticate } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth-services.service';
import { DashboardService } from '../../services/dashboard.service';
import { Branch } from '../../interfaces/branch.interface';
import { Router } from '@angular/router';
import * as moment from 'moment'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Origin } from 'src/app/interfaces/origin.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})




export class RegisterComponent implements OnInit {

  infoUser!: UserAuthenticate;
  body: object = {};
  branchSelected!: Branch;
  branchs: Branch[] = [];
  origins : Origin[] = [];

  form: FormGroup = this.fb.group({
    branchId : ['', Validators.required],
    newBranchId : [''],
    name     : ['Prueba 1', Validators.required],
  })

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.infoUser = this.authService.infoUser;
    this.getBranches();
    this.getAllOrigins()
  }

  validate(campo:string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched 
  }

  getBranches(){
    this.dashboardService.getBranches()
        .subscribe(branchs => {
          this.branchs = branchs;
        })
  }

  register(){
    const { name, branchId } = this.form.value;
    this.body = {
      branchId : branchId,
      createdById: this.infoUser.user.id,
      name
    }
    this.dashboardService.registerOrigin(this.body)
        .subscribe(resp=> {
          this.getAllOrigins();
        })
  }

  getAllOrigins(){
    this.dashboardService.getOrigins()
    .subscribe(origins => {
      this.origins = origins;
      console.log(origins);
      
    })
  }

  reset(){
    this.form.reset();
  }

  deleteOrigin(branch:Branch){
    this.branchSelected = branch;
  }
  
  updateOrigin(branch:Branch){
    this.branchSelected = branch;
    this.form.reset(this.branchSelected);
  }

  delete(){
    this.dashboardService.deleteOrigins(this.branchSelected.id!)
        .subscribe(resp => {
          this.getAllOrigins();
        })
  }

  update(){
    const { name, newBranchId } = this.form.value;
    
    this.body = {
      branchId : newBranchId,
      createdById: this.infoUser.user.id,
      name
    }

    this.dashboardService.updateOrigins(this.body, this.branchSelected.id!)
        .subscribe(resp =>{
          console.log(resp);
          this.reset();
          this.getAllOrigins();
        })
  }

}
