function altBenef(objBenef, idCliente){
    $.ajax({
        url: urlAlterarBenef,
        method: "POST",
        data: {
            "idCliente" : idCliente,
            list: JSON.stringify(objBenef)
        },
        error:
            function (r) {
                return false;
            },
        success:
            function (r) {
                return true;
            }
    });
};