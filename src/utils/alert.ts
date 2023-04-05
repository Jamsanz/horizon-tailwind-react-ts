import Swal from "sweetalert2";

export const DeleteAlert = () =>
  Swal.fire({
    title: `Delete Information`,
    text: "Are you sure you want to delete this record?",
    icon: "warning",
    cancelButtonText: "CANCEL",
    cancelButtonColor: "red",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "DELETE",
    confirmButtonColor: "green",
  });
