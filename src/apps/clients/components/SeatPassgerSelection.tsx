import React from 'react'
import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ClientPlaceReservations, CabineConfigurationInterface, CabineFuncActionType } from "../../../packages/seatings";

export interface SeatPassgerSelectionProps{
    config ?: Partial<CabineConfigurationInterface>,
    users ?: any[],
}

const SeatPassgerSelection:React.FC<SeatPassgerSelectionProps> = ({users, config}) => {
    const [selected, setSelected] = React.useState<any>(undefined);
    const [open, setOpen] = React.useState(false);

    const handlerReservation : CabineFuncActionType = React.useCallback((reservations, type, seat, user)=>{
        console.log(reservations, type, seat, user);
        setOpen(true)
    },[]);

    // 
    const handleClose = () => {
        setOpen(false);
    };
    // 
    React.useEffect(() => {
        if(users && users?.length > 0){
            const fistUser = users[0];
            setSelected(fistUser);
        }
    }, [users]);
    return (
        <div>
            <Typography>Seat Reservation</Typography>
            <ClientPlaceReservations
                configuration = {config}
                user = { selected?.id || ""}
                actions = { handlerReservation }      
            />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SeatPassgerSelection
