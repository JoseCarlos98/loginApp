import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticate } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth-services.service';
import { DashboardService } from '../../services/dashboard.service';
import { Branch, Origin } from '../../interfaces/branch.interface';
import { Router } from '@angular/router';
import * as moment from 'moment'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})




export class RegisterComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  infoUser!: UserAuthenticate;
  body: object = {};
  branchSelected!: Branch;
  branchs: Branch[] = [];
  origins : Origin[] = [];

  fecha : any

  form: FormGroup = this.fb.group({
    branchId : ['', Validators.required],
    branchId2 : [''],
    name     : ['Prueba 1', Validators.required],
  })

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dashboardService: DashboardService,
              private router:Router) { }

  ngOnInit(): void {
    this.infoUser = this.authService.infoUser;
    
    this.getBranches();
    this.getAllOrigins()
  }

  getBranches(){
    this.dashboardService.getBranches()
        .subscribe(branchs => {
          this.branchs = branchs;
          // console.log(branchs);
          
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
          console.log(resp);
          
          this.getAllOrigins();
        })
  }

  getAllOrigins(){
    this.dashboardService.getOrigins()
    .subscribe(origins => {
      // this.origins = origins;
      console.log(this.origins);
      
    })
  }

  reset(){
    this.form.reset();
  }

  deleteBranch(branch:Branch){
    this.branchSelected = branch;
    
  }
  
  updateBranch(branch:Branch){
    this.branchSelected = branch;
    this.form.reset(this.branchSelected);

    console.log(branch);
  }

  delete(){
    this.dashboardService.deleteOrigins(this.branchSelected.id!)
        .subscribe(resp => {
          this.getAllOrigins();
        })
  }

  update(){
    const { name, branchId } = this.form.value;

    this.body = {
      branchId : branchId,
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
