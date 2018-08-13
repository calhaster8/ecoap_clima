$(document).ready(function () {
    //step 1 - dados
    buildUtilizacao();
    buildDistrito();
    buildFontesEnergia();
    buildPerfilSel();
    buildPeriodos();
    buildClasseEnergia();
    buildAnosConst();
    buildTipoEnvidracado();
    //step 2 - aqueciemnto
    buildFonteAquecimento();
    buildIdade();
    rendCopLink();
    fonteAqLink();
    buildConsumosAqs();
    buildTipoConsumo();
    buildTipoConsumoAqsTable();

    //step 3 - medidas
    buildFonteNewAquecimento();
    buildDesvios();


    // ---------------------------------------

    //step 1 - dados
    $("#consumos-caixa1").change(function () {
        var id = $(this).val();
        if (id != "" && id != undefined && id >= 0) {
            $(this).parent().parent().find("#unidade-consumo1").html(fonteEnergeticaI[id].unidade[0].unid_nome);
            $(this).parent().parent().next().find("#unidade-custo-consumo1").html(fonteEnergeticaI[id].unidade[1].unid_custo_nome);
            $(this).parent().parent().next().find("#valor-pred-consumo1").val(new Number(fonteEnergeticaI[id].unidade[1].valor * fonteEnergeticaI[id].unidade[0].valor).toFixed(2));
        } else {
            $(this).parent().parent().find("#unidade-consumo1").html("unidade");
            $(this).parent().parent().next().find('#unidade-custo-consumo1').html("€/unidade");
            $(this).parent().parent().next().find('#valor-pred-consumo1').val("");
        }
        dadosFirstTotal();
    });

    $("#valor-input-consumo1").change(dadosFirstTotal);

    $("#add-consume").click(addRowConsumes);
    $("#remove-consume1").click(removeRowConsumes);
    $('#consumo-quest').change(buildTipoConsumoClimatizacaoTable);

    $('#cobertura').change(coberturaLinks);
    $('#classe-en').change(classeLinks);
    $('#ano').change(anoLinks);

    $('#aquecimento-consumo').change(buildConsumoTable);
    $('#tipo-envid').change(selWidth);

    //step 2 - aqueciemtno
    $('#fonte-aq').change(fonteAqLink);
    $('#rendimento').change(rendCopLink);
    $('#use-aqs').change(useAqsLink);
    $('#pres-aqs').change(presAqsLink);

    $('#cons-aqs').change(function () {
        if ($('#cons-aqs').val() == 1) {
            $(".nconhece-consumos-aqs").show();
            $(".conhece-consumos-aqs").hide();
        } else if ($('#cons-aqs').val() != "" && $('#cons-aqs').val() == 0) {
            $(".conhece-consumos-aqs").show();
            $(".nconhece-consumos-aqs").hide();
        }
    });

    $('#aqs-consumo').change(buildConsumosAqs);
    $('#tipo-consumo1').change(setNumberOf);


    //step 3 - medidas
    $('#new-fonte-aq').change(getCustoUnit);
    $("#simulacao-aqs").change(function () {
        if ($('#simulacao-aqs').val() == 1) {
            $("#tbl-simular-solar").hide();
        } else if ($('#simulacao-aqs').val() != "" && $('#simulacao-aqs').val() == 0) {
            $("#tbl-simular-solar").show();
        }
    });

    $("#orientacao-paineis").change(function () {
        if ($(this).val() == 3) {
            $("#orientacao-input").val("");
            $("#orientacao-input").removeAttr("disabled");
        } else if ($(this).val() != '' && $(this).val() != undefined && $(this).val() >= 0) {
            $("#orientacao-input").val(desvios[$(this).val()].valor);
            $("#orientacao-input").attr("disabled", "disabled");
        } else {
            $(this).val("");
            $("#orientacao-input").val("");
            $("#orientacao-input").attr("disabled", "disabled");
        }
    });
    $("#add").click(addRowWaterUsage);
    $("#remove1").click(removeRowWaterUsage);

    // ------------------------------------------------

    $("#clima-form").validate({
        rules: {
            //passo 1
            distrito: {
                required: true
            },
            'area-dados-input': {
                required: true,
                number: true,
                min: 1,
                step: 0.01
            },
            'consumo-quest': {
                required: true
            },
            'aquecimento-consumo': {
                required: function () {
                    if ($(".conhece-consumos").is(":hidden")) {
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            cobertura: {
                required: function () {
                    if ($("#consumo-quest").val() == 1) {
                        return true;
                    } else {
                        return false;
                    }

                }
            },
            perfil: {
                required: function () {
                    if ($("#consumo-quest").val() == 1) {
                        return true;
                    } else {
                        return false;
                    }

                }
            },
            periodos: {
                required: function () {
                    if ($("#consumo-quest").val() == 1) {
                        return true;
                    } else {
                        return false;
                    }

                }
            },
            'classe-en': {
                required: function () {
                    if ($("#consumo-quest").val() == 1) {
                        return true;
                    } else {
                        return false;
                    }

                }
            },
            'area-cobertura-input': {
                required: function () {
                    if ($("#cobertura").val() != "" && $("#cobertura").val() == 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                max: function () {
                    if ($("#area-dados-input").val() != "" && $("#area-dados-input").val() > 0) {
                        return $("#area-dados-input").val();
                    } else {
                        return 0;
                    }
                },
                min: 1,
                number: true,
                step: 0.01
            },
            ano: {
                required: function () {
                    if ($("#classe-en").val() == 8) {
                        return true;
                    } else {
                        return false;
                    }

                }
            },
            'tipo-envid': {
                required: function () {
                    if ($("#ano").val() == 1 || $("#ano").val() == 4) {
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            'isol-paredes': {
                required: function () {
                    if ($("#ano").val() == 1 || $("#ano").val() == 4) {
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            'isol-cobertura': {
                required: function () {
                    if ($("#ano").val() == 1 || $("#ano").val() == 4) {
                        return false;
                    } else {
                        return true;
                    }

                }
            },
            //passo 2
            'fonte-aq': {
                required: true
            },
            'potencia-aq': {
                required: true,
                number: true,
                min: 1,
                step: 0.01
            },
            'rendimento': {
                required: true
            },
            'iRendMan': {
                required: function () {
                    if ($("#rendimento").val() == 2 && $("#fonte-aq").val() != "" && $("#fonte-aq").val() >= 0 && $("#fonte-aq").val() < 6) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number: true,
                min: 0.01,
                step: 0.01,
                max: function () {
                    //se rendimento % max = 100
                    if ($("#fonte-aq").val() != "" && $("#fonte-aq").val() >= 0 && $("#fonte-aq").val() < 4) {
                        return 7;
                    } else {
                        return 110;
                    }
                },
            },
            'idade': {
                required: function () {
                    if ($("#rendimento").val() == 0 && $("#rendimento").val() != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'custo-en-unit-aq': {
                required: true,
                number: true,
                min: 0.0001,
                step: 0.0001
            },
            'use-aqs': {
                required: true
            },
            'pres-aqs': {
                required: function () {
                    if ($("#use-aqs").val() == 0 && $("#use-aqs").val() != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'cons-aqs': {
                required: function () {
                    if ($("#pres-aqs").val() == 0 && $("#pres-aqs").val() != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            //passo 3
            'new-fonte-aq': {
                required: true
            },
            'pot-med-aq': {
                required: function () {
                    if ($("#new-fonte-aq").val() != "" && $("#new-fonte-aq").val() == 5 ) {
                        return false;
                    } else {
                        return true;
                    }
                },
                number: true,
                step: 0.01,
                min: 1
            },
            'rend-med': {
                required: function () {
                    if ($("#new-fonte-aq").val() != "" && $("#new-fonte-aq").val() == 5 ) {
                        return false;
                    } else {
                        return true;
                    }
                },
                number: true,
                step: 0.01,
                min: 0.01,
                max: function () {
                    if ($("#new-fonte-aq").val() != "" && $("#new-fonte-aq").val() >= 0 && $("#new-fonte-aq").val() < 3) {
                        return 7;
                    } else {
                        return 110;
                    }
                }
            },
            'custo-unit-med-aq': {
                required: function () {
                    if ($("#new-fonte-aq").val() != "" && $("#new-fonte-aq").val() == 5 ) {
                        return false;
                    } else {
                        return true;
                    }
                },
                number: true,
                step: 0.0001,
                min: 0.0001
            },
            'simulacao-aqs': {
                required: function () {
                    if ($("#new-fonte-aq").val() != "" && $("#new-fonte-aq").val() == 5 ) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            'orientacao-paineis': {
                required: function () {
                    if ($("#simulacao-aqs").val() == 0 && $("#simulacao-aqs").val() != "") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'orientacao-input': {
                required: function () {
                    if ($("#orientacao-paineis").val() == 3 && $("#orientacao-paineis").val() != "") {
                        return true;
                    } else {
                        return false;
                    }
                },
                min: 0,
                max: 70,
                step: 0.1
            },
            'tipo-consumo1': {
                required: true
            },
            'tipoconsumoval1': {
                required: true,
                number: true,
                min: 1,
                step: 1,
                digits: true
            }
        },
        messages: {
            //passo 2
            distrito: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'area-dados-input': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>'
            },
            'consumo-quest': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'aquecimento-consumo': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            cobertura: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            perfil: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            periodos: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'classe-en': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'area-cobertura-input': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                max: function () {
                    if ($("#area-dados-input").val() != "" && $("#area-dados-input").val() > 0 && $("#area-dados-input").val() < $("#area-cobertura-input").val()) {
                        return '<label style="font-size: 14px; color: red;">Área não pode ser superior à área total a climatizar.</label>';
                    } else {
                        return '<label style="font-size: 14px; color: red;">Por favor preencha correctamente a àrea a climatizar.</label>';
                    }
                },
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 1.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>'
            },
            ano: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'tipo-envid': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'isol-paredes': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'isol-cobertura': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            //passo 3
            'fonte-aq': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'potencia-aq': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>'
            },
            'rendimento': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'iRendMan': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 0.01.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>',
                max: function () {
                    //se rendimento % max = 100
                    if ($("#fonte-aq").val() != "" && $("#fonte-aq").val() >= 0 && $("#fonte-aq").val() < 4) {
                        return '<label style="font-size: 14px; color: red;">O valor máximo para o rendimento desta fonte de aquecimento é de 110%.</label>';
                    } else {
                        return '<label style="font-size: 14px; color: red;">O valor máximo para o rendimento desta fonte de aquecimento é de 7.</label>';
                    }
                }
            },
            'idade': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'custo-en-unit-aq': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 0.0001.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.0001.</label>',
            },
            'use-aqs': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'pres-aqs': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'cons-aqs': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'new-fonte-aq': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'pot-med-aq': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>',
            },
            'rend-med': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 0.01.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>',
            },
            'custo-unit-med-aq': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 0.0001.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.0001.</label>',
            },
            'simulacao-aqs': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'orientacao-paineis': {
                required: function () {
                    if ($("#simulacao-aqs").val() == 0 && $("#simulacao-aqs").val() != "") {
                        return '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>';
                    }
                }
            },
            'orientacao-input': {
                required: function () {
                    if ($("#orientacao-paineis").val() == 3 && $("#orientacao-paineis").val() != "") {
                        return '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>';
                    }
                },
                max: '<label style="font-size: 14px; color: red;">O  máximo de área aceite é 1000.</label',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10.01</label>',
                min: '<label style="font-size: 14px; color: red;">O  minimo de área aceite é 0.01.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01.</label>',
            },
            'tipo-consumo1': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>'
            },
            'tipoconsumoval1': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>'
            }
        }

    });

    $(".seguinte").click(function () {
        if ($("#clima-form").valid()) {
            nextStep();
        }
    });
    $(".end-but").click(function () {
        if ($("#clima-form").valid()) {
            
        }
    });


    $("#reanalise-but").click(function () {
        if ($("#clima-form").valid()) {
            
        }
    });

    $('#reload-but').click(function () {
        location.reload();
    });


});

function buildIdade() {
    for (var i = 0; i < idades.length; i++) {
        $('#idade').append($('<option class="op"></option>').val(i).html(idades[i].nome));
    }
}

//width select (grande texto)
function selWidth() {
    if ($('#tipo-envid').val() == 0) {
        $('#tipo-envid').css('width', '50%');
    } else if ($('#tipo-envid').val() == 1) {
        $('#tipo-envid').css('width', '60%');
    } else if ($('#tipo-envid').val() == 2) {
        $('#tipo-envid').css('width', '75%');
    } else if ($('#tipo-envid').val() == 3) {
        $('#tipo-envid').css('width', '90%');
    }
}


function buildUtilizacao() {
    $("#escolhe")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < utilizacao_calc.length; i++) {
        $('#escolhe').append($('<option class="op"></option>').val(i).html(utilizacao_calc[i].nome));
    }
    $('#escolhe').val(0);
}

function buildDistrito() {
    $("#distrito")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < distrito_info.length; i++) {
        $('#distrito').append($('<option class="op"></option>').val(i).html(distrito_info[i].nome));
    }
}


function buildFontesEnergia() {
    $("#consumos-caixa1")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < fonteEnergeticaI.length; i++) {
        $('#consumos-caixa1').append($('<option class="op"></option>').val(i).html(fonteEnergeticaI[i].nome));
    }
}


function buildTipoConsumo() {
    $("#tipo-consumo1")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < consumo_diario_agua.length; i++) {
        $('#tipo-consumo1').append($('<option class="op"></option>').val(i).html(consumo_diario_agua[i].nome));
    }
}

function setNumberOf() {
    var parentRow = $(this).parent().parent().find("#desctipoconsumo");
    if ($(this).val() == "" || $(this).val() == undefined || $(this).val() < 0) {
        parentRow.html("");
    } else {
        parentRow.html(consumo_diario_agua[$(this).val()].numero_de);
    }
}


function addRowWaterUsage() {
    if ($('#copy-row-aqs').css('display') == 'none') {

        $('#copy-row-aqs').find("#desctipoconsumo").html("");
        $('#copy-row-aqs').find("#tipo-consumo1").val("");
        $('#copy-row-aqs').find("#tipoconsumoval1").val("");
        $('#copy-row-aqs').show();
    } else {
        var firstRow = $("#copy-row-aqs");
        var copy = firstRow.clone(true);
        aqsRowId++;
        //insertBefore("#water-usage tbody>tr:last");
        copy.find("#desctipoconsumo").html("");

        copy.find("#tipo-consumo1").val("");
        copy.find("#tipo-consumo1").attr('name', 'tipo-consumo' + aqsRowId);
        copy.find("#tipo-consumo1").attr('id', 'tipo-consumo' + aqsRowId);

        copy.find("#tipoconsumoval1").val("");
        copy.find("#tipoconsumoval1").attr('name', 'tipoconsumoval' + aqsRowId);
        copy.find("#tipoconsumoval1").attr('id', 'tipoconsumoval' + aqsRowId);

        copy.find("#remove1").attr('id', 'remove' + aqsRowId);
        
        copy.insertBefore("#water-usage tbody>tr:last");
        copy.removeAttr("id");

        $('#tipo-consumo' + aqsRowId).change(setNumberOf);

        $('#tipo-consumo' + aqsRowId).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>'
            }
        });
        $('#tipoconsumoval' + aqsRowId).rules("add", {
            required: true,
            number: true,
            min: 1,
            step: 1,
            digits: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>'
            }
        });
        
        $("#remove" + aqsRowId).click(removeRowWaterUsage);
        $("#remove" + (aqsRowId - 1)).attr("disabled", "disabled");

    }
}

function removeRowWaterUsage() {
    var parentRow = $(this).parent().parent();
    if (parentRow.attr("id") != "copy-row-aqs") {
        var r = confirm("Tem a certeza que pretende remover?");
        //alert(r);
        if (r == true) {
            parentRow.prev().find("#remove" + (aqsRowId - 1)).removeAttr("disabled");
            parentRow.remove();
        }
        aqsRowId--;
    } else {
        $('#copy-row-aqs').find("#desctipoconsumo").html("");
        $('#copy-row-aqs').find("#tipo-consumo1").val("");
        $('#copy-row-aqs').find("#tipoconsumoval1").val("");
        parentRow.hide();
    }
}


function addRowConsumes() {


    if ($('#copy-row-consume').css('display') == 'none' && $('#copy-row-consume-2').css('display') == 'none') {

        $('#copy-row-consume').find("#unidade-consumo1").html("");
        $('#copy-row-consume').find("#consumos-caixa1").val("");
        $('#copy-row-consume').find("#valor-input-consumo1").val("");

        $('#copy-row-consume-2').find("#unidade-custo-consumo1").html("");
        $('#copy-row-consume-2').find("#valor-pred-consumo1").val("");

        $('#copy-row-consume').show();
        $('#copy-row-consume-2').show();
    } else {
        var firstRow = $("#copy-row-consume");
        var secondRow = $("#copy-row-consume-2");
        var copy = firstRow.clone(true);
        var copy2 = secondRow.clone(true);

        inputId++;

        copy.find("#unidade-consumo1").html("unidade");

        copy.find("#unidade-consumo1").attr('name', 'unidade-consumo' + inputId);
        copy.find("#unidade-consumo1").attr('id', 'unidade-consumo' + inputId);

        copy.find("#consumos-caixa1").val("");
        copy.find("#consumos-caixa1").attr('name', 'consumos-caixa' + inputId);
        copy.find("#consumos-caixa1").attr('id', 'consumos-caixa' + inputId);

        copy.find("#valor-input-consumo1").val("");
        copy.find("#valor-input-consumo1").attr('name', 'valor-input-consumo' + inputId);
        copy.find("#valor-input-consumo1").attr('id', 'valor-input-consumo' + inputId);

        copy.find("#remove-consume1").attr('id', 'remove-consume' + inputId);

        copy.insertBefore("#consumos-energeticos tbody>tr:last");
        copy.removeAttr("id");

        copy2.find("#unidade-custo-consumo1").html("€/unidade");
        copy2.find("#unidade-custo-consumo1").attr('id', 'unidade-custo-consumo' + inputId);
        copy2.find("#unidade-custo-consumo1").attr('name', 'unidade-custo-consumo' + inputId);
        copy2.find("#valor-pred-consumo1").val("");
        copy2.find("#valor-pred-consumo1").attr('id', 'valor-pred-consumo' + inputId);
        copy2.find("#valor-pred-consumo1").attr('name', 'valor-pred-consumo' + inputId);
        copy2.insertBefore("#consumos-energeticos tbody>tr:last");
        copy2.removeAttr("id");

        $('#valor-input-consumo' + inputId).rules("add", {
            required: function (element) {

                if ($("#consumos-caixa" + inputId).val() != "" && $("#consumos-caixa" + inputId).val() >= 0) {
                    return true;
                } else {
                    return false;
                }
            },
            number: true,
            min: 1,
            step: 1,
            digits: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>'
            }
        });

        $('#valor-input-consumo' + inputId).change(dadosFirstTotal);

        $('#consumos-caixa' + inputId).change(function () {
            var id = $(this).val();
            if (id != "" && id != undefined && id >= 0) {
                $(this).parent().parent().find("#unidade-consumo" + inputId).html(fonteEnergeticaI[id].unidade[0].unid_nome);
                $(this).parent().parent().next().find('#unidade-custo-consumo' + inputId).html(fonteEnergeticaI[id].unidade[1].unid_custo_nome);
                $(this).parent().parent().next().find('#valor-pred-consumo' + inputId).val(new Number(fonteEnergeticaI[id].unidade[1].valor * fonteEnergeticaI[id].unidade[0].valor).toFixed(2));
            } else {
                $(this).parent().parent().find("#unidade-consumo").html("unidade");
                $(this).parent().parent().next().find('#unidade-custo-consumo').html("€/unidade");
                $(this).parent().parent().next().find('#valor-pred-consumo').val("");
            }
            dadosFirstTotal();
        });

        $("#remove-consume" + inputId).click(removeRowConsumes);
        $("#remove-consume" + (inputId - 1)).attr("disabled", "disabled");
    }
}

function removeRowConsumes() {
    var parentRow = $(this).parent().parent();
    if (parentRow.attr("id") != "copy-row-consume") {
        var r = confirm("Tem a certeza que pretende remover?");
        //alert(r);
        if (r == true) {
            parentRow.prev().prev().find("#remove-consume" + (inputId - 1)).removeAttr("disabled");
            parentRow.next().remove();
            parentRow.remove();
            dadosFirstTotal();
        }
        inputId--;
    } else {
        $('#copy-row-consume').find("#unidade-consumo1").html("");
        $('#copy-row-consume').find("#consumos-caixa1").val("");
        $('#copy-row-consume').find("#valor-input-consumo1").val("");

        $('#copy-row-consume-2').find("#unidade-custo-consumo1").html("");
        $('#copy-row-consume-2').find("#valor-pred-consumo1").val("");
        parentRow.next().hide();
        parentRow.hide();
        dadosFirstTotal();
    }

}

/*function getTipoConsumo() {
 var id = new Number($('#tipo-consumo').val());
 $('#tipo-consumo-descricao').html(consumo_diario_agua[id].numero_de);
 }*/

function buildPerfilSel() {
    $("#perfil")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < perfil_necessidades.length; i++) {
        $('#perfil').append($('<option class="op"></option>').val(i).html(perfil_necessidades[i].nome));
    }
}

function buildPeriodos() {
    $("#periodos")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < periodos_encerramento.length; i++) {
        $('#periodos').append($('<option class="op"></option>').val(i).html(periodos_encerramento[i].periodo));
    }
}

function buildClasseEnergia() {
    $("#classe-en")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < classes.length; i++) {
        $('#classe-en').append($('<option class="op"></option>').val(i).html(classes[i].classe_id));
    }
}

function buildAnosConst() {
    $("#ano")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < anos_construcao.length; i++) {
        $('#ano').append($('<option class="op"></option>').val(i).html(anos_construcao[i].nome));
    }
}

function buildTipoEnvidracado() {
    $("#tipo-envid")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < envidracados.length; i++) {
        $('#tipo-envid').append($('<option class="op"></option>').val(i).html(envidracados[i].nome));
    }
}

function buildFonteAquecimento() {
    $("#fonte-aq")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < tecnologia_atual_aquecimento.length; i++) {
        $('#fonte-aq').append($('<option class="op"></option>').val(i).html(tecnologia_atual_aquecimento[i].nome));
    }
}


