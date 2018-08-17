function dadosFirstTotal() {
    //var userValues = $("input[name='valor-input-consumo[]']");
    //var idsConsumos = $("select[name='consumos-caixa[]']");
    
    if (inputId>=1 && $("#valor-input-consumo1").val()!="" && $("#consumos-caixa1").val()!="") {
        first_total = 0;
        
        for(i=1;i<=inputId;i++){
            if($("#valor-input-consumo" + i).val()!="" && $("#valor-input-consumo" + i).val()!= undefined && $("#valor-input-consumo" + i).val()>0 && 
                   $("#consumos-caixa"+i).val()!="" && $("#consumos-caixa"+i).val()!= undefined && $("#consumos-caixa"+i).val()>=0){
                first_total += $("#valor-input-consumo" + i).val() * fonteEnergeticaI[$("#consumos-caixa"+i).val()].unidade[0].valor;
            }            
        }
        
    } else {
        first_total = 0;        
    }
    if(first_total>0){
        $('#total-titulo').val(first_total.toFixed(0) + " kWh" );
    }else{
        $('#total-titulo').val("");
    }
}

function run(){
    var consumos = $("#consumo-quest").val();
    
    if(consumos!="" && consumos==1){
        uCalc();
        invernoCalc();
        veraoCalc();
        necessidadesAquecimento();
        consumoInicialAquecimento();
    }
    
    necessidadesEnergeticas();
    correcaoOrientacao();
    energiaSolarCaptadaM2();
    racio();
    nColetores();
    areaNecessidade();
    energiaSolarCaptadaMJ();
    energiaSolarUtilizada();
    energiaSolarUtilizadaPerc();
    energiaSA();
    energiaSAPerc();
    excedenteSolar();
    excedenteSolarPerc();

    volumeAcumulacao();
    cenarioInicialConsumosAqs();
    cenarioInicialConsumosAquecimento();
    cenarioInicialConsumosTotais();
    cenarioInicialCustosAquecimento();
    cenarioInicialCustosAqs();
    cenarioInicialCustosTotais();
    cenarioFinalConsumosAquecimento();
    cenarioFinalConsumosAqs();
    cenarioFinalConsumosTotais();
    cenarioFinalCustosAquecimento();
    cenarioFinalCustosAqs();
    cenarioFinalCustosTotais();
    cenarioFinalReducaoAquecimento();
    cenarioFinalReducaoAqs();
    cenarioFinalReducaoTotais();
    resumoAquecimento();
    resumoAqs();
    resumoGlobals();
    showResumo();
    showGlobalResumo();
    nextStep();
    
}

function areaCalc() {
    var idDistrito = $('#distrito').val();
    var area_input = $('#area-dados-input').val();
    var area_climatizar_exterior = $('#cobertura').val();
    var area_climatizar_exterior_input = $('#area-cobertura-input').val();
    paredes_area = 0;
    envidracados_area = 0;
    cobertura_area = 0;
    
    
    paredes_area = area_input * envolvente;
    
    envidracados_area = area_input * envidracados_direto;
    
    if (area_climatizar_exterior == 1) {
        cobertura_area = 0;
    } else {
        cobertura_area = new Number(area_climatizar_exterior_input);
    }
   
}

function uCalc() {
    var isolamento_paredes = $('#isol-paredes').val();
    var classe_energia = $('#classe-en').val();
    var isolamento_cobertura = $('#isol-cobertura').val();
    var anos_de_construcao = $('#ano').val();
    var tipo_envidracados_calc = $('#tipo-envid').val();

    paredes_u = 0;
    envidracados_u = 0;
    cobertura_u = 0;

    //paredes u
    if(classe_energia == 8) {
        if(isolamento_paredes == 1) {
            paredes_u = anos_construcao[anos_de_construcao].info[0].valor;
        } else {
            paredes_u = 1/((1/anos_construcao[anos_de_construcao].info[0].valor)+1);
        }
    } else {
        paredes_u = classes[classe_energia].info[0].valor;
    }


    //envidracados u
    if (classe_energia == 8) {
        if (anos_de_construcao == 0 || anos_de_construcao == 2 || anos_de_construcao == 3) {
            envidracados_u = envidracados[tipo_envidracados_calc].u
        } else{
            envidracados_u = anos_construcao[anos_de_construcao].info[2].valor;
        }
    } else {
        envidracados_u = classes[classe_energia].info[1].valor;
    }


    //cobertura u
    if (classe_energia == 8) {
        if (isolamento_cobertura == '' || isolamento_cobertura == 1) {
            cobertura_u = anos_construcao[anos_de_construcao].info[4].valor;
        } else {
            cobertura_u = anos_construcao[anos_de_construcao].info[5].valor;
        }
    } else {
        cobertura_u = classes[classe_energia].info[3].valor;
    }

}

function invernoCalc() {
    var idDistrito = $('#distrito').val();
    var area_input = $('#area-dados-input').val();

    paredes_kwh_inverno = 0;
    paredes_perc_inverno = 0;
    envidracados_kwh_inverno = 0;
    envidracados_perc_inverno = 0;
    cobertura_kwh_inverno = 0;
    cobertura_perc_inverno = 0;
    ganhos_kwh_inverno = 0;
    ganhos_perc_inverno = 0;
    total_1_kwh_inverno = 0;
    total_2_kwh_inverno = 0;
    total_3_kwh_inverno = 0;
    total_4_kwh_inverno = 0;

    paredes_kwh_inverno = (paredes_area * paredes_u * distrito_info[idDistrito].gdi * coeficient_conversao);

    envidracados_kwh_inverno = (envidracados_area * envidracados_u * distrito_info[idDistrito].gdi * coeficient_conversao);

    cobertura_kwh_inverno = (cobertura_area * cobertura_u * distrito_info[idDistrito].gdi * coeficient_conversao);

    ganhos_kwh_inverno = (ganhos_internos_i * area_input * distrito_info[idDistrito].duracao_estacao + (envidracados_area * 0.1 * (distrito_info[idDistrito].radiacao * 0.25) * distrito_info[idDistrito].duracao_estacao));

    total_1_kwh_inverno = (paredes_kwh_inverno + envidracados_kwh_inverno + cobertura_kwh_inverno - (ganhos_kwh_inverno * fator_ganhos));

    total_2_kwh_inverno = (total_1_kwh_inverno / area_input);

    total_3_kwh_inverno = total_2_kwh_inverno / distrito_info[idDistrito].ni;


    //PERCENTAGENS    
    paredes_perc_inverno = (paredes_kwh_inverno / total_1_kwh_inverno);

    envidracados_perc_inverno = (envidracados_kwh_inverno / total_1_kwh_inverno);

    cobertura_perc_inverno = (cobertura_kwh_inverno / total_1_kwh_inverno);

    ganhos_perc_inverno = (-(ganhos_kwh_inverno * fator_ganhos) / total_1_kwh_inverno);


    //TOTAL 4

    if (total_3_kwh_inverno < classes[1].valor_direto) {
        total_4_kwh_inverno = classes[0].classe_id;
    } else if (total_3_kwh_inverno < classes[2].valor_direto) {
        total_4_kwh_inverno = classes[1].classe_id;
    } else if (total_3_kwh_inverno < classes[3].valor_direto) {
        total_4_kwh_inverno = classes[2].classe_id;
    } else if (total_3_kwh_inverno < classes[4].valor_direto) {
        total_4_kwh_inverno = classes[3].classe_id;
    } else if (total_3_kwh_inverno < classes[5].valor_direto) {
        total_4_kwh_inverno = classes[4].classe_id;
    } else if (total_3_kwh_inverno < classes[6].valor_direto) {
        total_4_kwh_inverno = classes[5].classe_id;
    } else if (total_3_kwh_inverno < classes[7].valor_direto) {
        total_4_kwh_inverno = classes[6].classe_id;
    } else {
        total_4_kwh_inverno = classes[7].classe_id;
    }
}

