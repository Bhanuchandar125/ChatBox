
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Dialougebox(props:any) {
    
 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  

  return (
    <div>
      
      <Dialog
        fullScreen={fullScreen}
        open={props.dialogueOpen}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add user to chat?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to create chat with {props.user?.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Disagree
          </Button>
          <Button onClick={props.addChat} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