function buildFonteNewAquecimento() {
    $("#new-fonte-aq")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < tecnologia_futura_aquecimento.length; i++) {
        $('#new-fonte-aq').append($('<option class="op"></option>').val(i).html(tecnologia_futura_aquecimento[i].nome));
    }
}



function buildDesvios() {
    $("#orientacao-paineis")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');
    for (var i = 0; i < desvios.length; i++) {
        $('#orientacao-paineis').append($('<option class="op"></option>').val(i).html(desvios[i].nome));
    }
}


function buildPerfilMensal() {
    $("#perfil-mensal")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');

    for (var i = 0; i < perfil_mensal.length; i++) {
        $('#perfil-mensal').append($('<option class="op"></option>').val(i).html(perfil_mensal[i].nome));
    }
}


function getPerfilMensal() {
    if ($('#perfil-mensal').val() == 3) {
        $('.table-mensal').removeClass('hide-perfil-mensal');
    } else {
        $('.table-mensal').addClass('hide-perfil-mensal');
    }
}

function buildPerfilSemanal() {
    $("#perfil-semanal")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');

    for (var i = 0; i < perfil_semanal.length; i++) {
        $('#perfil-semanal').append($('<option class="op"></option>').val(i).html(perfil_semanal[i].nome));
    }
}

