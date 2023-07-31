import * as React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


export default function KeepMountedModal({ handleClose, open, func }) {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <div style={{backgroundColor: 'var(--bg-secondary)'}} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] shadow-lg p-5 rounded-md">
        <Typography
          id="modal-title"
          component="h2"
          sx={{ color: "var(--primary-color)", fontSize: '1.5rem', fontWeight: 600, fontFamily: 'var(--blog-font)' }}
        >
          Delete
        </Typography>
        <Typography
          id="keep-mounted-modal-description"
          sx={{ color: "var(--text-200)", mt: 2, fontSize: '1.2rem', fontFamily: 'var(--blog-font)' }}
        >
          Are you sure want to delete this article? <br />
          <small>This process is irreversible</small>
        </Typography>

        <div className="actionBtn-group flex justify-between g-10" style={{marginTop: '20px'}}>
          <Button variant="outlined" onClick={handleClose} sx={{width: '100%'}}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={() => func()} sx={{width: '100%'}}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
