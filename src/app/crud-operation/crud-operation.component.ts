import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { CrudOperationService } from '../crud-operation.service';

@Component({
  selector: 'app-crud-operation',
  templateUrl: './crud-operation.component.html',
  styleUrls: ['./crud-operation.component.scss']
})

export class CrudOperationComponent implements OnInit {

  private details = [];
  private userDetails = [];
  private updateAddButton:boolean=true;
  private addButton:boolean=true;

  public editForm: FormGroup = new FormGroup({
    'userId': new FormControl(''),
    'id': new FormControl(),
    'title': new FormControl('', Validators.required),
    'body': new FormControl('', Validators.required),
  });

  constructor(private crudOperationService: CrudOperationService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getDetails();
    this.editForm.controls['userId'].setValue('');
  }

  getUsers() {
    this.crudOperationService.getUaser().subscribe(response => {
      this.userDetails = response;
    },
      error => {
      })
  }

  getDetails() {
    this.crudOperationService.get().subscribe(response => {
      this.details = response;
    },
      error => {
        alert('Somthing Roungh');
      })
  }

  deleteDetails(data) {
    this.crudOperationService.delete(data.id).subscribe(response => {
      this.getDetails();
      alert('Deleted sucessfully');
    },
      error => {
      })
  }

  editDetails(data) {
    this.updateAddButton=false;
    this.editForm.reset(data)
  }

  addUpdateDetails() {
    if (!this.editForm.value.id) {
      this.crudOperationService.add(this.editForm.value).subscribe(response => {
        this.updateAddButton=true;
        this.editForm.reset();
        this.editForm.controls['userId'].setValue('');
        this.getDetails();
        alert('Added sucessfully');
      }, error => {
        alert('Somthing Roungh');
      })
    }
    else {
      this.crudOperationService.update(this.editForm.value).subscribe(response => {
        this.updateAddButton=true;
        this.editForm.reset();
        this.editForm.controls['userId'].setValue('');
        this.getDetails();
        alert('Updated sucessfully');
      }, error => {
        alert('Somthing Roungh');
      })
    }
  }

  cancleUpdateAdd() {
    this.editForm.reset();
    this.updateAddButton=true;
    this.editForm.controls['userId'].setValue('');
  }

  public userTypesSelect(userId: number): any {
    return this.userDetails.find(x => x.id === userId)
  }

}