function veraoCalc() {
    var classe_energia = $('#classe-en').val();
    var anos_de_construcao = $('#ano').val();
    var tipo_envidracados_calc = $('#tipo-envid').val();
    var idDistrito = $('#distrito').val();
    var area_input = $('#area-dados-input').val();

    paredes_kwh_verao = 0;
    paredes_perc_verao = 0;
    envidracados_kwh_verao = 0;
    envidracados_perc_verao = 0;
    cobertura_kwh_verao = 0;
    cobertura_perc_verao = 0;
    ganhos_kwh_verao = 0;
    ganhos_perc_verao = 0;
    total_1_kwh_verao = 0;
    total_2_kwh_verao = 0;
    total_3_kwh_verao = 0;
    total_4_kwh_verao = 0;

    paredes_kwh_verao = (paredes_area * paredes_u * necessidades_climatizacao_verao);
    

    /*(cena1) ? cond1.1 : ((cena2) ? cond2.1 : cond2.2)

    (cena1) ? ((cena2) ? cond2.1 : cond2.2) : cond1.1*/

    var valor_1 = 0;
    var valor_2 = 0;

    if (classe_energia == 8) {
        if (tipo_envidracados_calc == '') {
            valor_1 = anos_construcao[anos_de_construcao].info[3].valor;
        } else {
            valor_1 = envidracados[tipo_envidracados_calc].Fs
        }
    } else {
        valor_1 = classes[classe_energia].info[2].valor
    }


    if (classe_energia == 8) {
        if (tipo_envidracados_calc == '') {
            valor_2 = anos_construcao[anos_de_construcao].info[2].valor;
        } else {
            valor_2 = envidracados[tipo_envidracados_calc].u;
        }
    } else {
        valor_2 = classes[classe_energia].info[3].valor;
    }


    envidracados_kwh_verao = ((envidracados_area * fracao_envidracada * distrito_info[idDistrito].gdv * coeficient_conversao * 
    valor_1) + 
    (envidracados_area * (1 - fracao_envidracada) * distrito_info[idDistrito].gdv * coeficient_conversao * 
    valor_2));


    // PROGRESSO //
    
    cobertura_kwh_verao = (cobertura_area * cobertura_u * 0.5 * 0.04 * distrito_info[idDistrito].radiacao);
    
    ganhos_kwh_verao = (area_input * ganhos_internos_v * necessidades_climatizacao_verao);
    

    total_1_kwh_verao = (paredes_kwh_verao + envidracados_kwh_verao + cobertura_kwh_verao + (ganhos_kwh_verao * fator_ganhos));
    total_2_kwh_verao = (total_1_kwh_verao / area_input);
    total_3_kwh_verao = total_2_kwh_verao / distrito_info[idDistrito].nv;

       //TOTAL 4
    if (total_3_kwh_verao < classes[1].valor_direto) {
        total_4_kwh_verao = classes[0].classe_id;
    } else if (total_3_kwh_verao < classes[2].valor_direto) {
        total_4_kwh_verao = classes[1].classe_id;
    } else if (total_3_kwh_verao < classes[3].valor_direto) {
        total_4_kwh_verao = classes[2].classe_id;
    } else if (total_3_kwh_verao < classes[4].valor_direto) {
        total_4_kwh_verao = classes[3].classe_id;
    } else if (total_3_kwh_verao < classes[5].valor_direto) {
        total_4_kwh_verao = classes[4].classe_id;
    } else if (total_3_kwh_verao < classes[6].valor_direto) {
        total_4_kwh_verao = classes[5].classe_id;
    } else if (total_3_kwh_verao < classes[7].valor_direto) {
        total_4_kwh_verao = classes[6].classe_id;
    } else {
        total_4_kwh_verao = classes[7].classe_id;
    }



    paredes_perc_verao = (paredes_kwh_verao / total_1_kwh_verao);
    envidracados_perc_verao = (envidracados_kwh_verao / total_1_kwh_verao);
    cobertura_perc_verao = (cobertura_kwh_verao / total_1_kwh_verao);
    ganhos_perc_verao = ((ganhos_kwh_verao * fator_ganhos) / total_1_kwh_verao);

}

function necessidadesAquecimento() {
    var escolha = $('#escolhe').val();
    var perfil_semanal_nec_clima = $('#perfil').val();
    var periodos_enc = $('#periodos').val();
    var idDistrito = $('#distrito').val();


    nec_aq_meses = [];
    total_nec_meses = 0;

    for(var i = 0; i < meses_numero_horas.length; i++) {

        if((i>=0 && i<5) || i==9 || i==10){
                //condicao inverno
            if (escolha == 1) {
                nec_aq_meses[i] = 0;
            } else {
                if (perfil_semanal_nec_clima == 0) {
                    nec_aq_meses[i] = total_1_kwh_inverno * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc * perfil_necessidades[0].valor;
                } else {
                    nec_aq_meses[i] = total_1_kwh_inverno * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc;
                }
            }
        }else if(i==11){
                // condicao dezembro
            if (escolha == 1) {
                nec_aq_meses[i] = 0;
            } else if ((perfil_semanal_nec_clima == 0) && (periodos_enc == 0 || periodos_enc == 1 || periodos_enc == 2)) {
                nec_aq_meses[i] = total_1_kwh_inverno * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc * perfil_necessidades[0].valor * periodos_encerramento[0].valor;
            } else if (periodos_enc != '' && periodos_enc != undefined && periodos_enc == 0 || periodos_enc == 1 || periodos_enc == 2) {
                nec_aq_meses[i] = total_1_kwh_inverno * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc * periodos_encerramento[0].valor;
            } else if (perfil_semanal_nec_clima == 0) {
                //$E$8 * PROCV(Dados!$D$4; Info!$B$161: $N$180; 13)* Info!$E$17
                nec_aq_meses[i] = total_1_kwh_inverno * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc * perfil_necessidades[0].valor;
            } else {
                // $E$8 * PROCV(Dados!$D$4; Info!$B$161: $N$180; 13)
                nec_aq_meses[i] = total_1_kwh_inverno * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc;
            }
        } else {
            nec_aq_meses[i] = 0;
        }
        //exclui meses de verão junho, julho, agosto

        total_nec_meses += nec_aq_meses[i];
    }


}


function consumoInicialAquecimento() {
    var atual_fonte_aq = $('#fonte-aq').val();
    var rend_tec_aq = $('#rendimento').val();
    var idade_tec_aq = $('#idade').val();
    var rend_tec_input = new Number($('#iRendMan').val() / 100);

    var valor_cons_inicial = 0;
    consumo_aq_meses = [];
    total_consumo_meses = 0;

  
    for(var i = 0; i < meses_numero_horas.length; i++) {
        
        if ((i >= 0 && i < 5) || i == 9 || i == 10 || i == 11) {

            if (rend_tec_aq == 0) {
                valor_cons_inicial = new Number(tecnologia_atual_aquecimento[atual_fonte_aq].rendimento[idade_tec_aq].valor);
            } else {
                valor_cons_inicial = rend_tec_input;
            }

            consumo_aq_meses[i] = nec_aq_meses[i] / valor_cons_inicial;

        } else {
            consumo_aq_meses[i] = 0;
        }

        total_consumo_meses += consumo_aq_meses[i];
    }

}

function consumoInicialAqs() {
    //testes?

    consumo_aqs_meses = [];
    total_consumo_aqs_meses = 0;

    for(var i = 0; i < meses_numero_horas.length; i++) {
        //aqs_kwh_array pertence ao Cenario Inicial que ainda nao foi criado, nem a var global!!!
        consumo_aqs_meses[i] = cenario_inicial_aqs_array[i];

        total_consumo_aqs_meses += consumo_aqs_meses[i];
    }
}

function correcaoOrientacao() {
    var orInput = Math.abs($('#orientacao-input').val());
    correcao_orientacao_value = 0;


    if (orInput > 70) {
        correcao_orientacao_value = 0;
    } else if (orInput > desvios[2].valor) {
        correcao_orientacao_value = new Number(1.14 - 0.0085 * orInput);
    } else {
        correcao_orientacao_value = 1;
    }
}

function nColetores() {
    total_n_coletores = 0;
    var valor = new Number((total_racio / area_coletor_solar).toFixed(0));

    

    if (valor == 0) {
        total_n_coletores = new Number((energia_solar_total / area_coletor_solar).toFixed(0));
    } else {
        total_n_coletores = valor;
    }
}

function areaNecessidade() {
    total_area = 0;

    total_area = new Number((total_n_coletores * area_coletor_solar).toFixed(0));
}

function arred(valorArrendondar, comoArredondar) {
    var valor = 0;

    if (comoArredondar == (-1)) {
        valor = Math.round(valorArrendondar / 10) * 10;
    } else if (comoArredondar == (-2)) {
        valor = Math.round(valorArrendondar / 100) * 100;
    } else if (comoArredondar == (-3)) {
        valor = Math.round(valorArrendondar / 1000) * 1000;
    }

    return valor;
}

