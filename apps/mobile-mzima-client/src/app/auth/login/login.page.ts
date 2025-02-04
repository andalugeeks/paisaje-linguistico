import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { regexHelper } from '@helpers';
import { AlertService, AuthService, DeploymentService, SessionService } from '@services';
import { fieldErrorMessages } from '@helpers';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(regexHelper.emailValidate())]],
    password: ['', [Validators.required]],
  });
  public forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern(regexHelper.emailValidate())]],
  });
  public isForgotPasswordModalOpen = false;
  public loginError: string;
  public forgotPasswordError: string;
  public fieldErrorMessages = fieldErrorMessages;
  public isPrivate = true;
  public adminEmail = '';

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router,
    private deploymentService: DeploymentService,
    private sessionService: SessionService,
  ) {
    const siteConfig = this.sessionService.getSiteConfigurations();
    this.isPrivate = !!siteConfig.private;
    this.adminEmail = siteConfig.email ?? '';

    this.sessionService.siteConfig$.pipe(untilDestroyed(this)).subscribe({
      next: (config) => {
        this.isPrivate = !!config.private;
        this.adminEmail = config.email ?? '';
      },
    });
  }

  public login(): void {
    const { email, password } = this.form.value;
    if (!email || !password) return;
    this.form.disable();
    this.authService.login(email, password).subscribe({
      next: () => {
        this.form.enable();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loginError = err.error.message;
        this.form.enable();
        setTimeout(() => (this.loginError = ''), 4000);
      },
    });
  }

  public forgotPassword(): void {
    const { email } = this.forgotPasswordForm.value;
    if (!email) return;
    this.forgotPasswordForm.disable();
    this.authService.resetPassword({ email }).subscribe({
      next: async () => {
        await this.alertService.presentAlert({
          header: 'Mira en tu correo',
          message:
            "T'emo mandao un enlaçe de rêttableçimiento de contraçeña ar correo elêttrónico. Exa'r bîttaço y çige lâ indicaçionê.",
        });
        this.router.navigate(['auth/login']);
        this.forgotPasswordForm.reset();
        this.forgotPasswordForm.enable();
        this.isForgotPasswordModalOpen = false;
      },
      error: (err) => {
        this.forgotPasswordError = err?.error?.message ?? err?.message;
        this.forgotPasswordForm.enable();
        setTimeout(() => (this.forgotPasswordError = ''), 4000);
      },
    });
  }

  public openForgotPasswordModal(): void {
    this.isForgotPasswordModalOpen = true;
    if (this.form.value.email?.length) {
      this.forgotPasswordForm.patchValue({ email: this.form.value.email });
    }
  }

  public chooseDeployment(): void {
    this.deploymentService.removeDeployment();
    this.router.navigate(['deployment']);
  }

  public forgotPasswordModalCloseHandle(): void {
    this.isForgotPasswordModalOpen = false;
    this.forgotPasswordForm.reset();
  }
}
