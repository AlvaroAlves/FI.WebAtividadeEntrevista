var objBenef = new Array();

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
                node.id = window.objBenef[i].cpf;
                var col = document.createElement("td");
                col.innerHTML = window.objBenef[i].cpf;
                node.appendChild(col);
                var col2 = document.createElement("td");
                col2.innerHTML = window.objBenef[i].nome;
                node.appendChild(col2);
                var col3 = document.createElement("td");
                col3.innerHTML = '<button type="button" class="btn btn-primary pull-right">Alterar</button>';
                node.appendChild(col3);
                var col4 = document.createElement("td");
                col4.innerHTML = '<button type="button" class="btn btn-primary" onClick = "removeBenef(\'' + window.objBenef[i].id + '\',\'' + node.id + '\');">Excluir</button>';
                node.appendChild(col4);
                dvTable.appendChild(node);
            }

            $("#modal").modal();
        })
    });
})

function addBenef() {

    var form = document.forms["formBeneficiarios"].getElementsByTagName("input");

    if (document.getElementById(form.CPF.value))
        return;

    objBenef.push(new beneficiario(form.idBenef.value, form.Nome.value, form.CPF.value))

    var dvTable = document.getElementById("tabBenef");
    dvTable.innerHTML = "";

    for (var i = 0; i < window.objBenef.length; i++) {
        var node = document.createElement("tr");
        node.id =  window.objBenef[i].cpf;
        var col = document.createElement("td");
        col.innerHTML = window.objBenef[i].cpf;
        node.appendChild(col);
        var col2 = document.createElement("td");
        col2.innerHTML = window.objBenef[i].nome;
        node.appendChild(col2);
        var col3 = document.createElement("td");
        col3.innerHTML = '<button type="button" class="btn btn-primary pull-right">Alterar</button>';
        node.appendChild(col3);
        var col4 = document.createElement("td");
        col4.innerHTML = '<button type="button" class="btn btn-primary" onClick = "removeBenef(\'' + window.objBenef[i].id + '\',\'' + node.id + '\');">Excluir</button>';
        node.appendChild(col4);
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

function removeBenef(idBenef, idRow) {
    var r = confirm("Deseja excluir o beneficiário?");
    if (r == false) {
        return;
    }

    //remove o valor do DOM
    var beneficiario = document.getElementById(idRow);
    beneficiario.parentNode.removeChild(beneficiario);

    //limpa o registro da variável global
    for (var i = window.objBenef.length - 1; i >= 0; i--) {
        if (window.objBenef[i].cpf === idRow) {
            window.objBenef.splice(i, 1);
        }
    }
}

async function listBenef(idCliente) {
    objBenef = new Array();
    
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
                        objBenef.push(new beneficiario(r[i].Id, r[i].Nome, r[i].CPF.replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")));
                    }
                }
                return true;
            }
    });
};
