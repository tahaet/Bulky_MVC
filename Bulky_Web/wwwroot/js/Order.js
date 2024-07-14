﻿let dataTable;
$("document").ready(() => loadDataTable())
function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url: '/admin/order/getall' },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "phoneNumber", "width": "20%" },
            { "data": "applicationUser.email", "width": "15%" },
            { "data": "orderStatus", "width": "10%" },
            { "data": "orderTotal", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return ` <div class="w-75 btn-group" role="group">
                                 <a href="/admin/product/detail?orderid=${data}" class="btn btn-primary mx-2">
                                      <i class="bi bi-pencil-square"></i>
                                  
                                 </a>
                            </div>`
                },
                "width":"25%"
            }
        ]
    });
}
function Delete (url){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: "DELETE",
                success: (data) => {
                    dataTable.ajax.reload();
                    toastr.success(data.message);
                },
                error: () => {
                    toastr.error("Couldn't delete product");
                }

            })
        }
    });
}