function getPerfilSemanal() {
    if ($('#perfil-semanal').val() == 3) {
        $('.table-semanal').removeClass('hide-perfil-semanal');
    } else {
        $('.table-semanal').addClass('hide-perfil-semanal');
    }
}


function coberturaLinks() {
    if ($('#cobertura').val() != "" && $('#cobertura').val() == 0) {
        $('.cobertura-answer').removeClass('cobertura-link');
    } else {
        $('.cobertura-answer').addClass('cobertura-link');
    }
}

function classeLinks() {
    if ($('#classe-en').val() == 8) {
        $('.ano-construct').removeClass('classe-link');
    } else {
        $('.ano-construct').addClass('classe-link');
    }
}

function anoLinks() {
    if (($('#ano').val() == 0 || $('#ano').val() == 2 || $('#ano').val() == 3) && $('#ano').val() != "" && $('#ano').val() != undefined) {
        $('.hid-ano').removeClass('ano-construct-link');
    } else {
        $('.hid-ano').addClass('ano-construct-link');
    }
}

function fonteAqLink() {
    var idLocal = $('#fonte-aq').val();

    if (idLocal == 4 || idLocal == 5) {
        $(".rend").show();
        $("#labelRendimento").html("COP");
        $("#rendimento").val("");
        $("#labelIRendman").html("Insira o COP");
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#rendimento").show();
        $("#labelRendimento").show();
        $("#iRendMan").removeAttr("disabled");
        $('#rendimento').find("option[value='2']").html("Inserir COP");
    } else if (idLocal == 6) {
        $(".rend").hide();
        $("#labelRendimento").hide();
        $("#rendimento").hide();
        $("#rendimento").val("2");
        $("#iRendMan").val("1");

    } else if (idLocal != "" && idLocal != undefined && idLocal >= 0) {
        $(".rend").show();
        $("#labelRendimento").html("Rendimento (%)");
        $("#rendimento").val("");
        $("#idade").val("");
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#rendimento").show();
        $("#labelRendimento").show();
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir rendimento");
    } else {
        $(".rend").show();
        $("#rendimento").show();
        $("#labelRendimento").show();
        $("#labelRendimento").html("Rendimento (%) / COP");
        $("#rendimento").val("");
        $("#idade").val("");
        $("#idade").hide();
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir rendimento");
    }
    if (idLocal != "" && idLocal != undefined && idLocal >= 0) {
        $('#custo-en-unit-aq').val(tecnologia_atual_aquecimento[idLocal].custo_unit);
        var begin = $("#custo-en-unit-aq-label")[0].textContent.indexOf("(");
        var text = $("#custo-en-unit-aq-label")[0].textContent.substring(0, begin) + " (€/" + tecnologia_atual_aquecimento[idLocal].unidade + ")";
        $("#custo-en-unit-aq-label")[0].textContent = text;
    }
    rendCopLink();
}

