import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../controller/cadUser/registro.service';
import { FormGroup, FormBuilder, Validators, NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertasService } from '../../controller/alertas/alertas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {


  public fGroup: FormGroup;
  isLoadingResults = false;

  constructor(
    private cadService: RegistroService,
    private fBuilder: FormBuilder,
    private router: Router,
    public alertas: AlertasService

  ) {

    this.fGroup = this.fBuilder.group({
      'nome': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(250)])],
      'nascimento': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,50}$/i)])],
      'primeiroacesso': [null],
    });
  }

  ngOnInit() {
  }

  sendCadastro(form: NgForm) {

    this.isLoadingResults = true;
    this.fGroup.value.primeiroacesso = 0

    this.cadService.posRegistro(form).subscribe(
      res => {
        console.log(res);
        this.isLoadingResults = false;
        this.router.navigate(['/']);
      })
  }

}