function volumeAcumulacao() {
    total_vol_acumulacao = 0;


    if (total_area < 8) {
        //testes
        //total_vol_acumulacao = new Number((total_area * volume_acumulacao).toFixed(-1));
        total_vol_acumulacao = arred((total_area * volume_acumulacao), -1);
    } else {
        //total_vol_acumulacao = new Number((total_area * volume_acumulacao).toFixed(-2));
        total_vol_acumulacao = arred((total_area * volume_acumulacao), -2);
    }
}

function necessidadesEnergeticas() {
    var conhece_aqs = $('#cons-aqs').val();
//    var medidas_tipo = $("select[name='tipo-consumo[]']");
//    var medidas_valores = $("input[name='tipoconsumoval[]']");
    var perfil_sem = $('#perfil-semanal').val();
    var perfil_men = $('#perfil-mensal').val();
    var perfil_sem_valor = 0;
    var idDistrito = $('#distrito').val();
    var rend_user = $('#iRendMan').val() / 100;
    var rendimento_nec = $('#rendimento').val();
    var aqs_cons = $('#aqs-consumo').val();
    var aqs_total_input = $("input[name='aqsConsumoAnualTotal']").val();
    var atual_fonte_tec = $('#fonte-aq').val();
    var age_rend = $('#idade').val();
    var aqs_meses_input = $("input[name='aqsConsumosMeses[]']");

    total_media_verao_necen = 0;
    necessidades_array = [];
    necessidades_total = 0;

    

    //PERFIS CALC TO FORMULE BELLOW
    if (perfil_sem == 0) {
        perfil_sem_valor = 0.30;
    } else if (perfil_sem == 1) {
        perfil_sem_valor = 0.75;
    } else if (perfil_sem == 3) {
        var soma = 0;
        for (k = 1; k < 8; k++) {
            soma += new Number($('#semanal-input-' + k).val());
        }
        perfil_sem_valor = (soma / 7) / 100;
    } else {
        perfil_sem_valor = 1;
    }

    for (var i = 0; i < meses_numero_horas.length; i++) {
        if (i >= 4 && i < 9) {
            if (conhece_aqs == 1) {
                var total_medidas = 0;

                for (var j = 1; j <= aqsRowId; j++) {
                    total_medidas += $("#tipoconsumoval"+j).val() * (consumo_diario_agua[$("#tipo-consumo"+j).val()].valor != '' && consumo_diario_agua[$("#tipo-consumo"+j).val()].valor != undefined && consumo_diario_agua[$("#tipo-consumo"+j).val()].valor > 0 ? consumo_diario_agua[$("#tipo-consumo"+j).val()].valor : 0);
                }
                necessidades_array[i] = total_medidas * perfil_mensal[perfil_men].tabela[i].valor * perfil_sem_valor * meses_numero_horas[i].n_dias * fatores_conversao[0] * (temperatura_utilizacao - irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua);
            } else if (conhece_aqs == 0) {
                if (aqs_cons == 0) {
                    necessidades_array[i] = aqs_total_input * meses_numero_horas[i].aqs_mensal * fatores_conversao[1] * tecnologia_atual_aquecimento[atual_fonte_tec].fator_conversao * (rendimento_nec == 1 ? tecnologia_atual_aquecimento[atual_fonte_tec].rendimento[age_rend].valor : rend_user);
                } else if (aqs_cons == 1) {
                    necessidades_array[i] = aqs_meses_input[i].value * fatores_conversao[1] * tecnologia_atual_aquecimento[atual_fonte_tec].fator_conversao * (rendimento_nec == 1 ? tecnologia_atual_aquecimento[atual_fonte_tec].rendimento[age_rend].valor : rend_user);
                }
            }

            necessidades_total += necessidades_array[i];

            total_media_verao_necen += necessidades_array[i] / 5;

        } else {
            if (conhece_aqs == 1) {
                var total_medidas = 0;

                for (var j = 1; j <= aqsRowId; j++) {
                    total_medidas += $("#tipoconsumoval"+j).val() * (consumo_diario_agua[$("#tipo-consumo"+j).val()].valor != '' && consumo_diario_agua[$("#tipo-consumo"+j).val()].valor != undefined && consumo_diario_agua[$("#tipo-consumo"+j).val()].valor > 0 ? consumo_diario_agua[$("#tipo-consumo"+j).val()].valor : 0);
                }
                necessidades_array[i] = total_medidas * perfil_mensal[perfil_men].tabela[i].valor * perfil_sem_valor * meses_numero_horas[i].n_dias * fatores_conversao[0] * (temperatura_utilizacao - irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua);
            } else if (conhece_aqs == 0) {
                if (aqs_cons == 0) {
                    necessidades_array[i] = aqs_total_input * meses_numero_horas[i].aqs_mensal * fatores_conversao[1] * tecnologia_atual_aquecimento[atual_fonte_tec].fator_conversao * (rendimento_nec == 1 ? tecnologia_atual_aquecimento[atual_fonte_tec].rendimento[age_rend].valor : rend_user);
                } else if (aqs_cons == 1) {
                    necessidades_array[i] = aqs_meses_input[i].value * fatores_conversao[1] * tecnologia_atual_aquecimento[atual_fonte_tec].fator_conversao * (rendimento_nec == 1 ? tecnologia_atual_aquecimento[atual_fonte_tec].rendimento[age_rend].valor : rend_user);
                }
            }

            necessidades_total += necessidades_array[i];
        }
    }
}

function racio() {
    total_racio = 0;

    total_racio = new Number((total_media_verao_necen / total_media_verao_solar).toFixed(2));
}

