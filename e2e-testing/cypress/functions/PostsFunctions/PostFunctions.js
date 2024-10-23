/// <reference types="Cypress" />

import PostLocators from '../../locators/PostsLocators/PostLocators';

class PostFunctions {
  constructor() {
    this.postTitle = `Automated Title Response-${Math.floor(Math.random() * 900) + 100}`;
    this.postDescription = 'Automated Description Response';
  }
  open_post_creation_form() {
    cy.get(PostLocators.addPostBtn).click();
    cy.get(PostLocators.srvyItemBtn).click();
  }

  type_post_title(title) {
    cy.get(PostLocators.titleField).eq(0).type(title).should('have.value', title);
  }

  type_post_description(description) {
    cy.get(PostLocators.descField).type(description).should('have.value', description);
  }

  fill_required_form_fields() {
    this.type_post_title(this.postTitle);
    this.type_post_description(this.postDescription);
    cy.get(PostLocators.lngTextField).type('This is an automated long text response');
    cy.get(PostLocators.shtTextField).eq(1).type('Automated Short text');
    cy.get(PostLocators.decimalField).eq(2).type(99.9);
    cy.get(PostLocators.intField).eq(4).type(100);

    // click on date field to open pop up
    cy.get(PostLocators.dateField).eq(6).click();
    cy.get('.mat-button.mat-stroked-button').click(); // click on the checkmark button to select today's date
    cy.get(PostLocators.selectFieldBtn).click();
    cy.get(PostLocators.selectFieldOption1).click();
    cy.get(PostLocators.radioFieldOption2).click();
    cy.get(PostLocators.checkboxFieldOption3).click();
  }

  complete_add_post_steps() {
    cy.get(PostLocators.submitBtn).should('not.be.disabled');
    cy.get(PostLocators.submitBtn).click();
    cy.get(PostLocators.successButton).click();
  }

  verify_created_post_exists() {
    cy.get(PostLocators.surveySelectionList)
        .children(PostLocators.surveySelectItem)
        .contains("Full Length Survey-with image-field- don't delete")
        .click({force: true})
    cy.get(PostLocators.postPreview)
      .children(PostLocators.postItem)
      .contains(this.postTitle);
  }
}

export default PostFunctions;