const { faker } = require("@faker-js/faker");
describe("Create an article", () => {
  it("Success create an article", () => {
    cy.fixture("token").then((token) => {
      cy.request({
        url: "/article/create",
        method: "POST",
        headers: { Authorization: `Bearer ${token.Bearer}` },
        body: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(),
          picture: faker.internet.avatar(),
        },
      }).then((response) => {
        cy.log(response);
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Article has been created");
      });
    });
  });
});
