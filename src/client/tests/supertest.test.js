const request = require("supertest");
const app = require("../../server/server"); // Adjust the path if necessary

let server;

describe("Express Server", () => {
  // Start the server before running the tests
  beforeAll((done) => {
    server = app.listen(4000, done); // Start the server on a specific port
  });

  // Close the server after running the tests
  afterAll((done) => {
    server.close(done);
  });

  it("should respond with status 200 for the root route", async () => {
    const response = await request(server).get("/");
    expect(response.status).toBe(200);
  });
});
