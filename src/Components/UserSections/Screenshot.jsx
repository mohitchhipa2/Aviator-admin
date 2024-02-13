import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Image } from '@mui/icons-material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));




export default function  Screenshot() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [view, setView] = useState(false);

  const togglePasswordVisibility = () => {
    setView(!view);
  };

  return (
    <React.Fragment>
      <Button  onClick={handleClickOpen}>
      <abbr title="View">
                                        <i
                                           
                                          style={{
                                            color: "green",
                                            paddingLeft: "5px",
                                            fontSize: "20px",
                                          }}
                                          className={view ? 'bx bx-hide' : 'bx bx-show'}
                                          
                                        ></i>
                                      </abbr>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          ScreenShot
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
       <img src="https://pbs.twimg.com/media/EpXTntdU8AEYvCw?format=jpg&name=large" alt="" />
     
      </BootstrapDialog>
    </React.Fragment>
  );
}