function energiaSolarCaptadaM2() {
    var idDistrito = $('#distrito').val();

    total_media_verao_solar = 0;
    energia_solar_array = [];
    energia_solar_total = 0;


    for(var i = 0; i < meses_numero_horas.length; i++) {
        if (i >= 4 && i < 9) {
            energia_solar_array[i] = (((rendimento_otico * perdas[1].valor) - (coeficient_perdas * ((temperatura_utilizacao - (irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAmb + irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua)) / (correcao_inclinacao[irradiacao_temp_amb_temp_agua[idDistrito].go_latitude].meses[i].valor * ((correcao_orientacao_value * perdas[2].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr) * (fatores_conversao[1] * 1000 / meses_numero_horas[i].n_horas_sol))))) * (correcao_inclinacao[irradiacao_temp_amb_temp_agua[idDistrito].go_latitude].meses[i].valor * ((correcao_orientacao_value * perdas[1].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr))) * (1 - perdas[0].valor) * meses_numero_horas[i].n_dias;

            energia_solar_total += energia_solar_array[i];

            total_media_verao_solar += energia_solar_array[i] / 5;
        } else {
            energia_solar_array[i] = (((rendimento_otico * perdas[1].valor) - (coeficient_perdas * ((temperatura_utilizacao - (irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAmb + irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua)) / (correcao_inclinacao[irradiacao_temp_amb_temp_agua[idDistrito].go_latitude].meses[i].valor * ((correcao_orientacao_value * perdas[2].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr) * (fatores_conversao[1] * 1000 / meses_numero_horas[i].n_horas_sol))))) * (correcao_inclinacao[irradiacao_temp_amb_temp_agua[idDistrito].go_latitude].meses[i].valor * ((correcao_orientacao_value * perdas[1].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr))) * (1 - perdas[0].valor) * meses_numero_horas[i].n_dias;

            energia_solar_total += energia_solar_array[i];
        }
       
    }
}

function energiaSolarCaptadaMJ() {
    energia_solar_mj_array = [];
    energia_solar_mj_total = 0;

    //D3 * $D$18 * Info!$C$191

    for(var i = 0; i < meses_numero_horas.length; i++) {
        energia_solar_mj_array[i] = energia_solar_array[i] * total_n_coletores * area_coletor_solar;

        energia_solar_mj_total += energia_solar_mj_array[i];
    }
    
}

function energiaSolarUtilizada() {
    energia_solar_utilizada_array = [];
    energia_solar_utilizada_total = 0;

    //SE(E3 > C3; C3; E3)

    for(var i = 0; i < meses_numero_horas.length; i++) {
        energia_solar_utilizada_array[i] = (energia_solar_mj_array[i] > necessidades_array[i]) ? necessidades_array[i] : energia_solar_mj_array[i];

        energia_solar_utilizada_total += energia_solar_utilizada_array[i];
    }
}

function energiaSolarUtilizadaPerc() {
    energia_solar_utilizada_perc_array = [];
    energia_solar_utilizada_perc_total = 0;

    //F3 / C3

    for(var i = 0; i < meses_numero_horas.length; i++) {
        energia_solar_utilizada_perc_array[i] = energia_solar_utilizada_array[i] / necessidades_array[i];

        energia_solar_utilizada_perc_total = energia_solar_utilizada_total / necessidades_total;
    }
}

function energiaSA() {
    energia_solar_sa_array = [];
    energia_solar_sa_total = 0;
    var rend_user = $('#rend-med').val() / 100;

    /*SE((C3 - E3) < 0; 0; 
    (C3 - E3))*/

    for(var i = 0; i < meses_numero_horas.length; i++) {
        if ((necessidades_array[i] - energia_solar_mj_array[i]) < 0) {
            energia_solar_sa_array[i] = 0;
        } else {
            energia_solar_sa_array[i] = (necessidades_array[i] - energia_solar_mj_array[i]) / rend_user;
        }

        energia_solar_sa_total += energia_solar_sa_array[i];
    }
    
}

function energiaSAPerc() {
    energia_solar_sa_perc_array = [];
    energia_solar_sa_perc_total = 0;

    //H3/C3

    for(var i = 0; i < meses_numero_horas.length; i++) {
        energia_solar_sa_perc_array[i] = energia_solar_sa_array[i] / necessidades_array[i];        
        
        energia_solar_sa_perc_total = energia_solar_sa_total / necessidades_total;
    }
}

function excedenteSolar() {
    excedente_solar_array = [];
    excedente_solar_total = 0;
    
    //E3 - F3

    for(var i = 0; i < meses_numero_horas.length; i++) {
        excedente_solar_array[i] = energia_solar_mj_array[i] - energia_solar_utilizada_array[i];

        excedente_solar_total += excedente_solar_array[i];
    }
}

function excedenteSolarPerc() {
    excedente_solar_perc_array = [];
    excedente_solar_perc_total = 0;

    //J3 / E3

    for(var i = 0; i < meses_numero_horas.length; i++) {
        excedente_solar_perc_array[i] = excedente_solar_array[i] / energia_solar_mj_array[i];        
    
        excedente_solar_perc_total = excedente_solar_total / energia_solar_mj_total;
    }
}

function cenarioInicialConsumosAquecimento() {
    var conhece_aqs = $('#cons-aqs').val();
    var conhece_cons = $('#consumo-quest').val();
    var consumo_option = $('#aquecimento-consumo').val();
    var meses_input = $("input[name='aquecimentoConsumosMeses[]']");
    var anual_input = $("input[name='aquecimentoConsumoAnualTotal']").val();
    var fonte = $('#fonte-aq').val();
    var idDistrito = $('#distrito').val();
    var aqs_mes = $("input[name='aqsConsumosMeses[]']");

    cenario_inicial_aquecimento_array = [];
    cenario_inicial_aquecimento_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {

        if ((i >= 0 && i < 5) || i == 9 || i == 10 || i == 11) {
            //E(OU(Tecnologia!$C$10(conhece_consumo)=Info!$C$7(nao);Tecnologia!$C$10="");Dados!$D$15(conhece_consumos_cli)=Info!$C$6(sim);Consumos!$C$3(aq_consumo_disponiveis)=Info!$C$44(mensal))
            if ((conhece_aqs == 1 || conhece_aqs == '') && conhece_cons != "" && conhece_cons == 0 && consumo_option == 1) {
                //Consumos!C6 * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7);

                cenario_inicial_aquecimento_array[i] = meses_input[i].value * tecnologia_atual_aquecimento[fonte].fator_conversao;

                //E(OU(Tecnologia!$C$10(conhece_consumo)=Info!$C$7(nao);Tecnologia!$C$10="");Dados!$D$15(conhece_consumos_cli)=Info!$C$6(sim);Consumos!$C$3(aq_consumo_disponiveis)=Info!$C$43(anual))
            } else if ((conhece_aqs == 1 || conhece_aqs == '') && conhece_cons != "" && conhece_cons == 0 && consumo_option != "" && consumo_option == 0) {
                //Consumos!$C$5 * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7)* PROCV(Dados!$D$4; Info!$B$161: $N$180; 2);

                cenario_inicial_aquecimento_array[i] = anual_input * tecnologia_atual_aquecimento[fonte].fator_conversao * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc;

                //E(Tecnologia!$C$10=Info!$C$6(sim);Dados!$D$15(conhece_consumos_cli)=Info!$C$6(sim);Consumos!$C$3(aq_consumo_disponiveis)=Info!$C$43(anual);(Consumos!$C$5(consumoanual)*PROCV(Tecnologia!$C$2;Info!$B$28:$H$34;7)(tec_actual.factConversao)*PROCV(Dados!$D$4;Info!$B$161:$N$180;2)(valor_perc[distrito].valor)) - aqs_mes[i] < 0)
            } else if (conhece_aqs == 0 && conhece_aqs != "" && conhece_cons != "" && conhece_cons == 0  && consumo_option != "" && consumo_option == 0 && (anual_input * tecnologia_atual_aquecimento[fonte].fator_conversao * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc) - aqs_mes[i].value < 0) {
                cenario_inicial_aquecimento_array[i] = 0;

                //E(Tecnologia!$C$10=Info!$C$6(sim);Dados!$D$15(conhece_consumos_cli)=Info!$C$6(sim);Consumos!$C$3(aq_consumo_disponiveis)=Info!$C$43(anual));
            } else if (conhece_aqs == 0 && conhece_aqs != "" && conhece_cons != "" && conhece_cons == 0  && consumo_option != "" && consumo_option == 0) {
                //(Consumos!$C$5 * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7)* PROCV(Dados!$D$4; Info!$B$161: $N$180; 2)) - E4

                cenario_inicial_aquecimento_array[i] = anual_input * tecnologia_atual_aquecimento[fonte].fator_conversao * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc - aqs_mes[i].value;

                //E(Tecnologia!$C$10=Info!$C$6;Dados!$D$15=Info!$C$6;Consumos!$C$3=Info!$C$44(mensal);(Consumos!C6(consumomes[i])*PROCV(Tecnologia!$C$2;Info!$B$28:$H$34;7)(tec_actual.factConversao))-aqs_mes[i]<0)
            } else if (conhece_aqs == 0 && conhece_aqs != "" && conhece_cons != "" && conhece_cons == 0 && consumo_option == 1 && (meses_input[i].value * tecnologia_atual_aquecimento[fonte].fator_conversao) - aqs_mes[i].value < 0) {
                cenario_inicial_aquecimento_array[i] = 0;

                //E(Tecnologia!$C$10=Info!$C$6;Dados!$D$15=Info!$C$6;Consumos!$C$3=Info!$C$44)
            } else if (conhece_aqs == 0 && conhece_aqs != "" && conhece_cons != "" && conhece_cons == 0 && consumo_option == 1) {
                //(Consumos!C6 * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7)) -E4

                cenario_inicial_aquecimento_array[i] = meses_input[i].value * tecnologia_atual_aquecimento[fonte].fator_conversao;

            } else {
                //Cálculos!F14

                cenario_inicial_aquecimento_array[i] = consumo_aq_meses[i];

            }
        } else {
            //SE(E(Dados!$D$15 = Info!$C$6; Consumos!$C$3 = Info!$C$44);  
            if (conhece_cons == 0 && conhece_cons != ""  && consumo_option == 1) {
                //Consumos!C11 * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7);

                cenario_inicial_aquecimento_array[i] = meses_input[i].value * tecnologia_atual_aquecimento[fonte].fator_conversao;

                //SE(E(Dados!$D$15 = Info!$C$6; Consumos!$C$3 = Info!$C$43); 
            } else if (conhece_cons == 0 && conhece_cons != "" && consumo_option != "" && consumo_option == 0) {
                cenario_inicial_aquecimento_array[i] = 0;
            } else  {
                //Cálculos!F19))
                cenario_inicial_aquecimento_array[i] = consumo_aq_meses[i];
            }

        }

        cenario_inicial_aquecimento_total += cenario_inicial_aquecimento_array[i];

    }

}

//function cenarioInicialConsumosArrefecimento() {
//    var conhece_cons = $('#consumo-quest').val();
//    var consumo_option_arr = $('#arrefecimento-consumo').val();
//    var arr_anual = $("input[name='arrefecimentoConsumoAnualTotal']").val();
//    var arr_mes = $("input[name='arrefecimentoConsumosMeses[]']");
//    var soma_total_arr = $("input[name='total_consumo_somatorio_arrefecimento']").val();
//    var idDistrito = $('#distrito').val();
//
//    cenario_inicial_arr_array = [];
//    cenario_inicial_arr_total = 0;
//
//    for (var i = 0; i < meses_numero_horas.lenght; i++) {
//        if (i < 5 && i >= 9) {
//            if (conhece_cons == 0  && conhece_cons != "" && consumo_option_arr!="" && consumo_option_arr == 0) {
//                cenario_inicial_arr_array[i] = soma_total_arr;
//
//            } else if (conhece_cons == 0 && consumo_option_arr == 0) {
//                cenario_inicial_arr_array[i] = 0;
//            } else {
//                cenario_inicial_arr_array[i] = consumo_arr_meses[i]; //VARIAVEL NAO CRIADA AINDA CALCULOS G14
//            }
//        } else {
//            if (conhece_cons == 0 && consumo_option_arr == 0) {
//                cenario_inicial_arr_array[i] = arr_mes[i].value;
//            } else if (conhece_cons == 0 && consumo_option_arr == 0) {
//                cenario_inicial_arr_array[i] = arr_anual * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorPerc;
//            } else {
//                cenario_inicial_arr_array[i] = consumo_arr_meses[i];
//            }
//        }
//        cenario_inicial_arr_total += cenario_inicial_arr_array[i];
//    }
//}

function cenarioInicialConsumosAqs() {
    var conhece_aqs = $('#cons-aqs').val();
    var conhece_cons = $('#consumo-quest').val();
    var consumo_option_aq = $('#aquecimento-consumo').val();
    var consumo_option_aqs = $('#aqs-consumo').val();
    var aqs_mes = $("input[name='aqsConsumosMeses[]']");
    var aqs_anual = $("input[name='aqsConsumoAnualTotal']").val();
    var fonte = $('#fonte-aq').val();
    var idDistrito = $('#distrito').val();
    var rend = $('#rendimento').val();
    var age = $('#idade').val();
    var rend_user = new Number($('#iRendMan').val() / 100);

    cenario_inicial_aqs_array = [];
    cenario_inicial_aqs_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        if (conhece_aqs == 1) {
            //Cálculos_Solar!C3(necessidadeMes[i]) * Info!$C$227(factoresconversao[1]) / (Tecnologia!$C$4(rendimento) == nao conhece ? tecnologia_atual_aquecimento[tec_Act].rendimento[age].valor : rendimento_input);

            cenario_inicial_aqs_array[i] = necessidades_array[i] * fatores_conversao[1] / (rend == 0 ? tecnologia_atual_aquecimento[fonte].rendimento[age].valor : rend_user);

        } else if (consumo_option_aqs == 1) {
            //Consumos!E6(aqs_mes[i]) * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7) (tecnologia_atual_aquecimento[tec_Act].factor);

            cenario_inicial_aqs_array[i] = aqs_mes[i].value * tecnologia_atual_aquecimento[fonte].fator_conversao

        } else if (consumo_option_aqs!="" && consumo_option_aqs == 0) {
            //Consumos!$E$5(consunmoAnual) * Info!E255(meses_dias[i].mensal) * PROCV(Tecnologia!$C$2; Info!$B$28: $H$34; 7) (tecnologia_atual_aquecimento[tec_Act].factor)

            cenario_inicial_aqs_array[i] = aqs_anual * meses_numero_horas[i].aqs_mensal * tecnologia_atual_aquecimento[fonte].fator_conversao;
        } else {
            cenario_inicial_aqs_array[i] = 0;
        }

        cenario_inicial_aqs_total += cenario_inicial_aqs_array[i];
    }
}

function cenarioInicialConsumosTotais() {
    cenario_inicial_consumos_total_global = 0;
    cenario_inicial_consumos_aq_perc = 0;
    cenario_inicial_consumos_arr_perc = 0;
    cenario_inicial_consumos_aqs_perc = 0;

    cenario_inicial_consumos_total_global = cenario_inicial_aquecimento_total + cenario_inicial_arr_total + cenario_inicial_aqs_total;

    cenario_inicial_consumos_aq_perc = cenario_inicial_aquecimento_total / cenario_inicial_consumos_total_global;
    cenario_inicial_consumos_arr_perc = cenario_inicial_arr_total / cenario_inicial_consumos_total_global;
    cenario_inicial_consumos_aqs_perc = cenario_inicial_aqs_total / cenario_inicial_consumos_total_global;

}

function cenarioInicialCustosAquecimento() {
    var custo_unit = custo_en_unit_aq;   
    var fonte = $('#fonte-aq').val();

    cenario_inicial_custos_aq_array = [];
    cenario_inicial_custos_aq_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        cenario_inicial_custos_aq_array[i] = cenario_inicial_aquecimento_array[i] * custo_unit / tecnologia_atual_aquecimento[fonte].fator_conversao;

        cenario_inicial_custos_aq_total += cenario_inicial_custos_aq_array[i];
    }
}

//function cenarioInicialCustosArrefecimento() {
//    var custo_unit = $('#custo-en-unit-ar').val();
//
//    cenario_inicial_custos_arr_array = [];
//    cenario_inicial_custos_arr_total = 0;
//
//    for (var i = 0; i < meses_numero_horas.length; i++) {
//        cenario_inicial_custos_arr_array[i] = cenario_inicial_arr_array[i] * custo_unit;
//
//        cenario_inicial_custos_arr_total += cenario_inicial_custos_arr_array[i];
//    }
//}

function cenarioInicialCustosAqs() {
    var custo_unit = custo_en_unit_aq;   
    var fonte = $('#fonte-aq').val();

    cenario_inicial_custos_aqs_array = [];
    cenario_inicial_custos_aqs_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        cenario_inicial_custos_aqs_array[i] = cenario_inicial_aqs_array[i] * custo_unit / tecnologia_atual_aquecimento[fonte].fator_conversao;

        cenario_inicial_custos_aqs_total += cenario_inicial_custos_aqs_array[i];
    }
}

function cenarioInicialCustosTotais() {
    cenario_inicial_custos_total_global = 0;
    cenario_inicial_custos_aq_perc = 0;
    cenario_inicial_custos_arr_perc = 0;
    cenario_inicial_custos_aqs_perc = 0;

    cenario_inicial_custos_total_global = cenario_inicial_custos_aq_total + cenario_inicial_custos_arr_total + cenario_inicial_custos_aqs_total;

    cenario_inicial_custos_aq_perc = cenario_inicial_custos_aq_total / cenario_inicial_consumos_total_global;
    cenario_inicial_custos_arr_perc = cenario_inicial_custos_arr_total / cenario_inicial_consumos_total_global;
    cenario_inicial_custos_aqs_perc = cenario_inicial_custos_aqs_total / cenario_inicial_consumos_total_global;

}

function cenarioFinalConsumosAquecimento() {
    var new_fonte_aq = $('#new-fonte-aq').val();
    var age = $('#idade').val();
    var rendimento = $("#rendimento").val();
    var rend_user = new Number($('#iRendMan').val() / 100);
    var rend_med = new Number($("#rend-med").val() / 100);
    var fonte_aq = $('#fonte-aq').val();

    cenario_final_aquecimento_array = [];
    cenario_final_aquecimento_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        if (new_fonte_aq == 5) {
            cenario_final_aquecimento_array[i] = cenario_inicial_aquecimento_array[i];
        } else {
            var tmp = (rendimento != '' && rendimento != undefined && rendimento == 0) ? tecnologia_atual_aquecimento[fonte_aq].rendimento[age].valor : rend_user;

            cenario_final_aquecimento_array[i] = new Number(cenario_inicial_aquecimento_array[i] * tmp / ((rend_med != '' && rend_med != undefined) ? tecnologia_futura_aquecimento[new_fonte_aq].rendimento : rend_med));
        }

        cenario_final_aquecimento_total += cenario_final_aquecimento_array[i];
        
    }
}

