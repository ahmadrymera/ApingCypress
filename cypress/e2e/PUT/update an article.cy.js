const { faker } = require("@faker-js/faker");
describe("Update an article", () => {
  it("Success update an article", () => {
    cy.fixture("token").then((token) => {
      // create an article first
      cy.request({
        url: "/article/create",
        method: "POST",
        headers: { Authorization: `Bearer ${token.Bearer}` },
        body: {
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(),
          picture: faker.internet.avatar(),
        },
      });
      // get the id from article we already create before
      cy.request({
        url: "/articles",
        method: "GET",
        headers: { Authorization: `Bearer ${token.Bearer}` },
      }).then((response) => {
        // use the id to update the article
        cy.request({
          url: `/article/edit/${response.body.result[response.body.result.length - 1].id}`,
          method: "PUT",
          headers: { Authorization: `Bearer ${token.Bearer}` },
          body: {
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(),
            picture: faker.internet.avatar(),
          },
        }).then((response) => {
          cy.log(response);
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Article has been updated");
        });
      });
    });
  });
});
