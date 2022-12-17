import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { find } from './api';
import { Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export const Detail = ({ open, handleClose, id }) => {
    const [data, setData] = useState({
        email: '', tp_sex: '', no_client: '',
        nu_document: '', nu_contact: '', address: '',
    });
    useEffect(() => {
        const getUser = async () => {
            let cliente = await find(id)
            if (cliente) {
                setData({ ...cliente });
            }
        };
        getUser();
    }, [id]);
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ minWidth: 752, minHeight: 480 }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Detalhar Cliente
                </BootstrapDialogTitle>
                <DialogContent dividers sx={{ minWidth: 600, minHeight: 480 }}>
                    <Typography variant="h5" gutterBottom>
                        <strong>Nome:</strong>{data.no_client}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <strong>Dcumento:</strong>{data.nu_document}
                    </Typography>          
                    <Typography variant="h5" gutterBottom>
                        <strong>Contato:</strong>{data.nu_contact}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        <strong>Endereço:</strong>{data.address}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Sair
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}