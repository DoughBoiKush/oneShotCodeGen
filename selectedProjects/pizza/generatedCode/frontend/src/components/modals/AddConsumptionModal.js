import { Modal, Box } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
const schema = {
  type: "object",
  required: ["slices", "pizzaPlaceId"],
  properties: {
    slices: { type: "integer", title: "Number of Slices", minimum: 1 },
    pizzaPlaceId: { type: "integer", title: "Pizza Place" },
  },
};
export const AddConsumptionModal = ({ open, onClose, onSubmit, places }) => {
  const uiSchema = {
    pizzaPlaceId: {
      "ui:widget": "select",
      enumOptions: places.map((p) => {
        console.log(p.name);
        return { label: p.name, value: p.id };
      }),
    },
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}
      >
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={({ formData }) => {
            onSubmit(formData);
            onClose();
          }}
        />
      </Box>
    </Modal>
  );
};