function cenarioFinalConsumosAqs() {
    var simular_aqs = $('#simulacao-aqs').val();
    var option_aqs = $('#aqs-consumo').val();
    var aqs_mes = $("input[name='aqsConsumosMeses[]']");
    var aqs_anual = $("input[name='aqsConsumoAnualTotal']").val();
    var fonte_aq = $('#fonte-aq').val();
    var new_rend = new Number($('#rend-med').val() / 100);
    var age = $('#idade').val();
    var new_fonte_aq = $('#new-fonte-aq').val();
    var querIncluirAQS = $("#pres-aqs").val();
    //var rend_user = $('#iRendManMed').val();

    cenario_final_aqs_array = [];
    cenario_final_aqs_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {

        if (simular_aqs == 1 && option_aqs == 1) {
            var tmp = ($("#rendimento").val() != '' && $("#rendimento").val() != undefined && $("#rendimento").val() == 0) ? tecnologia_atual_aquecimento[new_fonte_aq].rendimento[age].valor : $("#rendimento").val();

            cenario_final_aqs_array[i] = aqs_mes[i].value * tecnologia_atual_aquecimento[fonte_aq].fator_conversao * tmp / new_rend;

        } else if (simular_aqs == 1 && option_aqs!="" && option_aqs == 0) {
            var tmp = ($("#rendimento").val() != '' && $("#rendimento").val() != undefined && $("#rendimento").val() == 0) ? tecnologia_atual_aquecimento[new_fonte_aq].rendimento[age].valor : $("#rendimento").val();

            cenario_final_aqs_array[i] = aqs_anual * meses_numero_horas[i].aqs_mensal * tecnologia_atual_aquecimento[fonte_aq].fator_conversao * tmp / (new_rend == 0 ? tecnologia_futura_aquecimento[new_fonte_aq].rendimento : new_rend);

        } else if ((simular_aqs == 0 && simular_aqs!="") || (simular_aqs == 1 && querIncluirAQS!="" && querIncluirAQS==0)) {
            cenario_final_aqs_array[i] = energia_solar_sa_array[i] * fatores_conversao[1];
        }else{
            cenario_final_aqs_array[i] = 0;
        }
//        else {
//            var tmp = ($("#rendimento").val() != '' && $("#rendimento").val() != undefined && $("#rendimento").val() == 0) ? tecnologia_atual_aquecimento[fonte_aq].rendimento[age].valor : $("#iRendMan").val();
//
//            cenario_final_aqs_array[i] = aqs_mes[i].value * tmp / new_rend;
//
//        }

        cenario_final_aqs_total += cenario_final_aqs_array[i];
    }
}

