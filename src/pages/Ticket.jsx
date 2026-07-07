import { useParams } from "react-router-dom";
import { useTicket } from "../hooks/useTicket";
import { useUser } from "../hooks/useUser";
import { useComments } from "../hooks/useComments";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Dropdown } from "../components/Dropdown";
import { useAuth } from "../hooks/useAuth";
import { useSupportStaff } from "../hooks/useSupportStaff";

import {
  Tag,
  TriangleAlert,
  Dot,
  UserPlus,
  UserMinus,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Mail,
  Activity,
  Calendar,
  User,
  MessageSquare,
  Lock,
  Send,
} from "lucide-react";
import { Comment } from "../components/Comment";

export function Ticket() {
  const { token, user, isLoggedIn } = useAuthContext();
  const { agents } = useSupportStaff();
  const [assigneeDropdown, setAssigneeDropdown] = useState(false);

  const { getMe } = useAuth();
  const params = useParams();
  const ticketId = params.ticketId;
  const {
    ticket,
    loading: ticketLoading,
    updateStatus,
    updatePriority,
    assignTo,
    removeAssignee,
  } = useTicket(ticketId);

  const statusOption = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [statusSelected, setStatusSelected] = useState(null);

  const priorityOptions = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [prioritySelected, setPrioritySelected] = useState(null);

  const { user: requester, setUserId: setRequesterId } = useUser();
  const { user: assignee, setUserId: setAssigneeId } = useUser();

  const { comments, createComment } = useComments(ticketId, token);

  const [newPublicComment, setNewPublicComment] = useState("");
  const [newPrivateComment, setNewPrivateComment] = useState("");

  function postPublicComment() {
    if (newPublicComment === "") {
      return alert("Comment body is empty");
    }
    createComment(newPublicComment, false, token);
    setNewPublicComment("");
  }

  function postPrivateComment() {
    if (newPrivateComment === "") {
      return alert("Comment body is empty");
    }
    createComment(newPrivateComment, true, token);
    setNewPrivateComment("");
  }
  useEffect(() => {
    if (!ticketLoading) {
      setStatusSelected(ticket.status);
      setPrioritySelected(ticket.priority);
      setRequesterId(ticket.requester_id);
      setAssigneeId(ticket.assignee_id);
    }
  }, [ticket]);

  useEffect(() => {
    updateStatus(statusSelected, token);
  }, [statusSelected]);

  useEffect(() => {
    updatePriority(prioritySelected, token);
  }, [prioritySelected]);

  if (ticketLoading) {
    return <p>ticketLoading</p>;
  }

  return (
    <div className="bg-lime-50">
      <div className="grid grid-cols-[2fr_1fr] m-20 gap-12 justify-self-center w-8/10">
        <div className="flex gap-12 flex-col">
          <div className="p-6 border bg-white border-emerald-900 rounded-2xl  flex-col flex gap-2">
            <p className="flex gap-4 ml-2 text-xl items-center">
              <span className="p-2 pl-4 pr-4 border-emerald-900 bg-green-100 rounded-md border">
                {`#TCK-${ticket.id}`}
              </span>
              <span>
                {"Opened "}
                {new Date(ticket.created_at).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
              <span>{"  -  "}</span>
              <span>
                {"Updated "}
                {new Date(ticket.updated_at).toLocaleString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </p>
            <div>
              <h1 className="text-4xl font-semibold m-3">{ticket.title}</h1>
              <p className="text-2xl m-3">{ticket.description}</p>
            </div>
            <div className="flex gap-4 text-lg items-center font-semibold m-2">
              <div className="flex  items-center text-center p-2 h-12 pr-8 bg-green-50 rounded-full border border-green-700 text-emerald-900">
                <Dot className="bold stroke-3 w-8 h-auto" />
                {ticket.status}
              </div>
              <div className="flex gap-2 items-center text-center p-2 pl-4 pr-4 h-12 bg-orange-50 rounded-full border border-amber-700 text-amber-900">
                <TriangleAlert />
                {ticket.priority}
              </div>
              <div className="flex gap-2 items-center text-center p-2 h-12 pl-4 pr-4 bg-sky-50 rounded-full border border-sky-700 text-blue-900">
                <Tag />
                {ticket.category}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-emerald-900 p-8">
            <div className="flex gap-2 items-center">
              <MessageSquare className="text-emerald-900" />
              <h1 className="font-semibold text-2xl text-emerald-900">
                Conversation
              </h1>
              <p></p>
            </div>
            <div className="border-b pb-8 border-emerald-900">
              {comments
                .filter((comment) => {
                  return !comment.is_internal;
                })
                .map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      bg="green-100"
                      text="emerald-900"
                      border="emerald-900"
                      comment={comment}
                    />
                  );
                })}
            </div>
            <div className="w-full">
              <div className="pt-8 ">
                <h2>Add public comment --- visible to requesters</h2>
                <textarea
                  className="border  border-emerald-900 w-full h-28 rounded-md m-2 p-2"
                  placeholder="Reply to the requester"
                  value={newPublicComment}
                  onChange={(e) => setNewPublicComment(e.target.value)}
                ></textarea>
              </div>

              <button
                onClick={postPublicComment}
                className="bg-green-700 cursor-pointer text-white rounded-xl mt-4 justify-self-end p-4 flex gap-2 text-xl font-semibold items-center"
              >
                <Send />
                Public Reply
              </button>
            </div>
          </div>
          {(user.role === "ADMIN" || user.role === "AGENT") && (
            <div className=" rounded-2xl border bg-amber-100 border-amber-900 p-8">
              <div className="flex gap-2 items-center">
                <Lock className="text-amber-900" />
                <h1 className="font-semibold text-2xl text-amber-900">
                  Internal Notes
                </h1>
                <p></p>
              </div>
              {comments
                .filter((comment) => {
                  return comment.is_internal;
                })
                .map((comment) => {
                  return (
                    <Comment
                      key={comment.id}
                      bg="orange-100"
                      text="amber-900"
                      border="amber-900"
                      comment={comment}
                    />
                  );
                })}
              <div className="w-full">
                <div className="pt-8 ">
                  <h2>Add internal comment --- visible to requesters</h2>
                  <textarea
                    className="border bg-white  border-amber-900 w-full h-28 rounded-md m-2 p-2"
                    placeholder="Reply to the requester"
                    value={newPrivateComment}
                    onChange={(e) => setNewPrivateComment(e.target.value)}
                  ></textarea>
                </div>

                <button
                  onClick={postPrivateComment}
                  className="bg-orange-700 cursor-pointer text-white rounded-xl mt-4 justify-self-end p-4 flex gap-2 text-xl font-semibold items-center"
                >
                  <Send />
                  Internal Reply
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-12 ">
          {(user.role === "ADMIN" || user.role === "AGENT") && (
            <div className="border bg-white border-emerald-900 rounded-2xl flex flex-col text-lg p-6 gap-6">
              <div>
                <p className="text-2xl font-bold">Actions</p>
                <p>manage this ticket</p>
                <p>
                  {assignee ? (
                    <span>
                      assigned to{" "}
                      <strong>
                        {" "}
                        {assignee.first_name} {assignee.last_name}
                      </strong>
                    </span>
                  ) : (
                    "Unassigned"
                  )}
                </p>
              </div>
              {user.role === "ADMIN" ? (
                <div>
                  {/* <Dropdown
                    dropdownStatus={assigneeDropdown}
                    changeDropdownStatus={setAssigneeDropdown}
                    setSelected={setAssigneeId}
                    selected={assignee}
                    selections={agents.map((agent) => {
                      return agent.first_name + agent.last_name;
                    })}
                  /> */}
                  <p className="font-semibold mb-2 text-xl">Assign To</p>
                  <button
                    className="flex items-center bg-green-100 border border-emerald-900 rounded-lg w-full justify-between p-4 cursor-pointer text-2xl font-semibold text-emerald-900 "
                    onClick={() => setAssigneeDropdown(!assigneeDropdown)}
                  >
                    <p>
                      {assignee
                        ? assignee.first_name + " " + assignee.last_name
                        : "UNASSIGNED"}
                    </p>
                    {assigneeDropdown ? <ChevronUp /> : <ChevronDown />}
                  </button>
                  {assigneeDropdown && (
                    <div className="flex flex-col border border-emerald-900 rounded-lg w-full">
                      {agents.map((agent, index) => (
                        <button
                          onClick={() => {
                            setAssigneeId(agent.id);
                            setAssigneeDropdown(false);
                          }}
                          key={index}
                          className={`flex  items-center rounded-lg  justify-between p-4 cursor-pointer text-2xl font-semibold  ${assignee && agent.id === assignee.id ? "text-white bg-emerald-900" : "text-emerald-900 hover:bg-green-100"}`}
                        >
                          {agent.first_name + " " + agent.last_name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : ticket.assignee_id === user.id ? (
                <button
                  onClick={() => removeAssignee(token)}
                  className="flex gap-2 w-full bg-orange-700 text-white font-semibold rounded-xl cursor-pointer justify-center p-4 text-2xl items-center"
                >
                  <UserMinus />
                  <p>Unassign To Me</p>
                </button>
              ) : (
                <button
                  onClick={() => assignTo(token)}
                  className="flex gap-2 w-full bg-green-700 text-white font-semibold rounded-xl cursor-pointer justify-center p-4 text-2xl items-center"
                >
                  <UserPlus />
                  <p>Assign To Me</p>
                </button>
              )}
              <label>
                <p className="text-xl font-semibold mb-2">Status</p>
                <Dropdown
                  dropdownStatus={statusDropdown}
                  changeDropdownStatus={setStatusDropdown}
                  setSelected={setStatusSelected}
                  selections={statusOption}
                  selected={statusSelected}
                ></Dropdown>
              </label>
              <label className="">
                <p className="text-xl font-semibold mb-2">Priority </p>
                <Dropdown
                  dropdownStatus={priorityDropdown}
                  changeDropdownStatus={setPriorityDropdown}
                  setSelected={setPrioritySelected}
                  selections={priorityOptions}
                  selected={prioritySelected}
                ></Dropdown>
              </label>
              <div className="flex gap-4 w-full justify-between">
                <button
                  onClick={() => setStatusSelected("RESOLVED")}
                  className="flex items-center gap-2 text-2xl font-semibold w-full bg-green-100 border-emerald-900 pt-4 pb-4 justify-center rounded-xl border text-emerald-900 cursor-pointer hover:bg-green-200"
                >
                  <CheckCircle />
                  Resolve
                </button>
                <button
                  onClick={() => setStatusSelected("CLOSED")}
                  className="flex items-center gap-2 text-2xl font-semibold w-full bg-orange-100 border-amber-900 border rounded-xl pt-4 pb-4 justify-center text-amber-900 cursor-pointer hover:bg-orange-200"
                >
                  <XCircle />
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="bg-white border flex flex-col text-lg  gap-4 rounded-xl border-emerald-900 w-full p-6">
            <h1 className="font-bold">Ticket Details</h1>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <User />
                <p>Requester</p>
              </div>
              <p className="font-bold">
                {`${
                  requester
                    ? requester.first_name + " " + requester.last_name
                    : "failed to load requester"
                }`}
              </p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Mail />
                <p>Email</p>
              </div>
              <p className="font-bold">
                {" "}
                {`${requester ? requester.email : "failed to load requester"}`}
              </p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <User />
                <p>Assignee</p>
              </div>
              <p className="font-bold">{`${
                assignee
                  ? assignee.first_name + " " + assignee.last_name
                  : "UNASSIGNED"
              }`}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Activity />
                <p>Status</p>
              </div>
              <p className="font-bold">{ticket.status}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <TriangleAlert />
                <p>Priority</p>
              </div>
              <p className="font-bold">{ticket.priority}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Tag />
                <p>Category</p>
              </div>
              <p className="font-bold">{ticket.category}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Calendar />
                <p>Created</p>
              </div>
              <p className="font-bold">
                {new Date(ticket.created_at).toLocaleDateString([], {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex justify-between">
              <div className="flex gap-2 items-center font-semibold">
                <Calendar />
                <p>Last Updated</p>
              </div>
              <p className="font-bold">
                {new Date(ticket.updated_at).toLocaleDateString([], {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