function getCustoUnit() {

    var newFont = $("#new-fonte-aq").val();
    if (newFont != "" && newFont != undefined && newFont >= 0) {
        if (newFont == 3 || newFont==4) {
            $("#rend-med-label")[0].textContent = "COP";
        } else{
            $("#rend-med-label")[0].textContent = "Rendimento (%)";
        }
        
        if(newFont>=0 && newFont<5){
            $("#rend-med").val(new Number((tecnologia_futura_aquecimento[newFont].rendimento * ((newFont == 3 || newFont==4 )? 1 : 100)).toFixed(2)));
            $("#custo-unit-med-aq").val((tecnologia_futura_aquecimento[newFont].custo_unit * tecnologia_futura_aquecimento[newFont].fator_conversao).toFixed(2));

            var begin = $("#custo-unit-med-aq-label")[0].textContent.indexOf("(");
            var text = $("#custo-unit-med-aq-label")[0].textContent.substring(0, begin) + " (€/" + tecnologia_futura_aquecimento[newFont].unidade + ")";
            $("#custo-unit-med-aq-label")[0].textContent = text;
        } else{
             $("#rend-med").val("");
             $("#custo-unit-med-aq").val("");
             $("#custo-unit-med-aq-label")[0].textContent= "Custo energético unitário (€/kWh)";
        }  
    }
}


