import Swal from 'sweetalert2'

export const showLoading = (title = 'Salvando Aguarde...') => {
    Swal.fire({
        title: title,
        didOpen: () => {
            Swal.showLoading()
        }
    })
}

export const hideLoading = () => {
    Swal.hideLoading()
}

export const alertSucesso = (func, value) => {
    let timerInterval
    Swal.fire({
        title: 'Mensagem do Sistema',
        html: '<strong>Registro salvo com sucesso!!!</strong>',
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
            func(value)
        }
    })
}