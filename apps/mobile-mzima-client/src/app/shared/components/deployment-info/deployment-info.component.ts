import { Component, EventEmitter, Output } from '@angular/core';
import { Deployment } from '@mzima-client/sdk';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AlertService, DeploymentService, SessionService } from '@services';

@UntilDestroy()
@Component({
  selector: 'app-deployment-info',
  templateUrl: './deployment-info.component.html',
  styleUrls: ['./deployment-info.component.scss'],
})
export class DeploymentInfoComponent {
  @Output() deploymentClick = new EventEmitter();
  public deployment: Deployment | null;
  public isDeploymentOutdated = false;
  constructor(
    private deploymentService: DeploymentService,
    private sessionService: SessionService,
    private alertService: AlertService,
  ) {
    this.deploymentService.deployment$.pipe(untilDestroyed(this)).subscribe({
      next: (deployment) => {
        this.deployment = deployment;
        this.isDeploymentOutdated =
          this.sessionService.getSiteConfigurations().api_version !== 'v5';
      },
    });
  }

  public handleClick(): void {
    this.deploymentClick.emit();
  }

  public showDeploymentWarningInfo(event: Event): void {
    if (this.isDeploymentOutdated) {
      event.preventDefault();
      event.stopPropagation();
      this.alertService.presentAlert({
        icon: {
          name: 'warning',
          color: 'danger',
        },
        header: '¡Despliegue desactualizado!',
        message:
          'El despliegue no está actualizado, por lo que pueden producirse errores hasta que el administrador lo actualice.',
      });
    }
  }
}
