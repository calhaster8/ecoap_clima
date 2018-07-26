$(document).ready(function() {
    buildUtilizacao();
    buildDistrito();
    buildFontesEnergia();
    buildTipoConsumo();
    buildPerfilMensal();
    buildPerfilSemanal();
    buildPerfilSel();
    buildPeriodos();
    buildClasseEnergia();
    buildAnosConst();
    buildTipoEnvidracado();
    buildFonteAquecimento();
    buildFonteArrefecimento();
    buildFonteNewAquecimento();
    buildFonteNewArrefecimento();
    buildDesvios();
    buildIdade();
    buildIdadeArr();
    rendCopLink();
    eerLink();
    fonteAqLink();
    fonteArrLink();
  

    $('#escolhe').change(fonteToTecnologia);
    $("select[name='consumos-caixa[]'").change(getFontesEnergiaData);
    $("#valor-input-consumo").change(dadosFirstTotal);
    $('#consumo-quest').change(consumoLinks);
    $('#cobertura').change(coberturaLinks);
    $('#classe-en').change(classeLinks);
    $('#ano').change(anoLinks);
    $('#fonte-aq').change(fonteAqLink);
    $('#fonte-ar').change(fonteArrLink)
    $('#rendimento').change(rendCopLink);
    $('#use-aqs').change(useAqsLink);
    $('#escolhe').change(responsiveFunctionTable);
    $('#use-aqs').change(responsiveFunctionTable);
    $('#consumo-quest').change(responsiveFunctionTable);
    $('#cons-aqs').change(responsiveFunctionTable);
    $('#cons-aqs').change(buildTipoConsumoTable);
    $('#escolhe').change(buildTipoConsumoTable);
    $('#consumo-quest').change(buildTipoConsumoTable);

    $('#aquecimento-consumo').change(buildConsumoTable);
    $('#arrefecimento-consumo').change(buildConsumoTable);
    $('#aqs-consumo').change(buildConsumoTable);
    $('#pres-aqs').change(presAqsLink);
    $('#eer').change(eerLink);
    $('#simulacao-aqs').change(simulacaoLink);
    $('#perfil-mensal').change(getPerfilMensal);
    $('#perfil-semanal').change(getPerfilSemanal);
    $('#new-fonte-aq').change(getCustoUnit);
    $('#tipo-consumo').change(setNumberOf);
    $("#add").click(addRowWaterUsage);
    $("#remove").click(removeRowWaterUsage);
    $("#add-consume").click(addRowConsumes);
    $("#remove-consume").click(removeRowConsumes);
    

    //style width select
    $('#tipo-envid').change(selWidth);

    $("#orientacao-paineis").change(function () {
        if ($(this).val() == 5) {
            $("#orientacao-input").val("");
            $("#orientacao-input").removeAttr("disabled");
        } else if ($(this).val() != '' && $(this).val() != undefined && $(this).val() > 0) {
            $("#orientacao-input").val(desvios[$(this).val()].valor);
            $("#orientacao-input").attr("disabled", "disabled");
        } else {
            $(this).val("");
            $("#orientacao-input").val("");
            $("#orientacao-input").attr("disabled", "disabled");
        }
    });
    
    $('#teste-but').click( function() {
        areaCalc();
        uCalc();
        invernoCalc();
        veraoCalc();
        necessidadesAquecimento();
    });
});

function buildIdade() {
    for (var i = 0; i < idades.length; i++) {
        $('#idade').append($('<option class="op"></option>').val(i).html(idades[i].nome));
    }
}

function buildIdadeArr() {
    for (var i = 0; i < idades.length; i++) {
        $('#age-eer').append($('<option class="op"></option>').val(i).html(idades[i].nome));
    }
}


