import React from "react";
import { Modal as MuiModal, Typography, Box } from "@mui/material";

const Modal = ({ open, onClose, title, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "90%", 
            sm: 600, 
          },
          maxWidth: '100%',
          overflow: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p:4,
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          style={{ textAlign: "center" }}
        >
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
      </Box>
    </MuiModal>
  );
};

export default Modal;
