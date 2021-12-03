import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthenticate } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth-services.service';
import { apiService } from '../../services/api.service';
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
  branchSelected: any
  properties: string[] = [];
  branchs: Branch[] = [];
  origins: Origin[] = [];
  optionSelected: Origin[] = []
  nameNoVacio: any = /^[a-z ,.'-]+$/i;

  form: FormGroup = this.fb.group({
    branchId: ['', Validators.required],
    name: ['', [Validators.required, Validators.pattern(this.nameNoVacio)]],
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private apiServices: apiService) { }

  ngOnInit(): void {
    this.infoUser = this.authService.infoUser;
    this.getBranches();
    this.getAllOrigins();
  }

  validate(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  search(termino: string) {
    console.log('recibido', termino);
  }


  sugerencia(termino: string) {
    console.log(termino);
    this.properties = [
      'name',
    ];

    const query = this.apiServices.getQuery(termino, this.properties)
    this.apiServices.getSuggestion(query)
      .subscribe(resp => {
        console.log(resp);
      })
  }

  getBranches() {
    this.apiServices.getBranches()
      .subscribe(branchs => { this.branchs = branchs })
  }

  registerOrUpdate() {
    const { name, branchId } = this.form.value;
    let idOrigin = '';

    this.body = {
      branchId: branchId,
      createdById: this.infoUser.user.id,
      name
    };

    if (this.branchSelected) {
      idOrigin = this.branchSelected.id
    }

    this.apiServices.registerOrigin(this.body, idOrigin)
      .subscribe(resp => {
        this.getAllOrigins();
        this.reset();
      })

    this.branchSelected.id = ''
  }

  editRow(branch: Branch, option?: string) {
    this.branchSelected = branch;
    if (option) {
      this.form.reset(branch);
    }
  }

  getAllOrigins() {
    this.apiServices.getOrigins()
      .subscribe(origins => {
        this.origins = origins;
      });
  }

  reset() {
    this.form.reset();
  }

  delete() {
    this.apiServices.deleteOrigins(this.branchSelected.id!)
      .subscribe(resp => { this.getAllOrigins() });
  }
}