function cenarioFinalConsumosTotais() {
    var cenario_final_consumos_total_global = 0;
    var cenario_final_consumos_aq_perc = 0;
    var cenario_final_consumos_arr_perc = 0;
    var cenario_final_consumos_aqs_perc = 0;
    
    cenario_final_consumos_total_global = cenario_final_aquecimento_total + 0 + cenario_final_aqs_total;

    cenario_final_consumos_aq_perc = cenario_final_aquecimento_total / cenario_final_consumos_total_global;

    //cenario_final_consumos_arr_perc = cenario_final_arrefecimento_total / cenario_final_consumos_total_global;

    cenario_final_consumos_aqs_perc = cenario_final_aqs_total / cenario_final_consumos_total_global;
}

function cenarioFinalCustosAquecimento() {
    var custo_unit_med = new Number(custo_unit_med_aq);

    cenario_final_custos_aquecimento_array = [];
    cenario_final_custos_aquecimento_total = 0;

    for(var i = 0; i < meses_numero_horas.length; i++) {
        cenario_final_custos_aquecimento_array[i] = cenario_final_aquecimento_array[i] * custo_unit_med / tecnologia_futura_aquecimento[$("#new-fonte-aq").val()].fator_conversao;

        cenario_final_custos_aquecimento_total += cenario_final_custos_aquecimento_array[i];
    }
}

/*function cenarioFinalCustosArrefecimento() {
    var custo_unit_med = $('#custo-unit-med-ar').val();

    cenario_final_custos_arrefecimento_array = [];
    cenario_final_custos_arrefecimento_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        cenario_final_custos_arrefecimento_array[i] = cenario_final_arr_array[i] * custo_unit_med;

        cenario_final_custos_arrefecimento_total = cenario_final_custos_arrefecimento_array[i];
    }
}*/

function cenarioFinalCustosAqs() {
    var custo_unit_med = new Number(custo_unit_med_aq);

    cenario_final_custos_aqs_array = [];
    cenario_final_custos_aqs_total = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        cenario_final_custos_aqs_array[i] = cenario_final_aqs_array[i] * custo_unit_med / tecnologia_futura_aquecimento[$("#new-fonte-aq").val()].fator_conversao;

        cenario_final_custos_aqs_total += cenario_final_custos_aqs_array[i];
    }
}

function cenarioFinalCustosTotais() {
    cenario_final_custos_total_global = cenario_final_custos_aquecimento_total + cenario_final_custos_arrefecimento_total + cenario_final_custos_aqs_total;

    cenario_final_custos_aq_perc = cenario_final_custos_aquecimento_total / cenario_final_custos_total_global;

    cenario_final_custos_arr_perc = cenario_final_custos_arrefecimento_total / cenario_final_custos_total_global;

    cenario_final_custos_aqs_perc = cenario_final_custos_aqs_total / cenario_final_custos_total_global;
}

function cenarioFinalReducaoAquecimento() {
    cenario_final_reducao_aquecimento_array = [];
    cenario_final_reducao_aquecimento_total = 0;
    cenario_final_reducao_aquecimento_array_perc = [];
    cenario_final_reducao_aquecimento_total_perc = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        cenario_final_reducao_aquecimento_array[i] = cenario_inicial_aquecimento_array[i] - cenario_final_aquecimento_array[i];

        cenario_final_reducao_aquecimento_total += cenario_final_reducao_aquecimento_array[i];

        cenario_final_reducao_aquecimento_array_perc[i] = cenario_inicial_custos_aq_array[i] - cenario_final_custos_aquecimento_array[i];

        cenario_final_reducao_aquecimento_total_perc += cenario_final_reducao_aquecimento_array_perc[i];

    }
}

function cenarioFinalReducaoAqs() {
    cenario_final_reducao_aqs_array = [];
    cenario_final_reducao_aqs_total = 0;
    cenario_final_reducao_aqs_array_perc = [];
    cenario_final_reducao_aqs_total_perc = 0;

    for (var i = 0; i < meses_numero_horas.length; i++) {
        cenario_final_reducao_aqs_array[i] = cenario_inicial_aqs_array[i] - cenario_final_aqs_array[i];

        cenario_final_reducao_aqs_total += cenario_final_reducao_aqs_array[i];

        cenario_final_reducao_aqs_array_perc[i] = cenario_inicial_custos_aqs_array[i] - cenario_final_custos_aqs_array[i];

        cenario_final_reducao_aqs_total_perc += cenario_final_reducao_aqs_array_perc[i];
    }
}

function cenarioFinalReducaoTotais() {
    var simula_aqs = $('#simulacao-aqs').val();

    cenario_final_reducao_total_global = 0;
    cenario_final_reducao_aq_perc = 0;
    cenario_final_reducao_arr_perc = 0;
    cenario_final_reducao_aqs_perc = 0;
 
    if(simula_aqs == 0) {
        cenario_final_reducao_total_global = (cenario_final_reducao_aquecimento_total_perc + 0 + cenario_final_reducao_aqs_total_perc) / cenario_inicial_custos_total_global; // 0 - arrefecimento
    } else {
        cenario_final_reducao_total_global = (cenario_final_reducao_aquecimento_total_perc + 0) / cenario_inicial_custos_total_global; // 0 - arrefecimento
    }

    cenario_final_reducao_aq_perc = cenario_final_reducao_aquecimento_total_perc / cenario_inicial_custos_aq_total;

    cenario_final_reducao_arr_perc = 0; // por agora

    cenario_final_reducao_aqs_perc = cenario_final_reducao_aqs_total_perc / cenario_inicial_custos_aqs_total;
}

