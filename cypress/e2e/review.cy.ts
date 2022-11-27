const personFixture = {
  name: "han",
  password: "1",
};

const reviewFixture = {
  name: "han's 2020 Q4 review",
  question: "what is your hobby",
  reviewees: ["han", "jake"],
  description: "describe your hobby",
};

type Fixture = typeof reviewFixture;

const reviewFixtureUpdated: Fixture = {
  name: "rob's 2021 Q1 review",
  question: "what is your taste of music",
  reviewees: ["han"],
  description: "describe your taste of music",
};

context("Review", () => {
  it("enters page", () => {
    cy.visit("/");
    cy.getByTestId("login-name-input").type(personFixture.name);
    cy.getByTestId("login-password-input").type(personFixture.password);
    cy.getByTestId("login-submit").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/review`);
    });
    cy.getByTestId("review-page").should("be.visible");
  });

  it("creates review", () => {
    cy.getByTestId("create-review").click();
    cy.getByTestId("edit-review").should("be.visible");
    cy.getByTestId("review-submit").should("have.attr", "disabled");
    cy.getByTestId("review-name-input").type(reviewFixture.name);
    cy.getByTestId("review-reviewee-select").click();
    reviewFixture.reviewees.forEach((reviewee) =>
      cy.getByTestId("review-reviewee-select-option").contains(reviewee).click()
    );
    cy.get("body").click("right");
    cy.getByTestId("review-question-input").type(reviewFixture.question);
    cy.getByTestId("review-description-input").type(reviewFixture.description);
    cy.getByTestId("review-submit").click();
    cy.getByClassName("review-created-toast").should("be.visible");
    cy.getByTestId("edit-review").should("not.exist");
  });

  const readReview = (fixture: Fixture) => {
    cy.getByTestId("review-list-item-name").contains(fixture.name).click();
    cy.getByTestId("edit-review").should("be.visible");
    cy.getByTestId("review-name-input").should("have.value", fixture.name);
    fixture.reviewees.forEach((reviewee) =>
      cy.getByTestId("review-reviewee-select").should("contain.text", reviewee)
    );
    cy.getByTestId("review-question-input").should(
      "have.value",
      fixture.question
    );
    cy.getByTestId("review-description-input").should(
      "have.value",
      fixture.description
    );
  };

  it("reads review", () => {
    readReview(reviewFixture);
  });

  it("updates review", () => {
    cy.getByTestId("review-name-input").clear().type(reviewFixtureUpdated.name);
    cy.getByClassName("ant-select-selection-item-remove").each((reviewee) => {
      cy.wrap(reviewee).click();
    });
    cy.getByTestId("review-reviewee-select").click();
    reviewFixtureUpdated.reviewees.forEach((reviewee) =>
      cy.getByTestId("review-reviewee-select-option").contains(reviewee).click()
    );
    cy.get("body").click("right");
    cy.getByTestId("review-question-input")
      .clear()
      .type(reviewFixtureUpdated.question);
    cy.getByTestId("review-description-input")
      .clear()
      .type(reviewFixtureUpdated.description);
    cy.getByTestId("review-submit").click();
    cy.getByClassName("review-updated-toast").should("be.visible");
    readReview(reviewFixtureUpdated);
  });

  it("deletes review", () => {
    cy.getByClassName("review-list-item")
      .contains(".review-list-item", reviewFixtureUpdated.name)
      .within(() => {
        cy.getByTestId("review-list-item-delete").click();
      });
    cy.getByClassName("review-deleted-toast").should("be.visible");
    cy.getByTestId("review-list-item-name").each((name) => {
      cy.wrap(name).should("not.have.text", reviewFixtureUpdated.name);
    });
  });
});
