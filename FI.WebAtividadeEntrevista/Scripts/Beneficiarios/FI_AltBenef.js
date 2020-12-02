function altBenef(objBenef, idCliente){
    $.ajax({
        url: urlAlterarBenef,
        method: "POST",
        data: {
            "ID": objBenef.id,
            "CPF": objBenef.cpf,
            "nome": objBenef.nome,
            "idCliente": idCliente
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