//width select (grande texto)
function selWidth() {
    if($('#tipo-envid').val() == 0) {
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
    for(var i = 0; i < utilizacao_calc.length; i++) {
        $('#escolhe').append($('<option class="op"></option>').val(i).html(utilizacao_calc[i].nome));
    }
}

function buildDistrito() {
    for (var i = 0; i < distrito_info.length; i++) {
        $('#distrito').append($('<option class="op"></option>').val(i).html(distrito_info[i].nome));
    }
}


function buildFontesEnergia() {
    for (var i = 0; i < fonteEnergeticaI.length; i++) {
        $('#consumos-caixa').append($('<option class="op"></option>').val(i).html(fonteEnergeticaI[i].nome));
    }
}

function getFontesEnergiaData() {
    var id = $(this).val();
    if (id != "" && id != undefined && id >= 0) {
        $(this).parent().parent().find("#unidade-consumo").html(fonteEnergeticaI[id].unidade[0].unid_nome);
        $(this).parent().parent().next().find('#unidade-custo-consumo').html(fonteEnergeticaI[id].unidade[1].unid_custo_nome);
        $(this).parent().parent().next().find('#valor-pred-consumo').val(new Number(fonteEnergeticaI[id].unidade[1].valor * fonteEnergeticaI[id].unidade[0].valor).toFixed(2));
    } else {
        $(this).parent().parent().find("#unidade-consumo").html("unidade");
        $(this).parent().parent().next().find('#unidade-custo-consumo').html("€/unidade");
        $(this).parent().parent().next().find('#valor-pred-consumo').val(0);
    }

    dadosFirstTotal();
}


function buildTipoConsumo() {
    for (var i = 0; i < consumo_diario_agua.length; i++) {
        $('#tipo-consumo').append($('<option class="op"></option>').val(i).html(consumo_diario_agua[i].nome));
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
    if ($('#copy-row').css('display') == 'none') {

        $('#copy-row').find("#desctipoconsumo").html("");
        $('#copy-row').find("#tipo-consumo").val("");
        $('#copy-row').find("#tipoconsumoval").val("");
        $('#copy-row').show();
    } else {
        var firstRow = $("#copy-row");
        var copy = firstRow.clone(true);
        //insertBefore("#water-usage tbody>tr:last");
        copy.find("#desctipoconsumo").html("");
        copy.find("#tipo-consumo").val("");
        copy.find("#tipoconsumoval").val("");
        copy.insertBefore("#water-usage tbody>tr:last");
        copy.removeAttr("id");
    }
}

function removeRowWaterUsage() {
    var parentRow = $(this).parent().parent();
    if (parentRow.attr("id") != "copy-row") {
        var r = confirm("Tem a certeza que pretende remover?");
        //alert(r);
        if (r == true) {
            parentRow.remove();
        }
    } else {
        parentRow.hide();
    }
}


function addRowConsumes() {
    if ($('#copy-row-consume').css('display') == 'none' && $('#copy-row-consume-2').css('display') == 'none') {

        $('#copy-row-consume').find("#unidade-consumo").html("");
        $('#copy-row-consume').find("#consumos-caixa").val("");
        $('#copy-row-consume').find("#valor-input-consumo").val("");
        
        $('#copy-row-consume-2').find("#unidade-custo-consumo").html(""); 
        $('#copy-row-consume-2').find("#valor-pred-consumo").val("");
        
        $('#copy-row-consume').show();
        $('#copy-row-consume-2').show();
    } else {
        var firstRow = $("#copy-row-consume");
        var secondRow = $("#copy-row-consume-2");
        var copy = firstRow.clone(true);
        var copy2 = secondRow.clone(true);
        
        var index = $("select[name='consumos-caixa[]']").length;
        
        //insertBefore("#water-usage tbody>tr:last");
        
        copy.find("#unidade-consumo").html("unidade");
        copy.find("#consumos-caixa").val("");
        copy.find("#valor-input-consumo").val("");
        copy.insertBefore("#consumos-energeticos tbody>tr:last");
        copy.removeAttr("id");
        
        copy2.find("#unidade-custo-consumo").html("€/unidade");
        copy2.find("#valor-pred-consumo").val("");
        copy2.insertBefore("#consumos-energeticos tbody>tr:last");
        copy2.removeAttr("id");
    }
}

function removeRowConsumes() {
    var parentRow = $(this).parent().parent();
    if (parentRow.attr("id") != "copy-row-consume") {
        var r = confirm("Tem a certeza que pretende remover?");
        //alert(r);
        if (r == true) {
            parentRow.next().remove();
            parentRow.remove();   
            dadosFirstTotal();
        }
    } else {
        $('#copy-row-consume').find("#unidade-consumo").html("");
        $('#copy-row-consume').find("#consumos-caixa").val("");
        $('#copy-row-consume').find("#valor-input-consumo").val("");
        
        $('#copy-row-consume-2').find("#unidade-custo-consumo").html(""); 
        $('#copy-row-consume-2').find("#valor-pred-consumo").val("");
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
    for (var i = 0; i < perfil_necessidades.length; i++) {
        $('#perfil').append($('<option class="op"></option>').val(i).html(perfil_necessidades[i].nome));
    }
}

function buildPeriodos() {
    for (var i = 0; i < periodos_encerramento.length; i++) {
        $('#periodos').append($('<option class="op"></option>').val(i).html(periodos_encerramento[i].periodo));
    }
}

function buildClasseEnergia() {
    for (var i = 0; i < classes.length; i++) {
        $('#classe-en').append($('<option class="op"></option>').val(i).html(classes[i].classe_id));
    }
}

function buildAnosConst() {
    for (var i = 0; i < anos_construcao.length; i++) {
        $('#ano').append($('<option class="op"></option>').val(i).html(anos_construcao[i].nome));
    }
}

function buildTipoEnvidracado() {
    for (var i = 0; i < envidracados.length; i++) {
        $('#tipo-envid').append($('<option class="op"></option>').val(i).html(envidracados[i].nome));
    }
}

function buildFonteAquecimento() {
    for (var i = 0; i < tecnologia_atual_aquecimento.length; i++) {
        $('#fonte-aq').append($('<option class="op"></option>').val(i).html(tecnologia_atual_aquecimento[i].nome));
    }
}

function buildFonteArrefecimento() {
    for (var i = 0; i < tecnologia_atual_arrefecimento.length; i++) {
        $('#fonte-ar').append($('<option class="op"></option>').val(i).html(tecnologia_atual_arrefecimento[i].nome));
    }
}

function buildFonteNewAquecimento() {
    for (var i = 0; i < tecnologia_futura_aquecimento.length; i++) {
        $('#new-fonte-aq').append($('<option class="op"></option>').val(i).html(tecnologia_futura_aquecimento[i].nome));
    }
}

function buildFonteNewArrefecimento() {
    for (var i = 0; i < tecnologia_futura_arrefecimento.length; i++) {
        $('#new-fonte-ar').append($('<option class="op"></option>').val(i).html(tecnologia_futura_arrefecimento[i].nome));
    }
}

function buildDesvios() {
    for (var i = 0; i < desvios.length; i++) {
        $('#orientacao-paineis').append($('<option class="op"></option>').val(i).html(desvios[i].nome));
    }
}


function buildPerfilMensal() {
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

function consumoLinks() {
    if($('#consumo-quest').val() == 1) {
        $('.hid').removeClass('consumo-link');
    } else {
        $('.hid').addClass('consumo-link');
    }
}

function coberturaLinks() {
    if($('#cobertura').val() == 0) {
        $('.cobertura-answer').removeClass('cobertura-link');
    } else {
        $('.cobertura-answer').addClass('cobertura-link');
    }
}

function classeLinks() {
    if($('#classe-en').val() == 8) {
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
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir rendimento");
    } else {
        $(".rend").show();
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
        var text = $("#custo-en-unit-aq-label")[0].textContent.substring(0,begin) + " (€/" + tecnologia_atual_aquecimento[idLocal].unidade + ")";
        $("#custo-en-unit-aq-label")[0].textContent = text;
    }
    rendCopLink();
}

function fonteArrLink() {
    var idLocal = $('#fonte-ar').val();

    if (idLocal != "" && idLocal != undefined && idLocal >= 0) {
        $('#custo-en-unit-ar').val(tecnologia_atual_arrefecimento[idLocal].custo_unit);
        var begin = $("#custo-en-unit-ar-label")[0].textContent.indexOf("(");
        var text = $("#custo-en-unit-ar-label")[0].textContent.substring(0, begin) + " (€/" + tecnologia_atual_arrefecimento[idLocal].unidade + ")";
        $("#custo-en-unit-ar-label")[0].textContent = text;
    }
    eerLink();
}

function getCustoUnit() {
    
    var newFont = $("#new-fonte-aq").val();
    if(newFont!="" && newFont!=undefined && newFont>=0){
        if(newFont==0){
            $("#rend-med-label")[0].textContent = "COP";
        }else{
            $("#rend-med-label")[0].textContent = "Rendimento (%)";
        }
        $("#rend-med").val(new Number((tecnologia_futura_aquecimento[newFont].rendimento * (newFont==0 ? 1 : 100 )).toFixed(2)));
        $("#custo-unit-med-aq").val((tecnologia_futura_aquecimento[newFont].custo_unit*tecnologia_futura_aquecimento[newFont].fator_conversao).toFixed(2));
        
        var begin = $("#custo-unit-med-aq-label")[0].textContent.indexOf("(");
        var text = $("#custo-unit-med-aq-label")[0].textContent.substring(0,begin) + " (€/" + tecnologia_futura_aquecimento[newFont].unidade + ")";
        $("#custo-unit-med-aq-label")[0].textContent = text;
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

function eerLink() {
    var selectedRend = $('#eer').val();

    if (selectedRend == 2 && selectedRend != "" && selectedRend != undefined) {
        $('#iRendManArr').show();
        $('#labelIRendmanArr').show();
        $('.age-eer').hide();
        $('#age-eer').val("");
    } else if (selectedRend == 0 && selectedRend != "" && selectedRend != undefined) {
        $('#iRendManArr').hide();
        $('#labelIRendmanArr').hide();
        $('.age-eer').show();
        $('#age-eer').show();
    } else {
        $('#iRendManArr').hide();
        $('#labelIRendmanArr').hide();
        $('.age-eer').hide();
        $('#age-eer').hide();
    }
}

function buildTipoConsumoTable() {
    $('#aquecimento-consumo').find('option[value=0]').remove();
    $('#aquecimento-consumo').find('option[value=1]').remove();
    $('#arrefecimento-consumo').find('option[value=0]').remove();
    $('#arrefecimento-consumo').find('option[value=1]').remove();
    $('#aqs-consumo').find('option[value=0]').remove();
    $('#aqs-consumo').find('option[value=1]').remove();

    var html = '';
    var option = [];
    var size = 0;
    var escolha = $('#escolhe').val();
    var escolhaConsumosCli = $('#consumo-quest').val();
    var aqs = $('#use-aqs').val();
    var aqs_cons = $('#cons-aqs').val();

    //clean as tabelas
    option[size++] = 'aquecimento';
    option[size++] = 'arrefecimento';
    option[size++] = 'aqs';
    for (j = 0; j < 3; j++) {
        $("#tabela-consumo-" + option[j]).html(html);
    }

    option = [];

    for (var i = 0; i < consumos.length; i++) {
        if (escolhaConsumosCli != "" && escolhaConsumosCli != undefined && escolhaConsumosCli == 0) {
            if (escolha != "" && escolha != undefined && (escolha == 0 || escolha == 2)) {
                $('#arrefecimento-size').hide();
                $('#aquecimento-size').show();
                $('#aquecimento-consumo').append($('<option class="op"></option>').val(i).html(consumos[i]));
            }
            if (escolha != "" && escolha != undefined && (escolha == 1 || escolha == 2)) {
                $('#aquecimento-size').hide();
                $('#arrefecimento-size').show();
                $('#arrefecimento-consumo').append($('<option class="op"></option>').val(i).html(consumos[i]));
            }
        } else {
            $('#aquecimento-size').hide();
            $('#arrefecimento-size').hide();
        }
        if (aqs != "" && aqs != undefined && aqs == 0 && aqs_cons != "" && aqs_cons != undefined && aqs_cons == 0) {
            $('#aqs-size').show();
            $('#aqs-consumo').append($('<option class="op"></option>').val(i).html(consumos[i]));
        } else {
            $('#aqs-size').hide();
        }
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


function buildConsumoTable() {
    var escolha = new Number($('#escolhe').val());
    var aqs = new Number($('#use-aqs').val());
    var escolhaConsumosCli = new Number($('#consumo-quest').val());
    var aqs_cons = new Number($('#cons-aqs').val());

    var fonte_tec = $('#fonte-aq').val();
    var html = '';
    var option = [];
    var size = 0;


    if (escolha == 0 && escolhaConsumosCli == 0 && aqs == 1) {
        //so aquecimento
        //col-md-12
        option[size++] = 'aquecimento';

    } else if (escolha == 0 && escolhaConsumosCli == 0 && aqs == 0) {
        //aquecimento + aqs
        //col-md-6
        option[size++] = 'aquecimento';
        option[size++] = 'aqs';

    } else if (escolha == 1 && escolhaConsumosCli == 0 && aqs == 1) {
        //arrefecimento
        option[size++] = 'arrefecimento';


    } else if (escolha == 1 && escolhaConsumosCli == 0 && aqs == 0 && aqs_cons == 0) {
        //arrefecimento + aqs
        option[size++] = 'arrefecimento';
        option[size++] = 'aqs';


    } else if (escolha == 2 && aqs == 1) {
        //aquecimento + arrefecimento
        option[size++] = 'aquecimento';
        option[size++] = 'arrefecimento';


    } else if (escolha == 2 && escolhaConsumosCli == 0 && aqs == 0 && aqs_cons == 0) {
        //aquecimento + arrefecimento + aqs
        option[size++] = 'aquecimento';
        option[size++] = 'arrefecimento';
        option[size++] = 'aqs';

    }

    for (var i = 0; i < size; i++) {
        if (option != undefined && option != '' && option.length > 0) {
            html = '<table class="table table-bordered" id="' + option[i] + 'Table"><tbody>';

            var consumo_build = $('#' + option[i] + '-consumo').val();

            if (consumo_build != "" && consumo_build != undefined && consumo_build == 0) {
                //anual
                html += '<tr class="textTR"><td class="in">TOTAL ANUAL (' + tecnologia_atual_aquecimento[fonte_tec].unidade + ')</td><td class="in"><input name="' + option[i] + 'ConsumoAnualTotal" type="number" placeholder="0" class="form-control xInput"/></td></tr>';

            } else if (consumo_build != "" && consumo_build != undefined && consumo_build == 1) {
                //mensal
                html += '<tr class="textTR"><td class="in">MESES</td><td class="in">Unidade (' + tecnologia_atual_aquecimento[fonte_tec].unidade + ')</td></tr>';
                for (j = 0; j < meses_numero_horas.length; j++) {
                    html += '<tr class="textTR"><td class="in">' + meses_numero_horas[j].mes + '</td><td class="in"><input name="' + option[i] + 'ConsumosMeses[]" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
                }
                html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input type="number" id="total_consumo_somatorio_' + option[i] + '" disabled="disabled" placeholder="0"  class="form-control xInput"/></label></td></tr>';
            }

            html += '</tbody></table>';

            $("#tabela-consumo-" + option[i]).html(html);

            $("input[name='" + option[i] + "ConsumosMeses[]']").change(function () {
                totalAnualConsumos = 0;
                for (k = 0; k < $("input[name='" + option[i] + "ConsumosMeses[]']").length; i++) {
                    totalAnualConsumos += new Number($("input[name='" + option[i] + "ConsumosMeses[]']")[i].value);
                }
                $("#total_consumo_somatorio_" + option[i]).val(totalAnualConsumos);
            });

        }
    }
    
}


function useAqsLink() {
    if($('#use-aqs').val() == 0) {
        $('.pres-aqs').removeClass('use-aqs-link');
    } else {
        $('.pres-aqs').addClass('use-aqs-link');
    }
}

function presAqsLink() {
    if ($('#pres-aqs').val() == 0) {
        $('.cons-aqs').removeClass('pres-aqs-link');
    } else {
        $('.cons-aqs').addClass('pres-aqs-link');
    }
}

/*function fonteAqMedLink() {
    if ($('#new-fonte-aq').val() == 3 || $('#new-fonte-aq').val() == 4) {
        $('.rend-med').addClass('cop-med-link');
        $('.cop-med').removeClass('cop-med-link');
    } else {
        $('.rend-med').removeClass('cop-med-link');
        $('.cop-med').addClass('cop-med-link');
    }
}*/

function simulacaoLink() {
    if ($('#simulacao-aqs').val() == 0) {
        $('.orientacao').removeClass('simulacao-link');
        $('#perfilAQS-same').removeClass('perfil-hidden');
    } else {
        $('.orientacao').addClass('simulacao-link');
        $('#perfilAQS-same').addClass('perfil-hidden');
    }
}

function fonteToTecnologia() {
    if($('#escolhe').val() == 0) {
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

    } else if ($('#escolhe').val() == 1){
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


/*function tableShowTotals() {
    if ($('#aq-consumo').val() == 0 || $('#ar-consumo').val() == 0 || $('#aqs-consumo').val() == 0) {
        $('.hid-anual').removeClass('total-anual');
    } else if ($('#aq-consumo').val() == 1 || $('#ar-consumo').val() == 1 || $('#aqs-consumo').val() == 1){
        $('.hid-anual').addClass('total-anual');
        $('.hid-mensal').removeClass('total-mensal');
    } else if ($('#aq-consumo').val() == "" || $('#ar-consumo').val() == "" || $('#aqs-consumo').val() == ""){
        $('.hid-anual').addClass('total-anual');
        $('.hid-mensal').addClass('total-mensal');
    }
}*/


function consumoGoTo() {
    var consId = $('.step:visible').data('id');
    var consNextId = $('.step:visible').data('id') + 1;
    var use_aqs = $('#use-aqs').val();
    var conhece_cons = $('#consumo-quest').val();
    var inclui_aqs = $('#pres-aqs').val();
    var cons_aqs = $('#cons-aqs').val();

    //APARTIR TECNOLOGIA
    if (conhece_cons == 1 && (use_aqs == 1 || (use_aqs == 0 && inclui_aqs == 1))) {
        $('[data-id="' + consId + '"]').hide();
        $('[data-id="5"]').show();

        $('.but-2').hide();
        $('.perfil-consumo-step').hide();
        $('.perfil-consumo-back').hide();
        $('.end-step').show();
    } else if (conhece_cons == 0 && (use_aqs == 1 || (use_aqs == 0 && inclui_aqs == 1))) {
        $('[data-id="' + consId + '"]').hide();
        $('[data-id="4"]').show();

        $('.but-2').hide();
        $('.perfil-consumo-step').hide();
        $('.perfil-consumo-back').show();
        $('.end-step').hide();
    } else if (conhece_cons == 1 && use_aqs == 0 && inclui_aqs == 0 && cons_aqs == 1) {
        if(consId == 2) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="3"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (consId == 3) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="5"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').show();
        }
    } else if (conhece_cons == 0 && use_aqs == 0 && inclui_aqs == 0 && cons_aqs == 1) {
        if (consId == 2) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="3"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (consId == 3) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="4"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (consId == 4) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="5"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').show();
        }
    }

}

function consumoBackTo() {
    var consId = $('.step:visible').data('id');
    var consPrevId = $('.step:visible').data('id') - 1;
    //$('[data-id="' + consId + '"]').hide();
    //$('[data-id="' + consPrevId + '"]').show();
    var use_aqs = $('#use-aqs').val();
    var conhece_cons = $('#consumo-quest').val();
    var inclui_aqs = $('#pres-aqs').val();
    var cons_aqs = $('#cons-aqs').val();
    
    if (conhece_cons == 1 && (use_aqs == 1 || (use_aqs == 0 && inclui_aqs == 1))) {
        if (consId == 2 && consPrevId == 1) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="1"]').show();

            $('.but-2').show();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();

            $('#anterior-inicio').hide();

        }
    } else if (conhece_cons == 0 && (use_aqs == 1 || (use_aqs == 0 && inclui_aqs == 1))) {
        if (consId == 2 && consPrevId == 1) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="1"]').show();

            $('.but-2').show();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();

            $('#anterior-inicio').hide();
        } else if (consId == 4) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="2"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        }
    } else if (conhece_cons == 1 && use_aqs == 0 && inclui_aqs == 0 && cons_aqs == 1) {
        if (consId == 2 && consPrevId == 1) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="1"]').show();

            $('.but-2').show();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();

            $('#anterior-inicio').hide();
        } else if(consId == 3) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="' + consPrevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        }
    } else if (conhece_cons == 0 && use_aqs == 0 && inclui_aqs == 0 && cons_aqs == 1) {
        if (consId == 2 && consPrevId == 1) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="1"]').show();

            $('.but-2').show();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();

            $('#anterior-inicio').hide();
        } else if (consId == 3) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="' + consPrevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (consId == 4) {
            $('[data-id="' + consId + '"]').hide();
            $('[data-id="' + consPrevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        }
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

    if ($('#escolhe').val() == 1 && id == 3) {
        $('[data-id="' + id + '"]').hide();
        $('[data-id="' + nextId + '"]').hide();
        $('[data-id="5"]').show();
    }


    if (nextId == 2) {
        $('.but-2').hide();
        $('.perfil-consumo-step').show();
        $('.perfil-consumo-back').hide();
        $('.end-step').hide();
    }

    if (nextId == 5) {
        //BOTOES
        $('.but-2').hide();
        $('.perfil-consumo-step').hide();
        $('.perfil-consumo-back').hide();
        $('.end-step').show();

        //STEP
        $('#perfilAQS-same').addClass('perfil-hidden');
    }

    if (nextId == 6) {
        //BOTOES
        $('.but-2').hide();
        $('.perfil-consumo-step').hide();
        $('.perfil-consumo-back').hide();
        $('.end-step').show();
        $('.end-but').hide();
    }
}


