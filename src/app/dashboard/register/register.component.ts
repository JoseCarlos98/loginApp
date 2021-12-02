import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticate } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth-services.service';
import { DashboardService } from '../../services/dashboard.service';
import { Branch } from '../../interfaces/branch.interface';
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
  optionSelected: Origin[] = []
  nameNoVacio: any = /^[a-z ,.'-]+$/i;

  form: FormGroup = this.fb.group({
    branchId : ['',  Validators.required],
    name     : ['', [Validators.required, Validators.pattern(this.nameNoVacio)]],
  })

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.infoUser = this.authService.infoUser;
    this.getBranches();
    this.getAllOrigins();
  }

  // No hacer la validaciòn en el html y se vea mas limpio
  validate(campo:string){
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  // Opcion seleccionada del buscador la recibe aqui
  option(option:any){
      this.optionSelected = [];
      if (option.length > 0) {
            this.optionSelected = option;
            console.log(this.optionSelected);
      }
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
    };

    this.dashboardService.registerOrigin(this.body)
        .subscribe(resp=> {
          this.getAllOrigins();
          this.reset();
        })
  }

  getAllOrigins(){
    this.dashboardService.getOrigins()
    .subscribe(origins => {this.origins = origins;});
  }


  reset(){
    this.form.reset();
  }

  // Funcion para el boton eliminar y obtenga la informaciòn al actualizar
  rowSelected(branch:Branch, option?:string){
    this.branchSelected = branch;
    if (option) {
      this.form.reset(branch);
    }
  }

  delete(){
    this.dashboardService.deleteOrigins(this.branchSelected.id!)
        .subscribe(resp => {
          this.getAllOrigins();
        });
  }

  update(){
    const { name, branchId } = this.form.value;

    this.body = {
      branchId : branchId,
      createdById: this.infoUser.user.id,
      name
    };

    this.dashboardService.updateOrigins(this.body, this.branchSelected.id!)
        .subscribe(resp =>{
          this.reset();
          this.getAllOrigins();
        });
  }

}
