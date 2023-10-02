const { faker } = require("@faker-js/faker");

describe("delete a single article", () => {
  it("Success delete a single article", () => {
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
      // get the id of the article we already create in first step
      cy.request({
        url: "/articles",
        method: "GET",
        headers: { Authorization: `Bearer ${token.Bearer}` },
      }).then((response) => {
        // use the id to delete the data
        cy.request({
          url: `/article/delete/${response.body.result[response.body.result.length - 1].id}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${token.Bearer}` },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Article has been deleted");
        });
      });
    });
  });
});