function prevStep() {
    var id = $('.step:visible').data('id');
    var prevId = $('.step:visible').data('id') - 1;
    var use_aqs = $('#use-aqs').val();
    var conhece_cons = $('#consumo-quest').val();
    var inclui_aqs = $('#pres-aqs').val();
    var cons_aqs = $('#cons-aqs').val();

    if (conhece_cons == 1 && (use_aqs == 1 || (use_aqs == 0 && inclui_aqs == 1))) {
        if (id == 5) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="2"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();

        }

        if(id == 6) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').show();
            $('.end-but').show();
        }
    } else if (conhece_cons == 0 && (use_aqs == 1 || (use_aqs == 0 && inclui_aqs == 1))) {
        if(id == 5) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (id == 6) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').show();
            $('.end-but').show();
        }
    } else if (conhece_cons == 1 && use_aqs == 0 && inclui_aqs == 0 && cons_aqs == 1) {
        if (id == 5) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="3"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (id == 6) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').show();
            $('.end-but').show();
        }
    } else if (conhece_cons == 0 && use_aqs == 0 && inclui_aqs == 0 && cons_aqs == 1) {
        if (id == 5) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').show();
            $('.perfil-consumo-back').hide();
            $('.end-step').hide();
        } else if (id == 6) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.but-2').hide();
            $('.perfil-consumo-step').hide();
            $('.perfil-consumo-back').hide();
            $('.end-step').show();
            $('.end-but').show();
        }
    }
}