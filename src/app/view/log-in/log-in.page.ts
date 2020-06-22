import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../controller/authService/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  public fGroup: FormGroup;
  isLoadingResults = false;
  submitted = false;
  error: string;
  returnUrl: string;

  constructor(
    private authLogin: AuthService,
    private fBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    // redireciona para home se já estiver logado
    if (this.authLogin.currentUserValue) {
      this.router.navigate(['/tabs']);
    }

  }

  ngOnInit() {

    this.fGroup = this.fBuilder.group({

      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,50}$/i)])]

    });
    // obtém o URL de retorno dos parâmetros da rota ou o padrão é '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tabs';
  }

  get formMetodo() {
    return this.fGroup.controls
  }

  onSubmit() {

    this.submitted = true
    //para aqui se o retorno do formulário for invalido
    if (this.fGroup.invalid) {
      return;
    }

    this.isLoadingResults = true;
    this.authLogin.getAcesse(this.formMetodo.email.value, this.formMetodo.password.value).pipe(first()).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        console.log(error);
        this.isLoadingResults = false;

      }
    );
  }

}