function rendCopLink() {
    //NOVO
    var idLocal = $('#fonte-aq').val();
    var selectedRend = $('#rendimento').val();
    if (selectedRend == 2 && (idLocal == 4 || idLocal == 5)) {
        $('#rendimento').find("option[value='2']").html("Inserir COP");
        $('#iRendMan').show();
        $('#labelIRendman').hide();
    } else if (selectedRend == 2 && $('#fonte-aq').val() != 6) {
        $('#rendimento').find("option[value='2']").html("Inserir rendimento");
        $('#iRendMan').show();
        $('#labelIRendman').hide();
    } else if ($('#fonte-aq').val() != 6) {
        $('#iRendMan').val("");
        $('#iRendMan').hide();
        $('#labelIRendman').hide();
    } else {
        $('#rendimento').find("option[value='2']").html("Inserir rendimento");
        $('#iRendMan').hide();
        $('#labelIRendman').hide();
    }

    if (selectedRend == 0 && selectedRend != "" && selectedRend != undefined) {
        $('.age').show();
        $('#idade').show();
    } else {
        $('.age').hide();
        $('#idade').val("");
    }

}

function buildTipoConsumoAqsTable() {

    $("#aqs-consumo")
            .find('option')
            .remove()
            .end()
            .append('<option class="op" value="">Seleccionar uma opção</option>')
            .val('');

    var html = '';
    var option = [];
    var size = 0;

    //clean as tabelas
    option[size++] = 'aqs';

    for (j = 0; j < size; j++) {
        $("#tabela-consumo-" + option[j]).html(html);
    }

    option = [];

    for (var i = 0; i < consumos.length; i++) {
        $('#aqs-consumo').append($('<option class="op"></option>').val(i).html(consumos[i]));
    }

}


