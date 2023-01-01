import React from 'react'
import Swal from 'sweetalert2'
import { NumericFormat } from 'react-number-format';
import { IMaskInput } from 'react-imask';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
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
        fontSize: 14,
    },
}));