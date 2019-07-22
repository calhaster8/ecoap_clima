var first_total = 0;

var paredes_area = 0;
var paredes_u = 0;
var paredes_kwh_inverno = 0;
var paredes_perc_inverno = 0;
var paredes_kwh_verao = 0;
var paredes_perc_verao = 0;

var envidracados_area = 0;
var envidracados_u = 0;
var envidracados_kwh_inverno = 0;
var envidracados_perc_inverno = 0;
var envidracados_kwh_verao = 0;
var envidracados_perc_verao = 0;

var cobertura_area = 0;
var cobertura_u = 0;
var cobertura_kwh_inverno = 0;
var cobertura_perc_inverno = 0;
var cobertura_kwh_verao = 0;
var cobertura_perc_verao = 0;

var ganhos_kwh_inverno = 0;
var ganhos_perc_inverno = 0;
var ganhos_kwh_verao = 0;
var ganhos_perc_verao = 0;

var total_1_kwh_inverno = 0;
var total_2_kwh_inverno = 0;
var total_3_kwh_inverno = 0;
var total_4_kwh_inverno = 0;

var total_1_kwh_verao = 0;
var total_2_kwh_verao = 0;
var total_3_kwh_verao = 0;
var total_4_kwh_verao = 0;

var nec_aq_meses = [];
var total_nec_meses = 0;

var nec_aqs_meses = [];
var total_nec_aqs_meses = 0;

var consumo_aq_meses = [];
var total_consumo_meses = 0;

var consumo_aqs_meses = [];
var total_consumo_aqs_meses = 0;

var necessidades_array = [];
var necessidades_total = 0;

var energia_solar_array = [];
var energia_solar_total = 0;

var energia_solar_mj_array = [];
var energia_solar_mj_total = 0;

var energia_solar_utilizada_array = [];
var energia_solar_utilizada_total = 0;

var energia_solar_utilizada_perc_array = [];
var energia_solar_utilizada_perc_total = 0;

var energia_solar_sa_array = [];
var energia_solar_sa_total = 0;

var energia_solar_sa_perc_array = [];
var energia_solar_sa_perc_total = 0;

var excedente_solar_array = [];
var excedente_solar_total = 0;

var excedente_solar_perc_array = [];
var excedente_solar_perc_total = 0;

var correcao_orientacao_value = 0;

var totalAnualConsumos = 0;

var total_media_verao_necen = 0;
var total_media_verao_solar = 0;

var total_racio = 0;

var total_n_coletores = 0;

var total_area = 0;

var total_vol_acumulacao = 0;

//CENARIO INICIAL
var cenario_inicial_aquecimento_array = [];
var cenario_inicial_aquecimento_total = 0;

var cenario_inicial_arr_array = [];
var cenario_inicial_arr_total = 0;

var cenario_inicial_aqs_array = [];
var cenario_inicial_aqs_total = 0;

var cenario_inicial_custos_aq_array = [];
var cenario_inicial_custos_aq_total = 0;

var cenario_inicial_custos_arr_array = [];
var cenario_inicial_custos_arr_total = 0;

var cenario_inicial_custos_aqs_array = [];
var cenario_inicial_custos_aqs_total = 0;

//totais consumos
var cenario_inicial_consumos_total_global = 0;
var cenario_inicial_consumos_aq_perc = 0;
var cenario_inicial_consumos_arr_perc = 0;
var cenario_inicial_consumos_aqs_perc = 0;

//totais custos
var cenario_inicial_custos_total_global = 0;
var cenario_inicial_custos_aq_perc = 0;
var cenario_inicial_custos_arr_perc = 0;
var cenario_inicial_custos_aqs_perc = 0;


//CENARIO FINAL
    //consumos
var cenario_final_aquecimento_array = [];
var cenario_final_aquecimento_total = 0;

var cenario_final_arr_array = [];
var cenario_final_arr_total = 0;

var cenario_final_aqs_array = [];
var cenario_final_aqs_total = 0;

//totais consumos final
var cenario_final_consumos_total_global = 0;
var cenario_final_consumos_aq_perc = 0;
var cenario_final_consumos_arr_perc = 0;
var cenario_final_consumos_aqs_perc = 0;

    //custos
var cenario_final_custos_aquecimento_array = [];
var cenario_final_custos_aquecimento_total = 0;

var cenario_final_custos_arrefecimento_array = [];
var cenario_final_custos_arrefecimento_total = 0;

var cenario_final_custos_aqs_array = [];
var cenario_final_custos_aqs_total = 0;

