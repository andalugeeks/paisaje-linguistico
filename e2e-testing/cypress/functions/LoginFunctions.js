import LoginLocators from '../locators/LoginLocators';

class LoginFunctions {
  launch_login_modal(launchURL) {
    cy.visit(launchURL);
    this.click_through_onboarding();
    this.change_language();
    cy.get(LoginLocators.loginModal).click();
  }

  type_email(email) {
    cy.wait(1000);
    cy.get(LoginLocators.emailField).type(email, { force: true }).should('have.value', email);
  }

  type_password(password) {
    cy.get(LoginLocators.passwordField)
      .clear({ force: true })
      .type(password, { force: true })
      .invoke('val')
      .should('have.length.gte', 7);
  }

  click_login_button() {
    cy.get(LoginLocators.loginButton).click();
  }

  check_user_details_correct() {
    const name = Cypress.env('ush_admin_name');
    const email = Cypress.env('ush_admin_email');
    cy.viewport(1440, 900);
    cy.get(LoginLocators.userName).contains(name);
    cy.get(LoginLocators.userEmail).contains(email);
  }

  //quick-fix, change language to english after logging in
  change_language() {
    cy.get('.language__selected').click();
    cy.get('#mat-option-7 > .mat-option-text').click();
  }

  click_through_onboarding() {
    cy.get('#onboarding-button-greeting').click();
    cy.get('#onboarding-button-marker').click();
    cy.get('#onboarding-button-filters').click();
    cy.get('#onboarding-button-sorting').click();
    cy.get('#onboarding-button-activity').click();
    cy.get('#onboarding-button-collections').click();
    cy.get('#onboarding-button-clapper').click();
    cy.get(LoginLocators.declineCookiesBtn).click();
  }

  verify_invalid_email_error_exist() {
    cy.get(LoginLocators.emailField).blur();
    cy.get(LoginLocators.invalidEmail).should('be.visible');
  }

  verify_invalid_credentials_error_exist() {
    cy.get(LoginLocators.invalidCredentials).should('be.visible');
  }

  verify_login() {
    cy.get(LoginLocators.loginButton).should('not.exist');
    cy.get(LoginLocators.accountBtn).should('exist');
  }

  verify_negative_login() {
    this.launch_login_modal(Cypress.env('baseUrl'));
    this.type_email('test');
    this.verify_invalid_email_error_exist();
    cy.get(LoginLocators.emailField).type('@gmail.com');
    this.type_password('Password@@@2023');
    this.click_login_button();
    this.verify_invalid_credentials_error_exist();
  }

  logout() {
    cy.get(LoginLocators.accountInfoBtn).click();
    cy.get(LoginLocators.logOutBtn).click();
    cy.reload();
  }

  login_as_admin() {
    cy.session(
      [Cypress.env('ush_admin_email'), Cypress.env('ush_admin_pwd')],
      () => {
        this.launch_login_modal(Cypress.env('baseUrl'));
        this.type_email(Cypress.env('ush_admin_email'));
        this.type_password(Cypress.env('ush_admin_pwd'));
        this.click_login_button();
        this.verify_login();
        this.check_user_details_correct();
      },
      { cacheAcrossSpecs: true },
    );
  }

  login_member_user() {
    cy.session(
      [Cypress.env('ush_user_email'), Cypress.env('ush_user_pwd')],
      () => {
        this.launch_login_modal(Cypress.env('baseUrl'));
        this.type_email(Cypress.env('ush_user_email'));
        this.type_password(Cypress.env('ush_user_pwd'));
        this.click_login_button();
        this.verify_login();
      },
      { cacheAcrossSpecs: true },
    );
  }
}

export default LoginFunctions;
