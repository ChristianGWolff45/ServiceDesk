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
async function runTicketTests() {
  console.log(`Testing API at: ${BASE_URL}`);
  console.log("==============================");

  //   //test tickets
  let result = await request("GET", "/tickets");
  logResult("GET /tickets", result, 200);

  result = await request("GET", "/tickets/1");
  logResult("GET /tickets/1", result, 200);

  result = await request("GET", "/tickets/8000");
  logResult("GET /tickets/8000", result, 404);

  result = await request("POST", "/tickets", {
    title: "broken internet",
    description: "internet is not working on laptop",
    category: "INTERNET",
    requesterId: "2",
  });
  logResult("POST /tickets", result, 201);

  result = await request("POST", "/tickets", {
    title: "broken internet",
    description: "internet is not working on laptop",
    category: "INTERNET",
    requesterId: "8000",
  });
  logResult("POST /tickets", result, 404);

  result = await request("POST", "/tickets", {
    title: "broken internet",
    description: "internet is not working on laptop",
    category: "wifi",
    requesterId: "2",
  });
  logResult("POST /tickets", result, 201);

  result = await request("PATCH", "/tickets/1", {
    description: "test",
  });
  logResult("PATCH /tickets/1", result, 200);

  result = await request("PATCH", "/tickets/1/priority", {
    priority: "HIGH",
  });
  logResult("PATCH /tickets", result, 200);

  result = await request("PATCH", "/tickets/1/assignee", {
    assigneeId: "2",
  });
  logResult("PATCH /tickets/1/assignee", result, 200);

  result = await request("PATCH", "/tickets/1/assignee", {
    assigneeId: "8000",
  });
  logResult("PATCH /tickets/1/assigneeId", result, 404);

  result = await request("DELETE", "/tickets/2");
  logResult("DELETE /tickets/2", result, 200);
}
async function runUserTests() {
  console.log(`Testing API at: ${BASE_URL}`);
  console.log("==============================");

  //   //Test users

  result = await request("GET", "/users");
  logResult("GET /users", result, 200);

  result = await request("GET", "/users/2");
  logResult("get /users/2", result, 200);

  result = await request("GET", "/users/nouser");
  logResult("get /users/nouser", result, 400);

  result = await request("POST", "/users", {
    email: "jamie.lee@example.com",
    phoneNumber: "803-555-0188",
    role: "REQUESTER",
    department: "IT",
    firstName: "Jamie",
    lastName: "Lee",
  });
  logResult("POST /users", result, 200);

  result = await request("POST", "/users", {
    email: "jamie.lee@example.com",
    phoneNumber: "803-555-0188",
    role: "REQUESTER",
  });
  logResult("POST /users", result, 400);

  result = await request("PATCH", "/users/4", {
    email: "u4@example.com",
  });
  logResult("PATCH /users/4", result, 200);

  result = await request("PATCH", "/users/88", {
    email: "u4@example.com",
  });
  logResult("PATCH /users/88", result, 404);

  result = await request("PATCH", "/users/2/userRole", {
    role: "Admin",
  });
  logResult("PATCH /users/noUser", result, 200);

  result = await request("DELETE", "/users/4");
  logResult("DELETE /users/4", result, 200);

  result = await request("GET", "/users/4");
  logResult("GET /users/4", result, 200);

  // // Test comments
}
async function runCommentTests() {
  console.log(`Testing API at: ${BASE_URL}`);
  console.log("==============================");

  result = await request("GET", "/tickets/2/comments");
  logResult("GET /comments/1", result, 200);

  result = await request("GET", "/tickets/1/comments/1");
  logResult("GET /tickets/1/comments/1", result, 404);

  result = await request("GET", "/tickets/noticket");
  logResult("GET /tickets/noticket", result, 400);

  result = await request("POST", "/tickets/2/comments", {
    authorId: 2,
    body: "req.body.body",
    isInteral: "false",
  });
  logResult("POST /tickets/2/comments", result, 200);

  result = await request("POST", "/tickets/1/comments", {
    authorId: "nouser",
    body: "req.body.body",
    isInteral: "false",
  });
  logResult("POST /tickets/1/comments", result, 400);

  result = await request("POST", "/tickets/1/comments", {
    authorId: "u2",
    body: "req.body.body",
    isInteral: "false",
  });
  logResult("POST /tickets/1/comments/noticket", result, 400);

  result = await request("PATCH", "/tickets/2/comments/2", {
    body: "req.body.body",
  });
  logResult("PATCH /tickets/2/comments/2", result, 200);

  result = await request("DELETE", "/tickets/2/comments/2", {
    body: "req.body.body",
  });
  logResult("DELETE /tickets/2/comments/2", result, 200);
}

runCommentTests().catch((error) => {
  console.error("Test runner crashed:");
  console.error(error);
});
