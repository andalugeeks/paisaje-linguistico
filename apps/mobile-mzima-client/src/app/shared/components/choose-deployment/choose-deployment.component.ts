import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { Deployment } from '@mzima-client/sdk';
import { Subject, debounceTime } from 'rxjs';
import {
  AlertService,
  AuthService,
  ConfigService,
  DeploymentService,
  EnvService,
  IntercomService,
} from '@services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getDeploymentAvatarPlaceholder, fieldAppMessages } from '@helpers';

@UntilDestroy()
@Component({
  selector: 'app-choose-deployment',
  templateUrl: './choose-deployment.component.html',
  styleUrls: ['./choose-deployment.component.scss'],
})
export class ChooseDeploymentComponent {
  @Input() isProfile: boolean;
  @Output() back = new EventEmitter();
  @Output() chosen = new EventEmitter();
  @ViewChild('layout') public layout: MainLayoutComponent;
  public isSearchView = false;
  public deploymentList: Deployment[] = [];
  public foundDeploymentList: Deployment[] = [];
  private selectedDeployments: Deployment[] = [];
  public isDeploymentsLoading = false;
  public addButtonVisible = false;
  public currentDeploymentId?: number;
  private domain: string | null = null;
  private readonly searchSubject = new Subject<string>();
  public fieldAppMessages = fieldAppMessages;

  constructor(
    private envService: EnvService,
    private configService: ConfigService,
    private deploymentService: DeploymentService,
    private alertService: AlertService,
    private authService: AuthService,
    private intercomService: IntercomService,
  ) {
    this.searchSubject.pipe(debounceTime(500)).subscribe({
      next: (query: string) => {
        this.deploymentService.searchDeployments(query).subscribe({
          next: (deployments: any[]) => {
            this.isDeploymentsLoading = false;
            this.foundDeploymentList = deployments;
          },
          error: (err: any) => {
            this.isDeploymentsLoading = false;
            console.log(err);
          },
        });
      },
    });

    this.deploymentService.deployment$.pipe(untilDestroyed(this)).subscribe({
      next: (deployment) => {
        this.currentDeploymentId = deployment?.id;
      },
    });
  }

  public backHandle(): void {
    this.back.emit();
  }

  public loadDeployments() {
    this.deploymentList = this.deploymentService.getDeployments();

    if (this.deploymentService.hasDuplicates(this.deploymentList)) {
      this.deploymentService.setDeployments(
        this.deploymentService.removeDuplicates(this.deploymentList),
      );
      this.deploymentList = this.deploymentService.getDeployments();
    }

    // Paisaje-Linguistico personalisation.
    // Enforce andaluh.api.ushahidi.io as default deployment.
    const index = this.deploymentList.findIndex(
      (i: any) => i.deployment_name === 'Paisaje Lingüístico Andaluz',
    );
    if (index === -1) {
      this.deploymentList = [
        {
          id: 1,
          domain: 'api.ushahidi.io',
          subdomain: 'andaluh',
          fqdn: 'andaluh.api.ushahidi.io',
          status: 'deployed',
          deployment_name: 'Paisaje Lingüístico Andaluz',
          description: 'La lengua andaluza en las calles de Andalucía',
          avatar: getDeploymentAvatarPlaceholder('mzima-api'),
          tier: 'level_1',
          selected: false,
        },
        ...this.deploymentList,
      ];
      this.deploymentService.setDeployments(this.deploymentList);
    }
  }

  public async callModal(event: any) {
    const result = await this.alertService.presentAlert({
      header: fieldAppMessages('choose_deployment_components_remove_deployment_alert_header'),
      message: fieldAppMessages('choose_deployment_components_remove_deployment_alert_message'),
      buttons: [
        {
          text: fieldAppMessages(
            'choose_deployment_components_remove_deployment_alert_cancel_button_text',
          ),
          role: 'cancel',
        },
        {
          text: fieldAppMessages(
            'choose_deployment_components_remove_deployment_alert_confirm_button_text',
          ),
          role: 'confirm',
          cssClass: 'danger',
        },
      ],
    });

    if (result.role === 'confirm') {
      const { deployment } = event;
      this.removeDeployment(deployment.id);
    }
  }

  public removeDeployment(deploymentId: number) {
    const index = this.deploymentList.findIndex((i: any) => i.id === deploymentId);
    if (index !== -1) this.deploymentList.splice(index, 1);
    this.deploymentService.setDeployments(this.deploymentList);
  }

  public async chooseDeployment(deployment: Deployment) {
    const currentDeployment = this.deploymentService.getDeployment() ?? null;
    this.authService.logout();
    this.deploymentService.setDeployment(deployment);
    this.envService.setDynamicBackendUrl();
    try {
      await this.configService.initAllConfigurations();
      deployment.isOutdated = false;
      this.deploymentService.updateDeployment(deployment.id, { isOutdated: false });
      this.chosen.emit();
    } catch (error: any) {
      if (error.status === 404) {
        deployment.isOutdated = true;
        this.deploymentService.updateDeployment(deployment.id, { isOutdated: true });
        this.showDeploymentOutdatedWarning();
        this.deploymentService.setDeployment(currentDeployment);
        this.envService.setDynamicBackendUrl();
        await this.configService.initAllConfigurations();
      }
    }
  }

  private showDeploymentOutdatedWarning(): void {
    this.alertService.presentAlert({
      icon: {
        name: 'warning',
        color: 'danger',
      },
      header: fieldAppMessages('choose_deployment_components_deployment_outdated_alert_header'),
      message: fieldAppMessages('choose_deployment_components_deployment_outdated_alert_message'),
      buttons: [
        {
          text: fieldAppMessages(
            'choose_deployment_components_deployment_outdated_alert_contact_us_button_text',
          ),
          cssClass: 'medium',
          handler: () => {
            this.intercomService.displayMessenger();
          },
        },
        {
          text: 'Ok',
          cssClass: 'primary',
        },
      ],
    });
  }

  public selectDeployment(event: any) {
    const { checked, deployment } = event;
    if (checked) {
      if (this.selectedDeployments.some((i: any) => i.id === deployment.id)) {
        return;
      }
      this.selectedDeployments.push(deployment);
    } else {
      const index = this.selectedDeployments.findIndex((i: any) => i.id === deployment.id);
      if (index !== -1) {
        this.selectedDeployments.splice(index, 1);
      }
    }
    this.addButtonVisible = !!this.selectedDeployments.length;
  }

  public searchDeployments(query: string | null): void {
    if (query == null) {
      this.isDeploymentsLoading = false;
      this.foundDeploymentList = [];
      this.domain = null;
    } else if (
      query.indexOf('.') != -1 ||
      query.indexOf('http:') != -1 ||
      query.indexOf('https:') != -1
    ) {
      this.isDeploymentsLoading = false;
      this.foundDeploymentList = [];
      this.domain = query.toLowerCase().replace('http://', '').replace('https://', '');
      this.searchSubject.next(this.deploymentService.removeDomainForSearch(this.domain));
    } else if (query.length > 0) {
      this.isDeploymentsLoading = true;
      this.domain = null;
      this.searchSubject.next(query);
    } else {
      this.isDeploymentsLoading = false;
      this.foundDeploymentList = [];
    }
  }

  public addDeployment(): void {
    this.deploymentService.addDeployments(this.selectedDeployments);
    this.layout.closeSearchForm();
    this.foundDeploymentList = [];
    this.addButtonVisible = false;
    this.loadDeployments();
  }
}
