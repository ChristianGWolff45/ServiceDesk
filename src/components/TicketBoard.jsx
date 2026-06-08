import { TicketCard } from "./TicketCard";

export function TicketBoard() {
  const Tickets = [
    {
      id: "1",
      title: "Wifi",
      errorMessage: "",
      description: "Internet outage in the student organization office.",
      status: "OPEN",
      priority: "LOW",
      category: "Network Connection",
      createdAt: "2026-06-05T08:00:00",
      updatedAt: "2026-06-05T08:00:00",
      resolvedAt: null,
      assigneeId: null,
      closedAt: null,
      requesterEmail: "1@srcare.com",
      requesterPhoneNumber: "111-111-1111",
    },
    {
      id: "2",
      title: "Cannot access GitHub repo",
      errorMessage: "Permission denied",
      description: "User needs access to the club website GitHub repository.",
      status: "OPEN",
      priority: "MEDIUM",
      category: "Account Access",
      createdAt: "2026-06-05T09:15:00",
      updatedAt: "2026-06-05T09:15:00",
      resolvedAt: null,
      assigneeId: null,
      closedAt: null,
      requesterEmail: "2@srcare.com",
      requesterPhoneNumber: "222-222-2222",
    },
    {
      id: "3",
      title: "Website homepage is broken",
      errorMessage: "TypeError: Cannot read properties of undefined",
      description: "The homepage crashes after the latest deployment.",
      status: "IN_PROGRESS",
      priority: "HIGH",
      category: "Website Bug",
      createdAt: "2026-06-04T14:30:00",
      updatedAt: "2026-06-05T10:00:00",
      resolvedAt: null,
      assigneeId: "agent_1",
      closedAt: null,
      requesterEmail: "3@srcare.com",
      requesterPhoneNumber: "333-333-3333",
    },
    {
      id: "4",
      title: "Deployment failed",
      errorMessage: "Build failed with exit code 1",
      description: "Vercel deployment failed after pushing changes to main.",
      status: "WAITING_ON_USER",
      priority: "HIGH",
      category: "Deployment Issue",
      createdAt: "2026-06-04T16:45:00",
      updatedAt: "2026-06-05T11:20:00",
      resolvedAt: null,
      assigneeId: "agent_2",
      closedAt: null,
      requesterEmail: "4@srcare.com",
      requesterPhoneNumber: "444-444-4444",
    },
    {
      id: "5",
      title: "Need help installing VS Code",
      errorMessage: "",
      description:
        "Member needs help installing VS Code and setting up extensions.",
      status: "RESOLVED",
      priority: "LOW",
      category: "Software Help",
      createdAt: "2026-06-03T12:00:00",
      updatedAt: "2026-06-04T09:30:00",
      resolvedAt: "2026-06-04T09:30:00",
      assigneeId: "agent_1",
      closedAt: null,
      requesterEmail: "5@srcare.com",
      requesterPhoneNumber: "555-555-5555",
    },
    {
      id: "6",
      title: "Laptop not connecting to projector",
      errorMessage: "No HDMI signal",
      description:
        "The laptop is not displaying on the meeting room projector.",
      status: "CLOSED",
      priority: "MEDIUM",
      category: "Hardware/Device",
      createdAt: "2026-06-02T18:10:00",
      updatedAt: "2026-06-03T13:25:00",
      resolvedAt: "2026-06-03T12:50:00",
      assigneeId: "agent_3",
      closedAt: "2026-06-03T13:25:00",
      requesterEmail: "6@srcare.com",
      requesterPhoneNumber: "666-666-6666",
    },
    {
      id: "7",
      title: "Forgot password",
      errorMessage: "Invalid login credentials",
      description:
        "User cannot log into the member portal and needs a password reset.",
      status: "OPEN",
      priority: "MEDIUM",
      category: "Account Access",
      createdAt: "2026-06-05T10:45:00",
      updatedAt: "2026-06-05T10:45:00",
      resolvedAt: null,
      assigneeId: null,
      closedAt: null,
      requesterEmail: "7@srcare.com",
      requesterPhoneNumber: "777-777-7777",
    },
    {
      id: "8",
      title: "Database connection error",
      errorMessage: "PrismaClientInitializationError",
      description: "The app cannot connect to the production database.",
      status: "IN_PROGRESS",
      priority: "CRITICAL",
      category: "Deployment Issue",
      createdAt: "2026-06-05T07:30:00",
      updatedAt: "2026-06-05T08:05:00",
      resolvedAt: null,
      assigneeId: "agent_2",
      closedAt: null,
      requesterEmail: "8@srcare.com",
      requesterPhoneNumber: "888-888-8888",
    },
    {
      id: "9",
      title: "Images not loading",
      errorMessage: "404 Not Found",
      description: "Profile images are missing from the members page.",
      status: "RESOLVED",
      priority: "LOW",
      category: "Website Bug",
      createdAt: "2026-06-01T15:20:00",
      updatedAt: "2026-06-02T11:10:00",
      resolvedAt: "2026-06-02T11:10:00",
      assigneeId: "agent_1",
      closedAt: null,
      requesterEmail: "9@srcare.com",
      requesterPhoneNumber: "999-999-9999",
    },
    {
      id: "10",
      title: "Need new member added to Slack",
      errorMessage: "",
      description:
        "A new member needs to be added to the organization Slack workspace.",
      status: "CLOSED",
      priority: "LOW",
      category: "Account Access",
      createdAt: "2026-05-31T09:00:00",
      updatedAt: "2026-05-31T11:40:00",
      resolvedAt: "2026-05-31T11:20:00",
      assigneeId: "agent_3",
      closedAt: "2026-05-31T11:40:00",
      requesterEmail: "10@srcare.com",
      requesterPhoneNumber: "101-010-1010",
    },
    {
      id: "11",
      title: "Form submit button does nothing",
      errorMessage: "POST /api/tickets 500",
      description: "The ticket creation form does not submit successfully.",
      status: "IN_PROGRESS",
      priority: "HIGH",
      category: "Website Bug",
      createdAt: "2026-06-05T12:10:00",
      updatedAt: "2026-06-05T12:25:00",
      resolvedAt: null,
      assigneeId: "agent_1",
      closedAt: null,
      requesterEmail: "11@srcare.com",
      requesterPhoneNumber: "111-222-3333",
    },
    {
      id: "12",
      title: "General question about deployment",
      errorMessage: "",
      description:
        "Requester wants to know how to deploy their React project to Vercel.",
      status: "OPEN",
      priority: "LOW",
      category: "General Question",
      createdAt: "2026-06-05T13:00:00",
      updatedAt: "2026-06-05T13:00:00",
      resolvedAt: null,
      assigneeId: null,
      closedAt: null,
      requesterEmail: "12@srcare.com",
      requesterPhoneNumber: "121-212-1212",
    },
  ];
  return (
    <div className="bg-green-100 min-h-screen w-fit flex gap-4">
      <div className="bg-white flex m-16 rounded-2xl gap-4 w-full p-4">
        <div className="bg-gray-100 p-4 flex flex-col gap-4  w-1/4 h-fit mt-16 ml-8 rounded-xl">
          <div className="flex justify-between items-center ">
            <h1>Open</h1>
            <span className="bg-white  rounded-full w-6 h-6 text-center">
              {Tickets.filter((ticket) => ticket.status === "OPEN").length}
            </span>
          </div>
          {Tickets.filter((ticket) => ticket.status === "OPEN").map(
            (ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ),
          )}
        </div>

        <div className="bg-gray-100 p-4 flex flex-col gap-4  w-1/4 h-fit mt-16  rounded-xl">
          <div className="flex justify-between items-center ">
            <h1>In Progress</h1>
            <span className="bg-white  rounded-full w-6 h-6 text-center">
              {
                Tickets.filter((ticket) => ticket.status === "IN_PROGRESS")
                  .length
              }
            </span>
          </div>
          {Tickets.filter((ticket) => ticket.status === "IN_PROGRESS").map(
            (ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ),
          )}
        </div>

        <div className="bg-gray-100 p-4 flex flex-col gap-4  w-1/4 h-fit mt-16 rounded-xl">
          <div className="flex justify-between items-center ">
            <h1>Waiting on User</h1>
            <span className="bg-white  rounded-full w-6 h-6 text-center">
              {
                Tickets.filter((ticket) => ticket.status === "WAITING_ON_USER")
                  .length
              }
            </span>
          </div>
          {Tickets.filter((ticket) => ticket.status === "WAITING_ON_USER").map(
            (ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ),
          )}
        </div>

        <div className="bg-gray-100 p-4 flex flex-col gap-4  w-1/4 h-fit mt-16 rounded-xl">
          <div className="flex justify-between items-center ">
            <h1>Resolved</h1>
            <span className="bg-white  rounded-full w-6 h-6 text-center">
              {Tickets.filter((ticket) => ticket.status === "RESOLVED").length}
            </span>
          </div>
          {Tickets.filter((ticket) => ticket.status === "RESOLVED").map(
            (ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ),
          )}
        </div>

        <div className="bg-gray-100 p-4 flex flex-col gap-4 w-1/4 h-fit mt-16 mr-8 rounded-xl">
          <div className="flex justify-between items-center ">
            <h1>Closed</h1>
            <span className="bg-white  rounded-full w-6 h-6 text-center">
              {Tickets.filter((ticket) => ticket.status === "CLOSED").length}
            </span>
          </div>
          {Tickets.filter((ticket) => ticket.status === "CLOSED").map(
            (ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
