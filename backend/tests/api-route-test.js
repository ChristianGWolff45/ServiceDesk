const BASE_URL = "http://localhost:5000/api";

async function request(method, path, body) {
  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${BASE_URL}${path}`, options);

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return {
    status: response.status,
    data,
  };
}

function logResult(testName, result, expectedStatus) {
  let passed = result.status === expectedStatus;
  console.log(`${testName}: ${passed ? "Passed" : "Failed"}`);
  console.log(`Expected: ${expectedStatus} Got: ${result.status}`);

  if (!passed) {
    console.log("Response");
    console.log(`${result.data ? result.data.message : "no message"}`);
  }

  console.log("----------------------");
}

async function runTests() {
  console.log(`Testing API at: ${BASE_URL}`);
  console.log("==============================");

  //   //test tickets
  //   let result = await request("GET", "/tickets");
  //   logResult("GET /tickets", result, 200);

  //   result = await request("GET", "/tickets/t1");
  //   logResult("GET /tickets/:id", result, 200);

  //   result = await request("GET", "/tickets/doesntExist");
  //   logResult("GET /tickets/t1", result, 404);

  //   result = await request("POST", "/tickets", {
  //     title: "broken internet",
  //     description: "internet is not working on laptop",
  //     category: "INTERNET",
  //     requesterId: "u2",
  //   });
  //   logResult("POST /tickets", result, 201);

  //   result = await request("POST", "/tickets", {
  //     title: "broken internet",
  //     description: "internet is not working on laptop",
  //     category: "INTERNET",
  //     requesterId: "notAUser",
  //   });
  //   logResult("POST /tickets", result, 404);

  //   result = await request("POST", "/tickets", {
  //     title: "broken internet",
  //     description: "internet is not working on laptop",
  //     requesterId: "u2",
  //   });
  //   logResult("POST /tickets", result, 400);

  //   result = await request("PATCH", "/tickets/t1", {
  //     description: "test",
  //   });
  //   logResult("PATCH /tickets", result, 200);

  //   result = await request("PATCH", "/tickets/t1/priority", {
  //     priority: "HIGH",
  //   });
  //   logResult("PATCH /tickets", result, 200);

  //   result = await request("PATCH", "/tickets/t1/assignee", {
  //     assigneeId: "u2",
  //   });
  //   logResult("PATCH /tickets", result, 200);

  //   result = await request("PATCH", "/tickets/t1/assigneeId", {
  //     assigneeId: "noUser",
  //   });
  //   logResult("PATCH /tickets", result, 404);

  //   result = await request("DELETE", "/tickets/t2");
  //   logResult("DELETE /tickets", result, 204);

  //   //Test users

  //   result = await request("GET", "/users");
  //   logResult("GET /users", result, 200);

  //   result = await request("GET", "/users/u2");
  //   logResult("get /users/u2", result, 200);

  //   result = await request("GET", "/users/nouser");
  //   logResult("get /users", result, 404);

  //   result = await request("POST", "/users", {
  //     email: "jamie.lee@example.com",
  //     phoneNumber: "803-555-0188",
  //     role: "REQUESTER",
  //     firstName: "Jamie",
  //     lastName: "Lee",
  //   });
  //   logResult("POST /users", result, 200);

  //   result = await request("POST", "/users", {
  //     email: "jamie.lee@example.com",
  //     phoneNumber: "803-555-0188",
  //     role: "REQUESTER",
  //   });
  //   logResult("POST /users", result, 400);

  //   result = await request("PATCH", "/users/u4", {
  //     email: "u4@example.com",
  //   });
  //   logResult("PATCH /users/u4", result, 200);

  //   result = await request("PATCH", "/users/noUser", {
  //     email: "u4@example.com",
  //   });
  //   logResult("PATCH /users/noUser", result, 404);

  //   result = await request("PATCH", "/users/u2/userRole", {
  //     role: "Admin",
  //   });
  //   logResult("PATCH /users/noUser", result, 200);

  //   result = await request("DELETE", "/users/u4");
  //   logResult("DELETE /users/u4", result, 204);

  //   result = await request("GET", "/users/u4");
  //   logResult("GET /users/u4", result, 404);

  result = await request("GET", "/tickets/t1/comments");
  logResult("GET /comments/t1", result, 200);

  result = await request("GET", "/tickets/t1/comments/c1");
  logResult("GET /tickets/t1/comments/c1", result, 200);

  result = await request("GET", "/tickets/noticket");
  logResult("GET /tickets/noticket", result, 404);

  result = await request("POST", "/tickets/t1/comments", {
    authorId: "u2",
    body: "req.body.body",
    isInteral: "false",
  });
  logResult("POST /ticekts/t1/comments", result, 200);

  result = await request("POST", "/tickets/t1/comments", {
    authorId: "nouser",
    body: "req.body.body",
    isInteral: "false",
  });
  logResult("POST /tickets/t1/comments", result, 404);

  result = await request("POST", "/tickets/comments/noticket", {
    authorId: "u2",
    body: "req.body.body",
    isInteral: "false",
  });
  logResult("POST /comments/t1", result, 404);

  result = await request("PATCH", "/tickets/t1/comments/c1", {
    body: "req.body.body",
  });
  logResult("PATCH /tickets/t1/comments/c2", result, 200);

  result = await request("DELETE", "/tickets/t1/comments/c1", {
    body: "req.body.body",
  });
  logResult("DELETE /tickets/t1/comments/c2", result, 200);
}

runTests().catch((error) => {
  console.error("Test runner crashed:");
  console.error(error);
});

// Notes for later: middleware and controllers create there own arrays of data so checking for user/comment/ticket after deletion is not caught by middleware
