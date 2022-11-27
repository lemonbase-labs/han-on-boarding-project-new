const authFixture = {
  name: "park",
  password: "1234",
};

context("Auth", () => {
  it("enters into page", () => {
    cy.visit("/");
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/`);
    });
    cy.getByTestId("auth-page").should("be.visible");
  });

  it("redirects to auth page when unauthorized", () => {
    cy.visit("/review");
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/`);
    });
    cy.wait(1000);
  });

  it(`signup button is disabled when form isn't fulfilled`, () => {
    cy.getByTestId("signup-submit").should("have.attr", "disabled");
  });

  it("signup", () => {
    cy.getByTestId("signup-name-input").type(authFixture.name);
    cy.getByTestId("signup-password-input").type(authFixture.password);
    cy.getByTestId("signup-submit").should("not.have.attr", "disabled");
    cy.getByTestId("signup-submit").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/review`);
    });
  });

  it("logout", () => {
    cy.getByTestId("logout").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/`);
    });
  });

  it("login button is disabled when form isn't fulfilled", () => {
    cy.getByTestId("login-submit").should("have.attr", "disabled");
  });

  it("login", () => {
    cy.getByTestId("login-name-input").type(authFixture.name);
    cy.getByTestId("login-password-input").type(authFixture.password);
    cy.getByTestId("login-submit").should("not.have.attr", "disabled");
    cy.getByTestId("login-submit").click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq(`/review`);
    });
  });
});
