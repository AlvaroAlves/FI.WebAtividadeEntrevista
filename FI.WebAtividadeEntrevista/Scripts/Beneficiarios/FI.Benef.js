﻿var objBenef = new Array();

function beneficiario(id, nome, cpf) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
}

$(function () {
    $(".beneficiarios").click(function () {
        $("#modal").load(urlModal, function () {
            var dvTable = document.getElementById("tabBenef");
            dvTable.innerHTML = "";

            for (var i = 0; i < window.objBenef.length; i++) {
                var node = document.createElement("tr");
                node.id = "ben" + window.objBenef[i].cpf;
                var row = document.createElement("td");
                row.innerHTML = window.objBenef[i].cpf;
                node.appendChild(row);
                var row2 = document.createElement("td");
                row2.innerHTML = window.objBenef[i].nome;
                node.appendChild(row2);
                dvTable.appendChild(node);
            }

            $("#modal").modal();
        })
    });
})

function addBenef() {

    var form = document.forms["formBeneficiarios"].getElementsByTagName("input");

    if (document.getElementById("ben" + form.CPF.value))
        return;

    objBenef.push(new beneficiario(form.idBenef.value, form.Nome.value, form.CPF.value))

    var dvTable = document.getElementById("tabBenef");
    dvTable.innerHTML = "";

    for (var i = 0; i < window.objBenef.length; i++) {
        var node = document.createElement("tr");
        node.id = "ben" + window.objBenef[i].cpf;
        var row = document.createElement("td");
        row.innerHTML = window.objBenef[i].cpf;
        node.appendChild(row);
        var row2 = document.createElement("td");
        row2.innerHTML = window.objBenef[i].nome;
        node.appendChild(row2);
        dvTable.appendChild(node);
    }

    form.Nome.value = "";
    form.CPF.value = "";
}

function incluirBenef(objBenef, idCliente) {
    $.ajax({
        url: urlIncluirBenef,
        method: "POST",
        data: {
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

function listBenef(idCliente) {
    $.ajax({
        url: urlListarBenef,
        method: "POST",
        data: {
            "IdCliente": idCliente
        },
        error:
            function (r) {
                return false;
            },
        success:
            function (r) {
                if (r.length > 0) {
                    for (var i = 0; i < r.length; i++) {
                        objBenef.push(new beneficiario(r[i].id, r[i].Nome, r[i].CPF.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")));
                    }
                }
            }
    });
};