function resumoAquecimento() {
    var tec_atual = $('#fonte-aq').val();
    var rend_tec = $('#rendimento').val();
    var rend_user = $('#iRendMan').val() / 100;
    var age_tec = $('#idade').val();
    var new_fonte = $('#new-fonte-aq').val();
    var pot_tec = $('#potencia-aq').val();
    var pot_med = $('#pot-med-aq').val();
    var rend_med = $('#rend-med').val() / 100;
    var use_arref = $('#use-arr').val();
    var area_clima = $('#area-dados-input').val();

    resumo_equipamento_inicial = '';
    resumo_equipamento_final = '';
    resumo_potencia_inicial = 0;
    resumo_potencia_final = 0;
    resumo_rendimento_inicial = 0;
    resumo_rendimento_final = 0;
    resumo_fonte_energia_inicial = 0;
    resumo_fonte_energia_final = 0;
    resumo_consumo_anual_inicial = 0;
    resumo_consumo_anual_final = 0;
    resumo_custo_anual_inicial = 0;
    resumo_custo_anual_final = 0;
    resumo_reducao_consumo = 0;
    resumo_reducao_custos_valor = 0;
    resumo_reducao_custos_perc = 0;
    resumo_custo_unit_inicial = 0;
    resumo_custo_unit_final = 0;
    resumo_investimento_estimado = 0;
    resumo_pri_simples = 0;

    resumo_equipamento_inicial = tecnologia_atual_aquecimento[tec_atual].nome;

    resumo_equipamento_final = (new_fonte == 5 ? tecnologia_futura_aquecimento[5].nome : tecnologia_futura_aquecimento[new_fonte].nome);

    var equipamento_inicial_id = tecnologia_futura_aquecimento[tec_atual].id;

    var equipamento_final_id = tecnologia_futura_aquecimento[new_fonte].id;

    resumo_potencia_inicial = pot_tec;
    resumo_potencia_final = pot_med;

    if (rend_tec != '' && rend_tec == 0) {
        resumo_rendimento_inicial = tecnologia_atual_aquecimento[tec_atual].rendimento[age_tec].valor * 100;
    } else {
        resumo_rendimento_inicial = (rend_user * 100).toFixed(0);
    }

    resumo_rendimento_final = (rend_med * 100).toFixed(0);

    resumo_fonte_energia_inicial = tecnologia_atual_aquecimento[equipamento_inicial_id].fonte_energia;


    if (new_fonte == 5) {
        resumo_fonte_energia_final = resumo_fonte_energia_inicial;
    } else {
        resumo_fonte_energia_final = tecnologia_futura_aquecimento[equipamento_final_id].fonte_energia;
    }

    resumo_consumo_anual_inicial = new Number((cenario_inicial_aquecimento_total).toFixed(0));
    resumo_consumo_anual_final = new Number((cenario_final_aquecimento_total).toFixed(0));

    resumo_custo_anual_inicial = new Number((cenario_inicial_custos_aq_total).toFixed(0));
    resumo_custo_anual_final = new Number((cenario_final_custos_aquecimento_total).toFixed(0));

    resumo_reducao_consumo = new Number((resumo_consumo_anual_inicial - resumo_consumo_anual_final).toFixed(0));

    resumo_reducao_custos_valor = new Number((resumo_custo_anual_inicial - resumo_custo_anual_final).toFixed(0));
    resumo_reducao_custos_perc = new Number(((resumo_reducao_custos_valor / resumo_custo_anual_inicial) * 100).toFixed(0));

    resumo_custo_unit_inicial = new Number((resumo_custo_anual_inicial / resumo_consumo_anual_inicial).toFixed(2));
    resumo_custo_unit_final = new Number((resumo_custo_anual_final / resumo_consumo_anual_final).toFixed(2));


    if ((new_fonte == 3 || new_fonte == 5) && use_arref == 0) {
        resumo_investimento_estimado = new Number((area_clima * tecnologia_futura_aquecimento[new_fonte].potencia * tecnologia_futura_aquecimento[new_fonte].investimento / 2).toFixed(0));
    } else {
        resumo_investimento_estimado = new Number((area_clima * tecnologia_futura_aquecimento[new_fonte].potencia * tecnologia_futura_aquecimento[new_fonte].investimento).toFixed(0));
    }

    resumo_pri_simples = new Number((resumo_investimento_estimado / resumo_reducao_custos_valor).toFixed(1));
}

function resumoAqs() {
    var simular_aqs = $('#simulacao-aqs').val();

    resumo_consumo_anual_inicial_aqs = 0;
    resumo_consumo_anual_final_aqs = 0;
    resumo_custo_anual_inicial_aqs = 0;
    resumo_custo_anual_final_aqs = 0;
    resumo_reducao_consumo_aqs = 0;
    resumo_reducao_custos_valor_aqs = 0;
    resumo_reducao_custos_perc_aqs = 0;
    resumo_custo_unit_inicial_aqs = 0;
    resumo_custo_unit_final_aqs = 0;
    resumo_investimento_estimado_aqs = 0;
    resumo_pri_simples_aqs = 0;

    resumo_consumo_anual_inicial_aqs = new Number((cenario_inicial_aqs_total).toFixed(0));
    resumo_consumo_anual_final_aqs = new Number((cenario_final_aqs_total).toFixed(0));

    resumo_custo_anual_inicial_aqs = new Number((cenario_inicial_custos_aqs_total).toFixed(0));
    resumo_custo_anual_final_aqs = new Number((cenario_final_custos_aqs_total).toFixed(0));

    resumo_reducao_consumo_aqs = new Number((resumo_consumo_anual_inicial_aqs - resumo_consumo_anual_final_aqs).toFixed(0));

    resumo_reducao_custos_valor_aqs = new Number((resumo_custo_anual_inicial_aqs - resumo_custo_anual_final_aqs).toFixed(0));
    resumo_reducao_custos_perc_aqs = new Number(((resumo_reducao_custos_valor_aqs / resumo_custo_anual_inicial_aqs) * 100).toFixed(0));

    resumo_custo_unit_inicial_aqs = new Number((resumo_custo_anual_inicial_aqs / resumo_consumo_anual_inicial_aqs).toFixed(2));
    resumo_custo_unit_final_aqs = new Number((resumo_custo_anual_final_aqs / resumo_consumo_anual_final_aqs).toFixed(2));

    if (simular_aqs == 1) {
        resumo_investimento_estimado_aqs = 0;
    } else if (total_area < investimento[0].info[0].max) {
        resumo_investimento_estimado_aqs = new Number((investimento[0].info[0].valor * total_area).toFixed(0));
    } else if (total_area > investimento[0].info[2].max) {
        resumo_investimento_estimado_aqs = new Number((investimento[0].info[2].valor * total_area).toFixed(0));
    } else {
        var tmp = 0;
        if (total_vol_acumulacao < investimento[1].info[0].max) {
            tmp = investimento[1].info[0].valor * total_vol_acumulacao;
        } else if (total_vol_acumulacao > investimento[1].info[2].min) {
            tmp = investimento[1].info[2].valor * total_vol_acumulacao;
        } else {
            tmp = investimento[1].info[1].valor * total_vol_acumulacao;
        }

        resumo_investimento_estimado_aqs = new Number((investimento[0].info[1].valor * total_area + tmp * (1 + investimento[2].valor_direto)).toFixed(0));

    }

    resumo_pri_simples_aqs = new Number((resumo_investimento_estimado_aqs / resumo_reducao_custos_valor_aqs).toFixed(1));
}

