﻿function formataCPF(campo, evt) {
    var xPos = PosicaoCursor(campo);

    evt = getEvent(evt);

    var tecla = getKeyCode(evt);

    if (!teclaValida(tecla))

        return;



    vr = campo.value = filtraNumeros(filtraCampo(campo));

    tam = vr.length;

    if (tam >= 3 && tam < 6)

        campo.value = vr.substr(0, 3) + '.' + vr.substr(3);

    else if (tam >= 6 && tam < 9)

        campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6);

    else if (tam >= 9)

        campo.value = vr.substr(0, 3) + '.' + vr.substr(3, 3) + '.' + vr.substr(6, 3) + '-' + vr.substr(9);

    MovimentaCursor(campo, xPos);

}

//descobre qual a posição do cursor no campo

function PosicaoCursor(textarea) {

    var pos = 0;

    if (typeof (document.selection) != 'undefined') {

        //IE

        var range = document.selection.createRange();

        var i = 0;

        for (i = textarea.value.length; i > 0; i--) {

            if (range.moveStart('character', 1) == 0)

                break;

        }

        pos = i;

    }

    if (typeof (textarea.selectionStart) != 'undefined') {

        //FireFox

        pos = textarea.selectionStart;

    }



    if (pos == textarea.value.length)

        return 0; //retorna 0 quando não precisa posicionar o elemento

    else

        return pos; //posição do cursor

}

// recupera o evento do form

function getEvent(evt) {

    if (!evt) evt = window.event; //IE

    return evt;

}

//Recupera o código da tecla que foi pressionado

function getKeyCode(evt) {

    var code;

    if (typeof (evt.keyCode) == 'number')

        code = evt.keyCode;

    else if (typeof (evt.which) == 'number')

        code = evt.which;

    else if (typeof (evt.charCode) == 'number')

        code = evt.charCode;

    else

        return 0;



    return code;

}

//evita criar mascara quando as teclas são pressionadas

function teclaValida(tecla) {

    if (tecla == 8 //backspace

        //Esta evitando o post, quando são pressionadas estas teclas.

        //Foi comentado pois, se for utilizado o evento texchange, é necessario o post.

        || tecla == 9 //TAB

        || tecla == 27 //ESC

        || tecla == 16 //Shif TAB

        || tecla == 45 //insert

        || tecla == 46 //delete

        || tecla == 35 //home

        || tecla == 36 //end

        || tecla == 37 //esquerda

        || tecla == 38 //cima

        || tecla == 39 //direita

        || tecla == 40)//baixo

        return false;

    else

        return true;

}

// limpa todos caracteres que não são números

function filtraNumeros(campo) {

    var s = "";

    var cp = "";

    vr = campo;

    tam = vr.length;

    for (i = 0; i < tam; i++) {

        if (vr.substring(i, i + 1) == "0" ||

            vr.substring(i, i + 1) == "1" ||

            vr.substring(i, i + 1) == "2" ||

            vr.substring(i, i + 1) == "3" ||

            vr.substring(i, i + 1) == "4" ||

            vr.substring(i, i + 1) == "5" ||

            vr.substring(i, i + 1) == "6" ||

            vr.substring(i, i + 1) == "7" ||

            vr.substring(i, i + 1) == "8" ||

            vr.substring(i, i + 1) == "9") {

            s = s + vr.substring(i, i + 1);

        }

    }

    return s;

    //return campo.value.replace("/", "").replace("-", "").replace(".", "").replace(",", "")

}

// limpa todos os caracteres especiais do campo solicitado

function filtraCampo(campo) {

    var s = "";

    var cp = "";

    vr = campo.value;

    tam = vr.length;

    for (i = 0; i < tam; i++) {

        if (vr.substring(i, i + 1) != "/"

            && vr.substring(i, i + 1) != "-"

            && vr.substring(i, i + 1) != "."

            && vr.substring(i, i + 1) != "("

            && vr.substring(i, i + 1) != ")"

            && vr.substring(i, i + 1) != ":"

            && vr.substring(i, i + 1) != ",") {

            s = s + vr.substring(i, i + 1);

        }

    }

    return s;

    //return campo.value.replace("/", "").replace("-", "").replace(".", "").replace(",", "")

}

// move o cursor para a posição pos

function MovimentaCursor(textarea, pos) {

    if (pos <= 0)

        return; //se a posição for 0 não reposiciona



    if (typeof (document.selection) != 'undefined') {

        //IE

        var oRange = textarea.createTextRange();

        var LENGTH = 1;

        var STARTINDEX = pos;



        oRange.moveStart("character", -textarea.value.length);

        oRange.moveEnd("character", -textarea.value.length);

        oRange.moveStart("character", pos);

        //oRange.moveEnd("character", pos);

        oRange.select();

        textarea.focus();

    }

    if (typeof (textarea.selectionStart) != 'undefined') {

        //FireFox

        textarea.selectionStart = pos;

        textarea.selectionEnd = pos;

    }

}