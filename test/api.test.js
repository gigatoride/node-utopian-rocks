const utopian = require("../src/api");

jest.setTimeout(30000);

// Retrieve projects statistics
test("returns true for username favcau as a moderator", async () => {
  expect(await utopian.isModerator("favcau")).toBe(true);
});

test("returns an array for projects statistics by status and category", async () => {
  expect(Array.isArray(await utopian.stats.getProjects("social", true))).toBe(
    true
  );
});

// Retrieve contributors statistics
test("returns an array of objects for contributors statistics by status and category", async () => {
  expect(
    Array.isArray(
      await utopian.stats.getContributors("social", "reviewed", false)
    )
  ).toBe(true);
});

// Retrieve moderators
test("returns an array for all moderators", async () => {
  expect(Array.isArray(await utopian.getModerators())).toBe(true);
});

// Retrieve posts by category and status
test("returns an array of objects for posts by category.", async () => {
  expect(Array.isArray(await utopian.getPosts("task-copywriting"))).toBe(true);
});

// Retrieve posts by category and status
test("returns an array of objects for posts by category, status", async () => {
  expect(
    Array.isArray(await utopian.getPosts("task-copywriting", "reviewed"))
  ).toBe(true);
});

// Retrieve posts by category,status,staff_picked
test("returns an array of objects for posts by category, status, staff picks", async () => {
  expect(
    Array.isArray(
      await utopian.getPosts("development", "pending", null, null, true)
    )
  ).toBe(true);
});

// Retrieve posts by category,status,staff_picked
test("returns an array of objects for posts by category, status, author, non-staff picks", async () => {
  expect(
    Array.isArray(
      await utopian.getPosts(
        "development",
        "reviewed",
        "gigatoride",
        null,
        false
      )
    )
  ).toBe(true);
});

// Retrieve all pending posts
test("returns an array of objects for all posts by status", async () => {
  expect(Array.isArray(await utopian.getPosts("pending"))).toBe(true);
});

// Retrieve all projects statistics
test("returns an array of objects by date and section statistics", async () => {
  expect(Array.isArray(await utopian.stats.getModeratorsByDate("today"))).toBe(
    true
  );
});

// Retrieve all statistics
test("returns an array of objects by date for all section statistics", async () => {
  expect(Array.isArray(await utopian.stats.getProjectsByDate("today"))).toBe(
    true
  );
});