function resumoGlobals() {
    var consumos_anuais_dados = first_total;
    var escolha = $('#escolhe').val();
    var usa_aqs = $('#use-aqs').val();

    consumo_anual_total_global_inicial = 0;
    consumo_anual_total_global_final = 0;
    consumo_anual_clima_global_inicial = 0;
    consumo_anual_clima_global_final = 0;
    perc_relativa_total_global_inicial = 0;
    perc_relativa_total_global_final = 0;
    custos_anuais_global_inicial = 0;
    custos_anuais_global_final = 0;
    reducao_consumo_global = 0;
    reducao_custo_global_valor = 0;
    reducao_custo_global_perc = 0;
    custo_unit_global_inicial = 0;
    custo_unit_global_final = 0;
    investimento_estimado_global = 0;
    pri_simples_global = 0;


    consumo_anual_total_global_inicial = new Number(consumos_anuais_dados);

    


    if (escolha == 1) {
        consumo_anual_clima_global_inicial = 0; //arrefecimento nao feito ainda
        consumo_anual_clima_global_final = 0;
    } else if (escolha == 0 && (usa_aqs == '' || usa_aqs == 1)) {
        consumo_anual_clima_global_inicial = new Number((resumo_consumo_anual_inicial).toFixed(0));
        consumo_anual_clima_global_final = new Number((resumo_consumo_anual_final).toFixed(0));
    } else if (escolha == 0 && usa_aqs == 0) {
        consumo_anual_clima_global_inicial = new Number((resumo_consumo_anual_inicial + resumo_consumo_anual_inicial_aqs).toFixed(0));
        consumo_anual_clima_global_final = new Number((resumo_consumo_anual_final + resumo_consumo_anual_final_aqs).toFixed(0));
    } else if (escolha == 2 && (usa_aqs == '' || usa_aqs == 1)) {
        consumo_anual_clima_global_inicial = new Number((0 + resumo_consumo_anual_inicial_aqs).toFixed(0));
        consumo_anual_clima_global_final = new Number((0 + resumo_consumo_anual_final_aqs).toFixed(0));
    } else {
        consumo_anual_clima_global_inicial = new Number((resumo_consumo_anual_inicial + resumo_consumo_anual_inicial_aqs + 0).toFixed(0));
        consumo_anual_clima_global_final = new Number((resumo_consumo_anual_final + resumo_consumo_anual_final_aqs + 0).toFixed(0));
    }

    
    if (escolha == 1) {
        custos_anuais_global_inicial = 0;
        custos_anuais_global_final = 0; // ARREFECIMENTO
        reducao_consumo_global = 0;
        reducao_custo_global_valor = 0;
    } else if (escolha == 0 && (usa_aqs == '' || usa_aqs == 1)) {
        custos_anuais_global_inicial = new Number((resumo_custo_anual_inicial).toFixed(0));
        custos_anuais_global_final = new Number((resumo_custo_anual_final).toFixed(0));
        reducao_consumo_global = new Number((resumo_reducao_consumo).toFixed(0));
        reducao_custo_global_valor = new Number((resumo_reducao_custos_valor).toFixed(0));
    } else if (escolha == 0 && usa_aqs == 0) {
        custos_anuais_global_inicial = new Number((resumo_custo_anual_inicial + resumo_custo_anual_inicial_aqs).toFixed(0));
        custos_anuais_global_final = new Number((resumo_custo_anual_final + resumo_custo_anual_final_aqs).toFixed(0));
        reducao_consumo_global = new Number((resumo_reducao_consumo + resumo_reducao_consumo_aqs).toFixed(0));
        reducao_custo_global_valor = new Number((resumo_reducao_custos_valor + resumo_reducao_custos_valor_aqs).toFixed(0));
    } else if (escolha == 2 && (usa_aqs == '' || usa_aqs == 1)) {
        custos_anuais_global_inicial = new Number((resumo_custo_anual_inicial + 0).toFixed(0));
        custos_anuais_global_final = new Number((resumo_custo_anual_final + 0).toFixed(0));
        reducao_consumo_global = new Number((resumo_reducao_consumo + 0).toFixed(0)); // 0 - Arrefecimento
        reducao_custo_global_valor = new Number((resumo_reducao_custos_valor + 0).toFixed(0));
    } else {
        custos_anuais_global_inicial = new Number((resumo_custo_anual_inicial + 0 + resumo_custo_anual_inicial_aqs).toFixed(0));
        custos_anuais_global_final = new Number((resumo_custo_anual_final + 0 + resumo_custo_anual_final_aqs).toFixed(0));
        reducao_consumo_global = new Number((resumo_reducao_consumo + 0 + resumo_reducao_consumo_aqs).toFixed(0));
        reducao_custo_global_valor = new Number((resumo_reducao_custos_valor + 0 + resumo_reducao_custos_valor_aqs).toFixed(0));
    }

    reducao_custo_global_perc = new Number(((reducao_custo_global_valor / custos_anuais_global_inicial) * 100).toFixed(0));

    custo_unit_global_inicial = new Number((custos_anuais_global_inicial / consumo_anual_clima_global_inicial).toFixed(2));
    custo_unit_global_final = new Number((custos_anuais_global_final / consumo_anual_clima_global_final).toFixed(2));
    
    consumo_anual_total_global_final = new Number( (consumos_anuais_dados - reducao_consumo_global).toFixed(0) );
    perc_relativa_total_global_inicial = new Number(((consumo_anual_clima_global_inicial / consumo_anual_total_global_inicial) * 100).toFixed(0));
    perc_relativa_total_global_final = new Number(((consumo_anual_clima_global_final / consumo_anual_total_global_final) * 100).toFixed(0));


    if (escolha == 1) {
        investimento_estimado_global = 0; //arrefecimento nao feito ainda
    } else if (escolha == 0 && (usa_aqs == '' || usa_aqs == 1)) {
        investimento_estimado_global = new Number((resumo_investimento_estimado).toFixed(0));
    } else if (escolha == 0 && usa_aqs == 0) {
        investimento_estimado_global = new Number((resumo_investimento_estimado + resumo_investimento_estimado_aqs).toFixed(0));
    } else if (escolha == 2 && (usa_aqs == '' || usa_aqs == 1)) {
        investimento_estimado_global = 0 + resumo_investimento_estimado_aqs;
    } else {
        investimento_estimado_global = new Number((resumo_investimento_estimado + resumo_investimento_estimado_aqs + 0).toFixed(0));
    }

    pri_simples_global = new Number((investimento_estimado_global / reducao_custo_global_valor).toFixed(1));
}

function showResumo() {
    //equipamento
    $('#equipamento-aqu-inicial').html(resumo_equipamento_inicial);
    $('#equipamento-aqu-final').html(resumo_equipamento_final);

    //potencia
    $('#potencia-aqu-inicial').html(resumo_potencia_inicial + ' kW');
    $('#potencia-aqu-final').html(resumo_potencia_final + ' kW');

    //rendimento
    $('#rendimento-aqu-inicial').html(resumo_rendimento_inicial + '%');
    $('#rendimento-aqu-final').html(resumo_rendimento_final + '%');

    //fonte de energia
    $('#fonte-energia-aqu-inicial').html(resumo_fonte_energia_inicial);
    $('#fonte-energia-aqu-final').html(resumo_fonte_energia_final);

    //consumos anuais
    $('#cons-anual-aqu-inicial').html(resumo_consumo_anual_inicial + ' kWh');
    $('#cons-anual-aqu-final').html(resumo_consumo_anual_final + ' kWh');
    $('#cons-anual-aqs-inicial').html(resumo_consumo_anual_inicial_aqs + ' kWh');
    $('#cons-anual-aqs-final').html(resumo_consumo_anual_final_aqs + ' kWh');

    //custos anuais
    $('#custo-anual-aqu-inicial').html(resumo_custo_anual_inicial + ' €');
    $('#custo-anual-aqu-final').html(resumo_custo_anual_final + ' €');
    $('#custo-anual-aqs-inicial').html(resumo_custo_anual_inicial_aqs + ' €');
    $('#custo-anual-aqs-final').html(resumo_custo_anual_final_aqs + ' €');

    //reducao consumos
    $('#reducao-cons-aqu').html(resumo_reducao_consumo + ' kWh');
    $('#reducao-cons-aqs').html(resumo_reducao_consumo_aqs + ' kWh');

    //reducao custos
    $('#reducao-custo-aqu').html(resumo_reducao_custos_valor + ' €');
    $('#reducao-custo-aqs').html(resumo_reducao_custos_valor_aqs + ' €');

    //reducao custos percentagem
    $('#reducao-custo-aqu-perc').html(resumo_reducao_custos_perc + '%');
    $('#reducao-custo-aqs-perc').html(resumo_reducao_custos_perc_aqs + '%');

    //custo unit
    $('#custo-unit-aqu-inicial').html(resumo_custo_unit_inicial + ' €');
    $('#custo-unit-aqu-final').html(resumo_custo_unit_final + ' €');
    $('#custo-unit-aqs-inicial').html(resumo_custo_unit_inicial_aqs + ' €');
    $('#custo-unit-aqs-final').html(resumo_custo_unit_final_aqs + ' €');

    //investimento estimado
    $('#investimento-aqu').html(resumo_investimento_estimado + ' €');
    $('#investimento-aqs').html(resumo_investimento_estimado_aqs + ' €');

    //pri simples
    $('#pri-aqu').html(resumo_pri_simples + ' anos');
    $('#pri-aqs').html(resumo_pri_simples_aqs + ' anos');
}

function showGlobalResumo() {
    $('#consumo-anual-total-inicial-global').html(consumo_anual_total_global_inicial + ' kWh');
    $('#consumo-anual-total-final-global').html(consumo_anual_total_global_final + ' kWh');

    $('#consumo-anual-clima-inicial-global').html(consumo_anual_clima_global_inicial + ' kWh');
    $('#consumo-anual-clima-final-global').html(consumo_anual_clima_global_final + ' kWh');

    $('#perc-total-inicial-global').html(perc_relativa_total_global_inicial + '%');
    $('#perc-total-final-global').html(perc_relativa_total_global_final + '%');

    $('#custo-anual-inicial-global').html(custos_anuais_global_inicial + ' €');
    $('#custo-anual-final-global').html(custos_anuais_global_final + ' €');

    $('#reducao-consumo-global').html(reducao_consumo_global + ' kWh');

    $('#reducao-custo-valor-global').html(reducao_custo_global_valor + ' €');
    $('#reducao-custo-perc-global').html(reducao_custo_global_perc + '%');

    $('#custo-unit-inicial-global').html(custo_unit_global_inicial + ' €');
    $('#custo-unit-final-global').html(custo_unit_global_final + ' €');

    $('#investimento-global').html(investimento_estimado_global + ' €');

    $('#pri-global').html(pri_simples_global + ' anos');
}

