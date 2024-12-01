import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
const schema = {
  type: "object",
  required: ["userId", "role"],
  properties: {
    userId: { type: "string", title: "User" },
    role: {
      type: "string",
      title: "Role",
      enum: ["admin", "manager", "hr", "employee"],
    },
  },
};
export const RoleAssignmentForm = ({ onSubmit }) => {
  return (
    <Form
      schema={schema}
      validator={validator}
      onSubmit={({ formData }) => onSubmit(formData)}
    />
  );
};
