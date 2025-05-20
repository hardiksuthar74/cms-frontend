export const formMetadata = {
  properties: {
    name: { title: "Name", type: "string" },
    email: { format: "email", title: "Email", type: "string" },
    description: { title: "Description", type: "string" },
    start_date: { format: "date", title: "Start Date", type: "date" },
    end_date: { format: "date", title: "End Date", type: "date" },
    status: { title: "Status", type: "string" },
    role: {
      api_for_drop_down: "/get-role",
      description: "Role of the user in the project",
      title: "Role of the user in the project",
      type: "select",
    },
  },
  required: [
    "name",
    "email",
    "description",
    "start_date",
    "end_date",
    "status",
    "role",
  ],
  title: "ProjectCreate",
  type: "object",
};