function buildTipoConsumoClimatizacaoTable() {


    if ($('#consumo-quest').val() == 1) {
        $('.hid').removeClass('consumo-link');
        $(".conhece-consumos").hide();


    } else if ($('#consumo-quest').val() != "" && $('#consumo-quest').val() == 0) {
        $("#aquecimento-consumo")
                .find('option')
                .remove()
                .end()
                .append('<option class="op" value="">Seleccionar uma opção</option>')
                .val('');

        var html = '';
        var option = [];
        var size = 0;
        var escolha = $('#escolhe').val();
        var escolhaConsumosCli = $('#consumo-quest').val();

        //clean as tabelas
        option[size++] = 'aquecimento';

        for (j = 0; j < size; j++) {
            $("#tabela-consumo-" + option[j]).html(html);
        }

        option = [];

        for (var i = 0; i < consumos.length; i++) {
            if (escolhaConsumosCli != "" && escolhaConsumosCli != undefined && escolhaConsumosCli == 0) {
                if (escolha != "" && escolha != undefined && escolha == 0) {
                    $('#aquecimento-size').show();
                    $('#aquecimento-consumo').append($('<option class="op"></option>').val(i).html(consumos[i]));
                }
            }
        }

        $(".conhece-consumos").show();
        $('.hid').addClass('consumo-link');
    }
}


function responsiveFunctionTable() {
    var escolha = new Number($('#escolhe').val());
    var aqs = new Number($('#use-aqs').val());
    var escolhaConsumosCli = new Number($('#consumo-quest').val());
    var aqs_cons = new Number($('#cons-aqs').val());

    if (escolha == 0 && aqs == 1) {
        //so aquecimento
        //col-md-12

        //DISPLAY OPTIONS
        $('#aquecimento-size').removeClass('col-md-4');
        $('#aquecimento-size').removeClass('col-md-6');
        $('#aquecimento-size').addClass('col-md-12');

        $('#aquecimento-size').css('display', 'block');
        $('#arrefecimento-size').css('display', 'none');
        $('#aqs-size').css('display', 'none');

    } else if (escolha == 0 && aqs == 0 && aqs_cons == 0) {
        //aquecimento + aqs
        //col-md-6

        //DISPLAY OPTIONS
        $('#aquecimento-size').removeClass('col-md-4');
        $('#aquecimento-size').removeClass('col-md-12');
        $('#aquecimento-size').addClass('col-md-6');

        $('#aqs-size').removeClass('col-md-4');
        $('#aqs-size').removeClass('col-md-12');
        $('#aqs-size').addClass('col-md-6');

        $('#aquecimento-size').css('display', 'block');
        $('#aqs-size').css('display', 'block');
        $('#arrefecimento-size').css('display', 'none');

    } else if (escolha == 1 && aqs == 1) {
        //arrefecimento

        //DISPLAY OPTIONS
        $('#arrefecimento-size').removeClass('col-md-4');
        $('#arrefecimento-size').removeClass('col-md-6');
        $('#arrefecimento-size').addClass('col-md-12');

        $('#arrefecimento-size').css('display', 'block');
        $('#aquecimento-size').css('display', 'none');
        $('#aqs-size').css('display', 'none');

    } else if (escolha == 1 && aqs == 0 && aqs_cons == 0) {
        //arrefecimento + aqs

        //DISPLAY OPTIONS
        $('#arrefecimento-size').removeClass('col-md-4');
        $('#arrefecimento-size').removeClass('col-md-12');
        $('#arrefecimento-size').addClass('col-md-6');

        $('#aqs-size').removeClass('col-md-4');
        $('#aqs-size').removeClass('col-md-12');
        $('#aqs-size').addClass('col-md-6');

        $('#aquecimento-size').css('display', 'none');
        $('#arrefecimento-size').css('display', 'block');
        $('#aqs-size').css('display', 'block');

    } else if (escolha == 2 && aqs == 1) {
        //aquecimento + arrefecimento

        //DISPLAY OPTIONS
        $('#aquecimento-size').removeClass('col-md-4');
        $('#aquecimento-size').removeClass('col-md-12');
        $('#aquecimento-size').addClass('col-md-6');

        $('#arrefecimento-size').removeClass('col-md-4');
        $('#arrefecimento-size').removeClass('col-md-12');
        $('#arrefecimento-size').addClass('col-md-6');

        $('#aquecimento-size').css('display', 'block');
        $('#arrefecimento-size').css('display', 'block');
        $('#aqs-size').css('display', 'none');

    } else if (escolha == 2 && aqs == 0 && aqs_cons == 0) {
        //aquecimento + arrefecimento + aqs

        //DISPLAY OPTIONS
        $('#aquecimento-size').removeClass('col-md-6');
        $('#aquecimento-size').removeClass('col-md-12');
        $('#aquecimento-size').addClass('col-md-4');

        $('#arrefecimento-size').removeClass('col-md-6');
        $('#arrefecimento-size').removeClass('col-md-12');
        $('#arrefecimento-size').addClass('col-md-4');

        $('#aqs-size').removeClass('col-md-6');
        $('#aqs-size').removeClass('col-md-12');
        $('#aqs-size').addClass('col-md-4');

        $('#aquecimento-size').css('display', 'block');
        $('#arrefecimento-size').css('display', 'block');
        $('#aqs-size').css('display', 'block');
    }
}


