import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  healthPlans=[
    {
      id:1,
      descricao:'Plano 100 de saude'
    },
    {
      id:2,
      descricao:'Plano 200 de saude'
    },
    {
      id:3,
      descricao:'Plano 300 de saude'
    }
  ]

  dentalPlans=[
    {
      id:1,
      descricao:'Plano Basic'
    },
    {
      id:2,
      descricao:'Plano Medium'
    },
    {
      id:3,
      descricao:'Plano Premium'
    }
  ]

  formUser:FormGroup;

  editUser: boolean = false;

  constructor(
    public dialogRef:MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit() {
    this.buildForm();
    if(this.data && this.data.name){
      this.editUser = true
    }
  }


  saveUser(){
    const objUserForm: User= this.formUser.getRawValue()

    if(this.data && this.data.name){
      //edit user
      this.userService.update(this.data.firebaseId, objUserForm).then(
        (response:any)=>{
          window.alert('Utilizador Editado com sucesso!')
          this.closeModal()
        }
      ).catch
        (err=>{
          window.alert('Erro ao Editar o utilizador!')
          console.error(err)
        }
      )
    }else{  
      //save user
      this.userService.addUser(objUserForm).then(
        (response:any)=>{
          window.alert('Utilizador cadastrado com sucesso!')
          this.closeModal()
        }
      ).catch
        (err=>{
          window.alert('Erro ao cadastrar o utilizador!')
          console.error(err)
        }
      )
    }

  }

  buildForm(){
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    })

    if(this.data && this.data.name){
      this.fillForm()
    }
  }

  //fil form for update
  fillForm(){
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan:this.data.healthPlan,
      dentalPlan:this.data.dentalPlan
      
    })
  }

  closeModal(){this.dialogRef.close();}

}
