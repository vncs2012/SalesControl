import React from 'react'
import Swal from 'sweetalert2'
import { styled } from '@mui/material/styles';
import { NumericFormat } from 'react-number-format';
import { IMaskInput } from 'react-imask';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {TableRow } from '@mui/material';
import Switch from '@mui/material/Switch';
export const showLoading = (title = 'Salvando Aguarde...') => {
    Swal.fire({
        title: title,
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    })
}

export const hideLoading = () => {
    Swal.close()
}

export const alertSucesso = (boFunc, func = null, boUpdate = false) => {
    let msg = boFunc ? 'Registro salvo com sucesso!!!' : 'Registro deletado com sucesso!!!';
    msg = boUpdate ? 'Registro Alterado com sucesso!!!' : msg
    let timerInterval
    Swal.fire({
        title: 'Mensagem do Sistema',
        html: `<strong>${msg}</strong>`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            if (boFunc) {
                func(true)
            }
        }
    })
}

export const deleteAlert = (func, id, state, data, id_string) => {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não será capaz de reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, apague!'
    }).then((result) => {
        if (result.isConfirmed) {
            func(id, state, data, id_string)
        }
    })
}

export const alertSystem = (text, icon) => {
    Swal.fire({
        title: 'Mensagem do Sistema.',
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ok!'
    })
}

export const formatDate = (date) => {
    date = new Date(date)
    return date.toLocaleString("pt-BR")
}

export const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            decimalScale={2}
            thousandsGroupStyle={'thousand'}
            fixedDecimalScale
            thousandSeparator
            prefix="R$"
        />
    );
});

export const FormatContact = React.forwardRef(function FormatContact(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="(00) 0 0000-0000"
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export const FormatDocumentCpf = React.forwardRef(function FormatDocumentCpf(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000.000.000-00"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

export const tpSex = [
    {
        value: 'M',
        label: 'Masculino',
    },
    {
        value: 'F',
        label: 'Feminino',
    },
];

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.custom.dark,
        color: theme.palette.custom.contrastText,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        margin:2,
        padding: 0,
        paddingLeft: 10
    },
}));

export const NotData = (span = 5) => {
    return (<TableRow key={1}>
        <TableCell key={1} colSpan={span} sx={{ textAlign: 'center' }}>Nenhum dado encontrado...</TableCell>
    </TableRow>)
}

export const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));