function buildConsumosAqs() {

    var html = '';
    var option = [];
    var size = 0;

    html = '<table class="table table-bordered" id="aqsTable"><tbody>';

    var consumo_build = $('#aqs-consumo').val();

    if (consumo_build != "" && consumo_build != undefined && consumo_build == 0) {
        //anual
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input id="aqsConsumoAnualTotal" name="aqsConsumoAnualTotal" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
    } else if (consumo_build != "" && consumo_build != undefined && consumo_build == 1) {
        //mensal
         html += '<tr class="textTR"><td class="in">MESES</td><td class="in">Unidade</td></tr>';
        for (j = 0; j < meses_numero_horas.length; j++) {
            html += '<tr class="textTR"><td class="in">' + meses_numero_horas[j].mes + '</td><td class="in"><input id="aqsConsumosMeses' + j + '" name="aqsConsumosMeses' + j + '" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
        }
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input type="number" id="total_consumo_somatorio_aqs" disabled="disabled" placeholder="0"  class="form-control xInput"/></label></td></tr>';
    }

    html += '</tbody></table>';

    $("#tabela-consumo-aqs").html(html);



    if (consumo_build != "" && consumo_build != undefined && consumo_build == 1) {
        for (j = 0; j < meses_numero_horas.length; j++) {

            $("#aqsConsumosMeses" + j).change(function () {
                totalAnualConsumos = 0;
                for (k = 0; k < meses_numero_horas.length; k++) {
                    totalAnualConsumos += new Number($("#aqsConsumosMeses" + k).val());
                }
                $("#total_consumo_somatorio_aqs").val(totalAnualConsumos);
            });

            $("#aqsConsumosMeses" + j).rules("add", {
                required: function (element) {

                    if ($('#aqs-consumo').val() != "" && $('#aqs-consumo').val() == 1) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number: true,
                min: 1,
                step: 1,
                digits: true,
                messages: {
                    required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                    min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                    step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                    digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                    number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>'

                }
            });
        }
    } else if (consumo_build != "" && consumo_build != undefined && consumo_build == 0) {
        $("#aqsConsumoAnualTotal").rules("add", {
            required: function (element) {

                if ($('#aqs-consumo').val() != "" && $('#aqs-consumo').val() == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            min: 1,
            step: 1,
            digits: true,
            number: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>',
            }
        });
    }


}



function buildConsumoTable() {
    
    var html = '';
    var option = [];
    var size = 0;
    html = '<table class="table table-bordered" id="aquecimentoTable"><tbody>';

    var consumo_build = $('#aquecimento-consumo').val();

    if (consumo_build != "" && consumo_build != undefined && consumo_build == 0) {
        //anual
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input id="aquecimentoConsumoAnualTotal" name="aquecimentoConsumoAnualTotal" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
    } else if (consumo_build != "" && consumo_build != undefined && consumo_build == 1) {
        //mensal
         html += '<tr class="textTR"><td class="in">MESES</td><td class="in">Unidade</td></tr>';
        for (j = 0; j < meses_numero_horas.length; j++) {
            html += '<tr class="textTR"><td class="in">' + meses_numero_horas[j].mes + '</td><td class="in"><input id="aquecimentoConsumosMeses' + j + '" name="aquecimentoConsumosMeses' + j + '" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
        }
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input type="number" id="total_consumo_somatorio_aquecimento" disabled="disabled" placeholder="0"  class="form-control xInput"/></label></td></tr>';
    }

    html += '</tbody></table>';

    $("#tabela-consumo-aquecimento").html(html);


    if (consumo_build != "" && consumo_build != undefined && consumo_build == 1) {
        for (j = 0; j < meses_numero_horas.length; j++) {
             $("#aquecimentoConsumosMeses" + j).change(function () {
                totalAnualConsumos = 0;
                for (k = 0; k < meses_numero_horas.length; k++) {
                    totalAnualConsumos += new Number($("#aquecimentoConsumosMeses" + k).val());
                }
                $("#total_consumo_somatorio_aquecimento").val(totalAnualConsumos);
            });

            $("#aquecimentoConsumosMeses" + j).rules("add", {
                required: function (element) {

                    if ($('#aquecimento-consumo').val() != "" && $('#aquecimento-consumo').val() == 1) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number: true,
                min: 1,
                step: 1,
                digits: true,
                messages: {
                    required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                    min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                    step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                    digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                    number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>'

                }
            });
        }
    } else if (consumo_build != "" && consumo_build != undefined && consumo_build == 0) {
        $("#aquecimentoConsumoAnualTotal").rules("add", {
            required: function (element) {

                if ($('#aquecimento-consumo').val() != "" && $('#aquecimento-consumo').val() == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            min: 1,
            step: 1,
            digits: true,
            number: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório dado que seleccionou um tipo de consumo.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',
                digits: '<label style="font-size: 14px; color: red;">Insira números sem casas decimais. Ex: 10</label>',
                number: '<label style="font-size: 14px; color: red;">Por favor introduza um número válido. Ex: 10</label>',
            }
        });
    }

}



function useAqsLink() {
    if ($('#use-aqs').val() != "" && $('#use-aqs').val() == 0) {
        $('.pres-aqs').removeClass('use-aqs-link');
    } else {
        $('.pres-aqs').addClass('use-aqs-link');
    }
}

function presAqsLink() {
    if ($('#pres-aqs').val() != "" && $('#pres-aqs').val() == 0) {
        $('.cons-aqs').removeClass('pres-aqs-link');
    } else {
        $('.cons-aqs').addClass('pres-aqs-link');
    }
}




function fonteToTecnologia() {
    if ($('#escolhe').val() != "" && $('#escolhe').val() == 0) {
        //// TECNOLOGIAS ////
        //aquecimento
        $('.fonte-aquecimento').css('display', 'inherit');
        $('.pot-aq').css('display', 'inherit');
        $('.custo-energia-unit-aq').css('display', 'inherit');

        //arrefecimento
        $('.fonte-ar').css('display', 'none');
        $('.pot-ar').css('display', 'none');
        $('.eer').css('display', 'none');
        $('.custo-energia-unit-ar').css('display', 'none');

        //// MEDIDAS ////
        //aquecimento
        $('.new-fonte-aq').show();
        $('.pot-med-aq').show();
        $('.rend-med').show();
        $('.custo-unit-med-aq').show();

        //arrefecimento
        $('.new-fonte-ar').hide();
        $('.pot-med-ar').hide();
        $('.eer-med-ar').hide();
        $('.custo-unit-med-ar').hide();

    } else if ($('#escolhe').val() == 1) {
        //// TECNOLOGIAS ////
        //aquecimento
        $('.fonte-aquecimento').css('display', 'none');
        $('.pot-aq').css('display', 'none');
        $('.rend').css('display', 'none');
        $('.custo-energia-unit-aq').css('display', 'none');
        $('.use-aqs').css('display', 'none');

        //arrefecimento
        $('.fonte-ar').css('display', 'inherit');
        $('.pot-ar').css('display', 'inherit');
        $('.eer').css('display', 'inherit');
        $('.custo-energia-unit-ar').css('display', 'inherit');

        //// MEDIDAS ////
        //aquecimento
        $('.new-fonte-aq').hide();
        $('.pot-med-aq').hide();
        $('.rend-med').hide();
        $('.custo-unit-med-aq').hide();

        //arrefecimento
        $('.new-fonte-ar').show();
        $('.pot-med-ar').show();
        $('.eer-med-ar').show();
        $('.custo-unit-med-ar').show();

    } else if ($('#escolhe').val() == 2) {
        //// TECNOLOGIAS ////
        //aquecimento
        $('.fonte-aquecimento').css('display', 'inherit');
        $('.pot-aq').css('display', 'inherit');
        $('.custo-energia-unit-aq').css('display', 'inherit');


        //arrefecimento
        $('.fonte-ar').css('display', 'inherit');
        $('.pot-ar').css('display', 'inherit');
        $('.eer').css('display', 'inherit');
        $('.custo-energia-unit-ar').css('display', 'inherit');

        //// MEDIDAS ////
        //aquecimento
        $('.new-fonte-aq').show();
        $('.pot-med-aq').show();
        $('.rend-med').show();
        $('.custo-unit-med-aq').show();

        //arrefecimento
        $('.new-fonte-ar').show();
        $('.pot-med-ar').show();
        $('.eer-med-ar').show();
        $('.custo-unit-med-ar').show();

    }
}

// BUTTONS STEPS
function nextStep() {
    var id = $('.step:visible').data('id');
    var nextId = $('.step:visible').data('id') + 1;
    $('[data-id="' + id + '"]').hide();
    $('[data-id="' + nextId + '"]').show();

    if ($('.anterior:hidden').length > 1) {
        $('.anterior').show();
    }
    
    //resultados
    if(nextId==4){
        //mostrar o print
        //mostrar o voltar ao inicio
        //mostrar anterior
    }
}


function prevStep() {
    var id = $('.step:visible').data('id');
    var prevId = $('.step:visible').data('id') - 1;
   
    
    if (id == 2) {        
        //esconder voltar ao inicio
        //esconder analisar 
        //esconder anterior
        //mostar proximo
    }

    if (id == 3) {
        //esconder voltar ao inicio
        //esconder analisar 
        //mostar proximo
        //mostar anterior
    }
    
    if (id == 4) {
        //esconder voltar ao inicio
        //mostrar anterior e analisar
    }
    
}