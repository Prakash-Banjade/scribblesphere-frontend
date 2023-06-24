import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '100%',
  maxWidth: '500px',
  backgroundColor: "#232321",
  borderRadius: '10px',
  boxShadow: 24,
  p: 5,
};

export default function KeepMountedModal({ handleClose, open, func }) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="keep-mounted-modal-title"
          component="h2"
          sx={{ color: "var(--primary-color)", fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--blog-font)' }}
        >
          Delete
        </Typography>
        <Typography
          id="keep-mounted-modal-description"
          sx={{ color: "var(--text-white)", mt: 2, fontSize: '1.2rem', fontFamily: 'var(--blog-font)' }}
        >
          Are you sure want to delete this article? <br />
          <small>This process is irreversible</small>
        </Typography>

        <div className="actionBtn-group flex justify-between g-10" style={{marginTop: '20px'}}>
          <Button variant="contained" color="error" onClick={() => func()} sx={{width: '100%'}}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} sx={{width: '100%'}}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
