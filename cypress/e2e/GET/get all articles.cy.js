describe("Get all articles", () => {
  it("Success get all articles", () => {
    cy.fixture("token").then((token) => {
      cy.request({
        url: "/articles",
        method: "GET",
        headers: { Authorization: `Bearer ${token.Bearer}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Success");
        expect(response.body.result).to.be.an("array");
      });
    });
  });
});
