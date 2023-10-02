const { faker } = require("@faker-js/faker");

describe("get a single article", () => {
  it("Success get a single article data", () => {
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
        // use the id to get the data
        cy.request({
          url: `/article/${response.body.result[response.body.result.length - 1].id}`,
          method: "GET",
          headers: { Authorization: `Bearer ${token.Bearer}` },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq("Success");
          expect(response.body.result[0].id).to.eq(response.body.result[response.body.result.length - 1].id);
        });
      });
    });
  });
});