//totais consumos final
var cenario_final_custos_total_global = 0;
var cenario_final_custos_aq_perc = 0;
var cenario_final_custos_arr_perc = 0;
var cenario_final_custos_aqs_perc = 0;

    //REDUCAO
var cenario_final_reducao_aquecimento_array = [];
var cenario_final_reducao_aquecimento_total = 0;
var cenario_final_reducao_aquecimento_array_perc = 0;
var cenario_final_reducao_aquecimento_total_perc = 0;

var cenario_final_reducao_arr_array = [];
var cenario_final_reducao_arr_total = 0;
var cenario_final_reducao_arr_array_perc = 0;
var cenario_final_reducao_arr_total_perc = 0;

var cenario_final_reducao_aqs_array = [];
var cenario_final_reducao_aqs_total = 0;
var cenario_final_reducao_aqs_array_perc = 0;
var cenario_final_reducao_aqs_total_perc = 0;

    //totais reducao
var cenario_final_reducao_total_global = 0;
var cenario_final_reducao_aq_perc = 0;
var cenario_final_reducao_arr_perc = 0;
var cenario_final_reducao_aqs_perc = 0;

//RESUMO 
    //Aquecimento
var resumo_equipamento_inicial = '';
var resumo_equipamento_final = '';
var resumo_potencia_inicial = 0;
var resumo_potencia_final = 0;
var resumo_rendimento_inicial = 0;
var resumo_rendimento_final = 0;
var resumo_fonte_energia_inicial = 0;
var resumo_fonte_energia_final = 0;
var resumo_consumo_anual_inicial = 0;
var resumo_consumo_anual_final = 0;
var resumo_custo_anual_inicial = 0;
var resumo_custo_anual_final = 0;
var resumo_reducao_consumo = 0;
var resumo_reducao_custos_valor = 0;
var resumo_reducao_custos_perc = 0;
var resumo_custo_unit_inicial = 0;
var resumo_custo_unit_final = 0;
var resumo_investimento_estimado = 0;
var resumo_pri_simples = 0;


    //Arrefecimento
var resumo_equipamento_inicial_arr = '';
var resumo_equipamento_final_arr = '';
var resumo_potencia_inicial_arr = 0;
var resumo_potencia_final_arr = 0;
var resumo_rendimento_inicial_arr = 0;
var resumo_rendimento_final_arr = 0;
var resumo_fonte_energia_inicial_arr = 0;
var resumo_fonte_energia_final_arr = 0;
var resumo_consumo_anual_inicial_arr = 0;
var resumo_consumo_anual_final_arr = 0;
var resumo_custo_anual_inicial_arr = 0;
var resumo_custo_anual_final_arr = 0;
var resumo_reducao_consumo_arr = 0;
var resumo_reducao_custos_valor_arr = 0;
var resumo_reducao_custos_perc_arr = 0;
var resumo_custo_unit_inicial_arr = 0;
var resumo_custo_unit_final_arr = 0;
var resumo_investimento_estimado_arr = 0;
var resumo_pri_simples_arr = 0;

    //Aqs
var resumo_consumo_anual_inicial_aqs = 0;
var resumo_consumo_anual_final_aqs = 0;
var resumo_custo_anual_inicial_aqs = 0;
var resumo_custo_anual_final_aqs = 0;
var resumo_reducao_consumo_aqs = 0;
var resumo_reducao_custos_valor_aqs = 0;
var resumo_reducao_custos_perc_aqs = 0;
var resumo_custo_unit_inicial_aqs = 0;
var resumo_custo_unit_final_aqs = 0;
var resumo_investimento_estimado_aqs = 0;
var resumo_pri_simples_aqs = 0;

    //GLOBAIS
var consumo_anual_total_global_inicial = 0;
var consumo_anual_total_global_final = 0;

var consumo_anual_clima_global_inicial = 0;
var consumo_anual_clima_global_final = 0;

var perc_relativa_total_global_inicial = 0;
var perc_relativa_total_global_final = 0;

var custos_anuais_global_inicial = 0;
var custos_anuais_global_final = 0;

var reducao_consumo_global = 0;

var reducao_custo_global_valor = 0;
var reducao_custo_global_perc = 0;

var custo_unit_global_inicial = 0;
var custo_unit_global_final = 0;

var investimento_estimado_global = 0;

var pri_simples_global = 0;


//consumos linhas 
var inputId = 1;
var aqsRowId = 1;

//custos unitários medidas
var custo_unit_med_aq  = 0;

var custo_unit_med_ar = 0;

// custo unitario aquecimento
var custo_en_unit_aq = 0;

var custo_en_unit_ar = 0;

var lastStep = 0;
