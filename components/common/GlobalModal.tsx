import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, Box, Fade, IconButton, Modal, Typography } from "@mui/material";

import { useGlobalState } from "../../hooks/useGlobalState";

interface GlobalModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const GlobalModal = ({ title, description, children }: GlobalModalProps) => {
  const { modalOpen, removeModal } = useGlobalState();

  return (
    <>
      <Modal
        aria-labelledby={`transition-modal-${title}`}
        aria-describedby={`transition-modal-${description}`}
        open={modalOpen}
        onClose={removeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 325,
              bgcolor: "background.paper",
              borderRadius: 2,
              overflow: "hidden",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 2,
                p: 2,
                bgcolor: "primary.main",
              }}>
              <Typography fontSize={24} lineHeight={1.15}>
                {title}
              </Typography>

              <IconButton aria-label="close modal" onClick={removeModal} sx={{ p: 0 }}>
                <CloseIcon />
              </IconButton>
            </Box>

            {children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default GlobalModal;
