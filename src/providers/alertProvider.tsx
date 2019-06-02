import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export class AlertProvider {

  private swal = withReactContent(Swal);

  desistir(func: Function){

    this.swal.fire({
      type: "warning",
      title: 'DESISTIR',
      html: "Deseja realmente desistir?",
      cancelButtonText: "NÃ0",
      confirmButtonText: "SIM",
      showCancelButton: true,
      cancelButtonColor: "var(--color-success)",
      confirmButtonColor: "var(--color-danger)",
      reverseButtons: true,
      heightAuto: false,
      customClass: "custom-sweet-alert",
      focusConfirm: false,
      preConfirm: () => {

        func();

      }
    });

  }

  sair(func: Function){

    this.swal.fire({
      type: "warning",
      title: 'SAIR',
      html: "Deseja realmente sair?",
      cancelButtonText: "NÃ0",
      confirmButtonText: "SIM",
      showCancelButton: true,
      cancelButtonColor: "var(--color-success)",
      confirmButtonColor: "var(--color-danger)",
      reverseButtons: true,
      heightAuto: false,
      customClass: "custom-sweet-alert",
      focusConfirm: false,
      preConfirm: () => {

        func();

      }
    });

  }

}

/*
(confirmado: boolean) => {
  if (isConfirm) {
    swal("Deleted!", "Your imaginary file has been deleted.", "success");
  } else {
    swal("Cancelled", "Your imaginary file is safe :)", "error");
  }
}
*/
