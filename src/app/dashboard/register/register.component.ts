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
  branchs: any;
  origins: any;
  Suggestion: any = []
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
    this.getAllBranches();
    this.getAllOrigins();
  }

  validate(campo: string) {
    return this.form.controls[campo].errors && this.form.controls[campo].touched;
  }

  search(termino: string) {
    const query = this.apiServices.getQuery(termino, ['name'])
    const filter = {
      include: ["branch"],
      where: {
        or: query
      },
      sort: "createdAt ASC"
    }

    this.apiServices.getAll('Origins', filter)
      .subscribe(resp => {
        this.Suggestion = resp;
      })
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
      idOrigin = this.branchSelected.id;
    }

    this.apiServices.registerOrUpdate('Origins', this.body, idOrigin)
      .subscribe(_ => {
        this.getAllOrigins();
        this.reset();
        this.branchSelected.id = '';
      })
  }

  editRow(branch: Branch, option?: string) {
    this.branchSelected = branch;
    if (option) {
      this.form.reset(branch);
    }
  }

  reset() {
    this.form.reset();
  }

  delete() {
    this.apiServices.delete('Origins', this.branchSelected.id!)
      .subscribe(_ => { this.getAllOrigins() });
  }

  getAllOrigins() {
    const filter = { include: ["branch"] };
    this.apiServices.getAll('Origins', filter)
      .subscribe(origins => {
        this.origins = origins;
      })
  }

  getAllBranches() {
    this.apiServices.getAll('Branches')
      .subscribe(branchs => {
        this.branchs = branchs;
      })
  }

}