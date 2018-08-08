var utilizacao_calc = [
    {
        nome: "Aquecimento"
    }
    /*{
        nome: "Arrefecimento"
    },
    {
        nome: "Aquecimento e Arrefecimento"
    }*/
];

var escolhas = [
    "Não conhece",
    "Sim",
    "Não",
    "Não intervir"
];

var fonteEnergeticaI = [
    {
        nome: "Biomassa",
        unidade: [
            {
                unid_nome: "kg",
                valor: 4
            },
            {
                unid_custo_nome: "€/kg",
                valor: 0.043
            }
        ]
    },
    {
        nome: "Energia Elétrica",
        unidade: [
            {
                unid_nome: "kWh",
                valor: 1
            },
            {
                unid_custo_nome: "€/kWh",
                valor: 0.20
            }
        ]
    },
    {
        nome: "Gás Natural",
        unidade: [
            {
                unid_nome: "m3",
                valor: 12.96
            },
            {
                unid_custo_nome: "€/m3",
                valor: 0.10
            }
        ]
    },
    {
        nome: "Gás Propano",
        unidade: [
            {
                unid_nome: "kg",
                valor: 10.53
            },
            {
                unid_custo_nome: "€/kg",
                valor: 0.12
            }
        ]
    },
    {
        nome: "Gasóleo",
        unidade: [
            {
                unid_nome: "l",
                valor: 9.93
            },
            {
                unid_custo_nome: "€/l",
                valor: 0.12
            }
        ]
    }
];

var perfil_necessidades = [
    {
        nome: "Apenas dias úteis",
        valor: 0.75 //75%
    },
    {
        nome: "Todos os dias da semana",
        valor: 0
    }
];

var periodos_encerramento = [
    {
        periodo: "2 semanas em Dezembro",
        valor: 0.50 // 50%
    },
    {
        periodo: "2 semanas em Agosto",
        valor: 0.50 // 50%
    },
    {
        periodo: "Meses de Julho e Agosto",
        valor: 0.20 // 20%
    },
    {
        periodo: "2 semanas em Dezembro e 2 semanas em Agosto",
        valor: 0 // 0%
    },
    {
        periodo: "2 semanas em Dezembro, meses de Julho e Agosto",
        valor: 0 // 0%
    }
];

var tecnologia_atual_aquecimento = [
    {
        nome: "Caldeira (biomassa)",
        id: 0,
        custo_unit: 0.043, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.6 //60%
            },
            {
                nome: "> 20 anos",
                valor: 0.6 //60%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.6 //60%
            }
        ],
        unidade: "kg",
        fator_conversao: 4,
        fonte_energia: "Biomassa"
    },
    {
        nome: "Caldeira (gás natural)",
        id: 1,
        custo_unit: 0.10, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.87 //87%
            },
            {
                nome: "> 20 anos",
                valor: 0.79 //79%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.83 //83%
            }
        ],
        unidade: "m3",
        fator_conversao: 10.53,
        fonte_energia: "Gás Natural"
    },
    {
        nome: "Caldeira (gás propano)",
        id: 2,
        custo_unit: 0.12, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.87 //87%
            },
            {
                nome: "> 20 anos",
                valor: 0.79 //79%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.83 //83%
            }
        ],
        unidade: "kg",
        fator_conversao: 12.96,
        fonte_energia: "Gás Propano"
    },
    {
        nome: "Caldeira (gasóleo)",
        id: 3,
        custo_unit: 0.12, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.8 //80%
            },
            {
                nome: "> 20 anos",
                valor: 0.72 //72%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.76 //76%
            }
        ],
        unidade: "litro",
        fator_conversao: 9.93,
        fonte_energia: "Gasóleo"
    },
    {
        nome: "Chiller Bomba de calor (aquecimento)",
        id: 4,
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 2.75 // 275%
            },
            {
                nome: "> 20 anos",
                valor: 2.00 // 200%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.50 // 250%
            }
        ],
        unidade: "kWh",
        fator_conversao: 1,
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Expansão direta (aquecimento)",
        id: 5,
        custo_unit: 0.25, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 2.75 // 275%
            },
            {
                nome: "> 20 anos",
                valor: 2.00 // 200%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.50 // 250%
            }
        ],
        unidade: "kWh",
        fator_conversao: 1,
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Resistência elétrica",
        id: 6,
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 1 // 100%
            },
            {
                nome: "> 20 anos",
                valor: 1 // 100%
            },
            {
                nome: "10 a 20 anos",
                valor: 1 // 100%
            }
        ],
        unidade: "kWh",
        fator_conversao: 1,
        fonte_energia: "Energia Elétrica"
    }
];

var tecnologia_atual_arrefecimento = [
    {
        nome: "Chiller (ciclo de absorção)",
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 3 //300%
            },
            {
                nome: "> 20 anos",
                valor: 2.5 //250%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.75 //275%
            }
        ],
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Chiller (codensação a ar)",
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 2.75 //275%
            },
            {
                nome: "> 20 anos",
                valor: 2 //200%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.50 //250%
            }
        ],
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Chiller (codensação a água)",
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 3 //300%
            },
            {
                nome: "> 20 anos",
                valor: 2.5 //250%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.75 //275%
            }
        ],
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Expansão direta (arrefecimento)",
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 2.75 //275%
            },
            {
                nome: "> 20 anos",
                valor: 2 //200%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.50 //250%
            }
        ],
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    }
];

var tecnologia_futura_aquecimento = [
    {
        nome: "Caldeira (biomassa)",
        id: 0,
        custo_unit: 0.043, //euros
        rendimento: 0.9, //90%
        potencia: 0.1, //kW/m2
        investimento: 200, //€
        unidade: "kg",
        fator_conversao: 4.67,
        fonte_energia: "Biomassa"
    },
    {
        nome: "Caldeira de condensação (gás natural)",
        id: 1,
        custo_unit: 0.10, //euros
        rendimento: 1.10, //110%
        potencia: 0.1,
        investimento: 200,
        unidade: "m3",
        fator_conversao: 10.53,
        fonte_energia: "Gás Natural"
    },
    {
        nome: "Caldeira de condensação (gás propano)",
        id: 2,
        custo_unit: 0.12, //euros
        rendimento: 1.10,
        potencia: 0.1,
        investimento: 200,
        unidade: "kg",
        fator_conversao: 12.96,
        fonte_energia: "Propano"
    },
    {
        nome: "Chiller Bomba de calor (aquecimento)",
        id: 3,
        custo_unit: 0.20, //euros
        rendimento: 3.60,
        potencia: 0.03,
        investimento: 1000,
        unidade: "kWh",
        fator_conversao: 1,
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Expansão direta (aquecimento)",
        id: 4,
        custo_unit: 0.20, //euros
        rendimento: 3.60,
        potencia: 0.03,
        investimento: 1000,
        unidade: "kWh",
        fator_conversao: 1,
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Não intervir",
        id: 5
    }
];

var tecnologia_futura_arrefecimento = [
    {
        nome: "Chiller (ciclo de absorção)",
        custo_unit: 0.20, //euros
        rendimento: 3,
        potencia: 0.03,
        investimento: 1000,
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Chiller (condensação a ar",
        custo_unit: 0.20, //euros
        rendimento: 3.75,
        potencia: 0.03,
        investimento: 1000,
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Chiller (consensação a água)",
        custo_unit: 0.20, //euros
        rendimento: 4,
        potencia: 0.03,
        investimento: 1000,
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Expansão direta (arrefecimento)",
        custo_unit: 0.20, //euros
        rendimento: 3.25,
        potencia: 0.03,
        investimento: 1000,
        unidade: "kWh",
        fonte_energia: "Energia Elétrica"
    },
    {
        nome: "Não intervir"
    }
];

var distrito_info = [
    {
        nome: "Açores",
        radiacao: 640,
        verao: "V2",
        nv: 20,
        gdv: 194,
        inverno: "I1",
        ni: 30,
        gdi: 604,
        duracao_estacao: 2.9
    },
    {
        nome: "Aveiro",
        radiacao: 810,
        verao: "V2",
        nv: 20,
        gdv: 108,
        inverno: "I2",
        ni: 70,
        gdi: 1337,
        duracao_estacao: 6.3
    },
    {
        nome: "Beja",
        radiacao: 855,
        verao: "V3",
        nv: 30,
        gdv: 643,
        inverno: "I1",
        ni: 60,
        gdi: 1068,
        duracao_estacao: 5
    },
    {
        nome: "Braga",
        radiacao: 795,
        verao: "V2",
        nv: 20,
        gdv: 167,
        inverno: "I2",
        ni: 80,
        gdi: 1491,
        duracao_estacao: 6.8
    },
    {
        nome: "Bragança",
        radiacao: 790,
        verao: "V2",
        nv: 20,
        gdv: 183,
        inverno: "I3",
        ni: 100,
        gdi: 2015,
        duracao_estacao: 7.3
    },
    {
        nome: "Castelo Branco",
        radiacao: 830,
        verao: "V3",
        nv: 30,
        gdv: 433,
        inverno: "I1",
        ni: 60,
        gdi: 1274,
        duracao_estacao: 5.4
    },
    {
        nome: "Coimbra",
        radiacao: 825,
        verao: "V2",
        nv: 20,
        gdv: 246,
        inverno: "I2",
        ni: 70,
        gdi: 1304,
        duracao_estacao: 6.3
    },
    {
        nome: "Évora",
        radiacao: 850,
        verao: "V3",
        nv: 30,
        gdv: 567,
        inverno: "I1",
        ni: 60,
        gdi: 1150,
        duracao_estacao: 5.3
    },
    {
        nome: "Faro",
        radiacao: 865,
        verao: "V3",
        nv: 30,
        gdv: 585,
        inverno: "I1",
        ni: 50,
        gdi: 987,
        duracao_estacao: 4.8
    },
    {
        nome: "Guarda",
        radiacao: 820,
        verao: "V2",
        nv: 20,
        gdv: 136,
        inverno: "I3",
        ni: 100,
        gdi: 1924,
        duracao_estacao: 7.5
    },
    {
        nome: "Leiria",
        radiacao: 830,
        verao: "V2",
        nv: 20,
        gdv: 279,
        inverno: "I2",
        ni: 70,
        gdi: 1323,
        duracao_estacao: 6.6
    },
    {
        nome: "Lisboa",
        radiacao: 840,
        verao: "V2",
        nv: 20,
        gdv: 435,
        inverno: "I1",
        ni: 60,
        gdi: 1071,
        duracao_estacao: 5.3
    },
    {
        nome: "Madeira",
        radiacao: 580,
        verao: "V2",
        nv: 20,
        gdv: 361,
        inverno: "I1",
        ni: 40,
        gdi: 818,
        duracao_estacao: 3.2
    },
    {
        nome: "Portalegre",
        radiacao: 845,
        verao: "V3",
        nv: 30,
        gdv: 427,
        inverno: "I1",
        ni: 60,
        gdi: 1221,
        duracao_estacao: 5.3
    },
    {
        nome: "Porto",
        radiacao: 800,
        verao: "V2",
        nv: 20,
        gdv: 108,
        inverno: "I1",
        ni: 60,
        gdi: 1250,
        duracao_estacao: 6.2
    },
    {
        nome: "Santarém",
        radiacao: 835,
        verao: "V3",
        nv: 30,
        gdv: 481,
        inverno: "I1",
        ni: 60,
        gdi: 1135,
        duracao_estacao: 5.2
    },
    {
        nome: "Setúbal",
        radiacao: 845,
        verao: "V3",
        nv: 30,
        gdv: 429,
        inverno: "I1",
        ni: 60,
        gdi: 1045,
        duracao_estacao: 4.7
    },
    {
        nome: "Viana do Castelo",
        radiacao: 785,
        verao: "V2",
        nv: 20,
        gdv: 197,
        inverno: "I2",
        ni: 80,
        gdi: 1629,
        duracao_estacao: 7.2
    },
    {
        nome: "Vila Real",
        radiacao: 805,
        verao: "V3",
        nv: 30,
        gdv: 314,
        inverno: "I2",
        ni: 90,
        gdi: 1764,
        duracao_estacao: 6.9
    },
    {
        nome: "Viseu",
        radiacao: 815,
        verao: "V2",
        nv: 20,
        gdv: 136,
        inverno: "I2",
        ni: 80,
        gdi: 1702,
        duracao_estacao: 7.3
    }
];

var temperatura_ambiente = 18;

var classes = [
    {
        classe_id: "A+",
        valor_direto: 0,
        info: [
            {
                nome: 'Envolvente',
                valor: 0.30
            },
            {
                nome: 'Envidraçados',
                valor: 1.50
            },
            {
                nome: 'Fator Solar',
                valor: 0.60
            },
            {
                nome: 'Cobertura',
                valor: 0.30
            }
        ]
    },
    {
        classe_id: "A",
        valor_direto: 0.26,
        info: [
            {
                nome: 'Envolvente',
                valor: 0.25
            },
            {
                nome: 'Envidraçados',
                valor: 1.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.50
            },
            {
                nome: 'Cobertura',
                valor: 0.20
            }
        ]
    },
    {
        classe_id: "B",
        valor_direto: 0.51,
        info: [
            {
                nome: 'Envolvente',
                valor: 0.40
            },
            {
                nome: 'Envidraçados',
                valor: 2.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.75
            },
            {
                nome: 'Cobertura',
                valor: 0.40
            }
        ]
    },
    {
        classe_id: "B-",
        valor_direto: 0.76,
        info: [
            {
                nome: 'Envolvente',
                valor: 0.50
            },
            {
                nome: 'Envidraçados',
                valor: 2.50
            },
            {
                nome: 'Fator Solar',
                valor: 0.75
            },
            {
                nome: 'Cobertura',
                valor: 0.50
            }
        ]
    },
    {
        classe_id: "C",
        valor_direto: 1.01,
        info: [
            {
                nome: 'Envolvente',
                valor: 1.00
            },
            {
                nome: 'Envidraçados',
                valor: 3.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.75
            },
            {
                nome: 'Cobertura',
                valor: 1.00
            }
        ]
    },
    {
        classe_id: "D",
        valor_direto: 1.51,
        info: [
            {
                nome: 'Envolvente',
                valor: 2.00
            },
            {
                nome: 'Envidraçados',
                valor: 3.50
            },
            {
                nome: 'Fator Solar',
                valor: 0.85
            },
            {
                nome: 'Cobertura',
                valor: 1.50
            }
        ]
    },
    {
        classe_id: "E",
        valor_direto: 2.01,
        info: [
            {
                nome: 'Envolvente',
                valor: 2.50
            },
            {
                nome: 'Envidraçados',
                valor: 4.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.85
            },
            {
                nome: 'Cobertura',
                valor: 2.00
            }
        ]
    },
    {
        classe_id: "F",
        valor_direto: 2.51,
        info: [
            {
                nome: 'Envolvente',
                valor: 3.00
            },
            {
                nome: 'Envidraçados',
                valor: 4.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.85
            },
            {
                nome: 'Cobertura',
                valor: 2.50
            }
        ]
    },
    {
        classe_id: "Não conhece",
        valor_direto: 0,
        info: [
            {
                nome: 'Envolvente',
                valor: 0
            },
            {
                nome: 'Envidraçados',
                valor: 0
            },
            {
                nome: 'Fator Solar',
                valor: 0
            },
            {
                nome: 'Cobertura',
                valor: 0
            }
        ]
    }
];

var envolvente = 1.20;

var envidracados_direto = 0.20;

var coeficient_conversao = 0.024;

var ganhos_internos_v = 4; // W/m2

var ganhos_internos_i = 3.2; // W/m2

var fator_ganhos = 0.25;

var necessidades_climatizacao_verao = 2.928; // h/ano

var fator_solar_verao = 0.40;

var fracao_envidracada = 0.65;

var necessidades_climatizacao_btu = 400; // BTU/m2

var coeficient_conversao_BTU = 3412.142;

var coeficient_conversao_KW = 860;

var anos_construcao = [
    {
        nome: '<1960',
        info: [
            {
                nome: 'Envolvente',
                valor: 1.75
            },
            {
                nome: 'E com isolamento',
                valor: 0.64
            },
            {
                nome: 'Envidraçados',
                valor: 4.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.85
            },
            {
                nome: 'Cobertura',
                valor: 2.50
            },
            {
                nome: 'C com isolamento',
                valor: 0.71
            }
        ]
    },
    {
        nome: '>2015',
        info: [
            {
                nome: 'Envolvente',
                valor: 0.40
            },
            {
                nome: 'E com isolamento',
                valor: 0
            },
            {
                nome: 'Envidraçados',
                valor: 2.50
            },
            {
                nome: 'Fator Solar',
                valor: 0.75
            },
            {
                nome: 'Cobertura',
                valor: 0.40
            },
            {
                nome: 'C com isolamento',
                valor: 0
            }
        ]
    },
    {
        nome: '1961 - 1985',
        info: [
            {
                nome: 'Envolvente',
                valor: 1.50
            },
            {
                nome: 'E com isolamento',
                valor: 0.60
            },
            {
                nome: 'Envidraçados',
                valor: 4.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.85
            },
            {
                nome: 'Cobertura',
                valor: 2.00
            },
            {
                nome: 'C com isolamento',
                valor: 0.67
            }
        ]
    },
    {
        nome: '1986 - 2001',
        info: [
            {
                nome: 'Envolvente',
                valor: 1.25
            },
            {
                nome: 'E com isolamento',
                valor: 0.56
            },
            {
                nome: 'Envidraçados',
                valor: 3.50
            },
            {
                nome: 'Fator Solar',
                valor: 0.85
            },
            {
                nome: 'Cobertura',
                valor: 1.50
            },
            {
                nome: 'C com isolamento',
                valor: 0.60
            }
        ]
    },
    {
        nome: '2001 - 2015',
        info: [
            {
                nome: 'Envolvente',
                valor: 0.50
            },
            {
                nome: 'E com isolamento',
                valor: 0
            },
            {
                nome: 'Envidraçados',
                valor: 3.00
            },
            {
                nome: 'Fator Solar',
                valor: 0.75
            },
            {
                nome: 'Cobertura',
                valor: 0.50
            },
            {
                nome: 'C com isolamento',
                valor: 0
            }
        ]
    }
];

var envidracados = [
    {
        nome: 'Caixilharia com vidro simples',
        u: 4.00,
        Fs: 0.85
    },
    {
        nome: 'Caixilharia de madeira, ferro ou alumínio, com vidro duplo',
        u: 3.00,
        Fs: 0.75
    },
    {
        nome: 'Caixilharia de madeira, PVC ou alumínio com corte térmico, com vidro duplo',
        u: 2.00,
        Fs: 0.75
    },
    {
        nome: 'Caixilharia de madeira, PVC ou alumínio com corte térmico, com vidro duplo, baixo emissivo',
        u: 1.50,
        Fs: 0.50
    }
];

var consumos = ["Total Anual", "Mensais"];

var verificacao = [
    {
        valor: 0.7, //70%
        texto: "Verificar consumos totais indicados"
    }
];

var consumo_diario_agua = [
    {
        nome: "Cafetaria",
        valor: 1,
        litros_por: "litro/peq.-almoço",
        numero_de: "n° de pequenos almoços"
    },
    {
        nome: "Campismo",
        valor: 40,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Escola",
        valor: 3,
        litros_por: "litro/aluno",
        numero_de: "n° de alunos"
    },
    {
        nome: "Escritório",
        valor: 3,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Ginásio",
        valor: 25,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Hospital e clínica",
        valor: 55,
        litros_por: "litro/cama",
        numero_de: "n° de camas"
    },
    {
        nome: "Hotel / Residencial",
        valor: 55,
        litros_por: "litro/cama",
        numero_de: "n° de camas"
    },
    {
        nome: "Quartel",
        valor: 20,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Residência de estudantes",
        valor: 55,
        litros_por: "litro/cama",
        numero_de: "n° de camas"
    },
    {
        nome: "Restaurante / Cantina",
        valor: 10,
        litros_por: "litro/refeição",
        numero_de: "n° de refeições"
    }
];

var perfil_mensal = [
    {
        nome: "Consumo similar em todos os meses do ano",
        latitude: -5,
        consumo: 0.6, //60%
        tabela: [
            {
                mes: 'Jan',
                valor: 1 //100%
            },
            {
                mes: 'Fev',
                valor: 1 //100%
            },
            {
                mes: 'Mar',
                valor: 1 //100%
            },
            {
                mes: 'Abr',
                valor: 1 //100%
            },
            {
                mes: 'Mai',
                valor: 1 //100%
            },
            {
                mes: 'Jun',
                valor: 1 //100%
            },
            {
                mes: 'Jul',
                valor: 1 //100%
            },
            {
                mes: 'Ago',
                valor: 1 //100%
            },
            {
                mes: 'Set',
                valor: 1 //100%
            },
            {
                mes: 'Out',
                valor: 1 //100%
            },
            {
                mes: 'Nov',
                valor: 1 //100%
            },
            {
                mes: 'Dez',
                valor: 1 //100%
            }
        ]
    },
    {
        nome: "Maior consumo no Semeste de Inverno",
        latitude: 15,
        consumo: 0.6, //60%
        tabela: [
            {
                mes: 'Jan',
                valor: 1 //100%
            },
            {
                mes: 'Fev',
                valor: 1 //100%
            },
            {
                mes: 'Mar',
                valor: 1 //100%
            },
            {
                mes: 'Abr',
                valor: 1 //100%
            },
            {
                mes: 'Mai',
                valor: 0.6 //60%
            },
            {
                mes: 'Jun',
                valor: 0.6 //60%
            },
            {
                mes: 'Jul',
                valor: 0.6 //60%
            },
            {
                mes: 'Ago',
                valor: 0.6 //60%
            },
            {
                mes: 'Set',
                valor: 0.6 //60%
            },
            {
                mes: 'Out',
                valor: 1 //100%
            },
            {
                mes: 'Nov',
                valor: 1 //100%
            },
            {
                mes: 'Dez',
                valor: 1 //100%
            }
        ]
    },
    {
        nome: "Maior consumo no Semestre de Verão",
        latitude: -15,
        consumo: 0.6, //60%
        tabela: [
            {
                mes: 'Jan',
                valor: 0.6 //60%
            },
            {
                mes: 'Fev',
                valor: 0.6 //60%
            },
            {
                mes: 'Mar',
                valor: 0.6 //60%
            },
            {
                mes: 'Abr',
                valor: 0.6 //60%
            },
            {
                mes: 'Mai',
                valor: 1 //100%
            },
            {
                mes: 'Jun',
                valor: 1 //100%
            },
            {
                mes: 'Jul',
                valor: 1 //100%
            },
            {
                mes: 'Ago',
                valor: 1 //100%
            },
            {
                mes: 'Set',
                valor: 1 //100%
            },
            {
                mes: 'Out',
                valor: 0.6 //60%
            },
            {
                mes: 'Nov',
                valor: 0.6 //60%
            },
            {
                mes: 'Dez',
                valor: 0.6 //60%
            }
        ]
    },
    /*{
        nome: "Definir 'perfil'",
        latitude: -5,
        consumo: 0.6, //60%
        tabela: [
            {
                mes: 'Jan',
                valor: 0
            },
            {
                mes: 'Fev',
                valor: 0
            },
            {
                mes: 'Mar',
                valor: 0
            },
            {
                mes: 'Abr',
                valor: 0
            },
            {
                mes: 'Mai',
                valor: 0
            },
            {
                mes: 'Jun',
                valor: 0
            },
            {
                mes: 'Jul',
                valor: 0
            },
            {
                mes: 'Ago',
                valor: 0
            },
            {
                mes: 'Set',
                valor: 0
            },
            {
                mes: 'Out',
                valor: 0
            },
            {
                mes: 'Nov',
                valor: 0
            },
            {
                mes: 'Dez',
                valor: 0
            }
        ]
    }*/
];

var perfil_semanal = [
    {
        nome: "Consumo predominantemente durante o fim de semana",
        valor: 0.3, //30%
        consumo: 0.8 //80%
    },
    {
        nome: "Consumo durante os dias úteis",
        valor: 0.75, //75%
        consumo: 0.8 //80%
    },
    {
        nome: "Consumo similar em todos os dias da semana",
        valor: 0, //0%
        consumo: 0.8 //80%
    },
    /*{
        nome: "Definir 'perfil'",
        valor: 0, //0%
        consumo: 0.8 //80%
    }*/
];

var temperatura_utilizacao = 50; //°C

var desvios = [
    {
        nome: "Desvio de Sul +/- 10°",
        valor: 10
    },
    {
        nome: "Desvio de Sul +/- 20°",
        valor: 20
    },
    {
        nome: "Este",
        valor: "!"
    },
    {
        nome: "Oeste",
        valor: "!"
    },
    {
        nome: "Sul",
        valor: 0
    },
    {
        nome: "Outra orientação (desvio de Sul)",
        valor: "preencher"
    }
];

var area_coletor_solar = 2.25; //m²

var rendimento_otico = 0.75; //75%

var coeficient_perdas = 4.2; //N/S

var perdas = [
    {
        nome: "Perdas gerais",
        valor: 0.15 //%
    },
    {
        nome: "Perdas por sujidade",
        valor: 0.94
    },
    {
        nome: "Perdas por regulação",
        valor: 0.94
    }
];

var volume_acumulacao = 65; //l/m²

var fatores_conversao = [
    0.0041855, //kcal --> MJ
    0.2777 //MJ --> kWh
];

var avisos = [
    {
        nome: "Aviso de produção excedentária",
        valor: 0.4, //40%
        mensagem: "Demasiada energia excedentária no Verão. Considere reduzir o n.º de colectores solares de modo a não ter muita energia excedentária ou salvaguarde a instalação de sistemas de proteção e/ou o escoamento da energia excedente."
    },
    {
        nome: "Aviso de projeto",
        valor: 20, //20m²
        mensagem: "OBS: requer projeto de execução (Portaria 701-H/2008) e sistema de monitorização com registo de produção."
    },
    {
        nome: "Aviso de orientação",
        valor: 20, //20°
        mensagem: "Desvio superior a 20º relativamente a Sul influencia a rentabilidade energética do sistema solar."
    },
    {
        nome: "Aviso de inclinação",
        valor: 15, //15°
        mensagem: "Um desvio superior em 15º relativamente ao ângulo considerado ideal poderá influenciar a rentabilidade energética do sistema solar."
    }
];

var investimento = [
    {
        nome: "Coletores",
        info: [
            {
                tipo: "até 10 m²",
                valor: 250, //250.00€
                unidade: "€/m²",
                min: 0,
                max: 10
            },
            {
                tipo: "10 a 100 m²",
                valor: 200, //200.00€
                unidade: "€/m²",
                min: 10,
                max: 100
            },
            {
                tipo: "mais de 100 m²",
                valor: 150, //150.00€
                unidade: "€/m²",
                min: 100
            }
        ]
    },
    {
        nome: "Acumulação",
        info: [
            {
                tipo: "até 500 litros",
                valor: 5, //5.00€
                unidade: "€/litro",
                min: 0,
                max: 500
            },
            {
                tipo: "500 a 2000 litros",
                valor: 4, //4.00€
                unidade: "€/litro",
                min: 500,
                max: 2000
            },
            {
                tipo: "mais de 2000 litros",
                valor: 3, //3.00€
                unidade: "€/litro",
                min: 2000
            }
        ]
    },
    {
        nome: "Instalação",
        valor_direto: 0.2 //20%
    },
    {
        nome: "Manutenção",
        valor_direto: 0.05 //5%
    }
];

var meses_numero_horas = [
    {
        mes: "Janeiro",
        n_dias: 31,
        n_horas_sol: 8.0,
        aqs_mensal: 0.092 // 9.2%
    },
    {
        mes: "Fevereiro",
        n_dias: 28,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Março",
        n_dias: 31,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Abril",
        n_dias: 30,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Maio",
        n_dias: 31,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Junho",
        n_dias: 30,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Julho",
        n_dias: 31,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Agosto",
        n_dias: 31,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Setembro",
        n_dias: 30,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Outubro",
        n_dias: 31,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Novembro",
        n_dias: 30,
        n_horas_sol: 8.0,
        aqs_mensal: 0.092 // 9.2%
    },
    {
        mes: "Dezembro",
        n_dias: 31,
        n_horas_sol: 7.5,
        aqs_mensal: 0.098 // 9.8%
    }
];

var irradiacao_temp_amb_temp_agua = [
    {
        //dados em MJ/m²
        distritoI: "Açores",
        latitude: 38,
        go_latitude: 1,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.3,
                valorTempAmb: 13.4,
                valorTempAgua: 14.6,
                valorPrinc: 143,
                valorPerc: 0.18
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.7,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1,
                valorPrinc: 143,
                valorPerc: 0.18
            },
            {
                nomeI: "Março",
                valorIrr: 11.9,
                valorTempAmb: 13.4,
                valorTempAgua: 14.6,
                valorPrinc: 143,
                valorPerc: 0.18
            },
            {
                nomeI: "Abril",
                valorIrr: 15.4,
                valorTempAmb: 14.1,
                valorTempAgua: 15.1,
                valorPrinc: 117,
                valorPerc: 0.15
            },
            {
                nomeI: "Maio",
                valorIrr: 18.6,
                valorTempAmb: 15.7,
                valorTempAgua: 15.5,
                valorPrinc: 171,
                valorPerc: 0.09
            },
            {
                nomeI: "Junho",
                valorIrr: 19.0,
                valorTempAmb: 17.6,
                valorTempAgua: 16.5,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Julho",
                valorIrr: 21.1,
                valorTempAmb: 19.7,
                valorTempAgua: 17.5,
                valorPrinc: 53,
                valorPerc: 0.27
            },
            {
                nomeI: "Agosto",
                valorIrr: 19.1,
                valorTempAmb: 20.8,
                valorTempAgua: 18.0,
                valorPrinc: 87,
                valorPerc: 0.45
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.2,
                valorTempAmb: 19.8,
                valorTempAgua: 17.4,
                valorPrinc: 54,
                valorPerc: 0.28
            },
            {
                nomeI: "Outubro",
                valorIrr: 10.8,
                valorTempAmb: 18.0,
                valorTempAgua: 16.9,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.1,
                valorTempAmb: 15.8,
                valorTempAgua: 15.4,
                valorPrinc: 66,
                valorPerc: 0.08
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.5,
                valorTempAmb: 14.4,
                valorTempAgua: 14.9,
                valorPrinc: 112,
                valorPerc: 0.14
            },
            {
                nome: 'GDv',
                valor: 194
            },
            {
                nome: 'GDi',
                valor: 794
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Aveiro",
        latitude: 40,
        go_latitude: 3,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.2,
                valorTempAmb: 8.7,
                valorTempAgua: 10.9,
                valorPrinc: 288,
                valorPerc: 0.18
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.1,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1,
                valorPrinc: 246,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 12.2,
                valorTempAmb: 13.4,
                valorTempAgua: 14.6,
                valorPrinc: 223,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 17.6,
                valorTempAmb: 14.1,
                valorTempAgua: 15.1,
                valorPrinc: 168,
                valorPerc: 0.11
            },
            {
                nomeI: "Maio",
                valorIrr: 20.7,
                valorTempAmb: 15.7,
                valorTempAgua: 15.5,
                valorPrinc: 96,
                valorPerc: 0.06
            },
            {
                nomeI: "Junho",
                valorIrr: 22.1,
                valorTempAmb: 17.6,
                valorTempAgua: 16.5,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Julho",
                valorIrr: 23.9,
                valorTempAmb: 19.7,
                valorTempAgua: 17.5,
                valorPrinc: 53,
                valorPerc: 0.49
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.7,
                valorTempAmb: 20.8,
                valorTempAgua: 18.0,
                valorPrinc: 47,
                valorPerc: 0.43
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.8,
                valorTempAmb: 19.8,
                valorTempAgua: 17.4,
                valorPrinc: 9,
                valorPerc: 0.08
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.4,
                valorTempAmb: 18.0,
                valorTempAgua: 16.9,
                valorPrinc: 81,
                valorPerc: 0.05
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.6,
                valorTempAmb: 15.8,
                valorTempAgua: 15.4,
                valorPrinc: 204,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.9,
                valorTempAmb: 14.4,
                valorTempAgua: 14.9,
                valorPrinc: 285,
                valorPerc: 0.18
            },
            {
                nome: 'GDv',
                valor: 108
            },
            {
                nome: 'GDi',
                valor: 1592
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Beja",
        latitude: 38,
        go_latitude: 1,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 8.1,
                valorTempAmb: 9.9,
                valorTempAgua: 12.2,
                valorPrinc: 251,
                valorPerc: 0.22
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.9,
                valorTempAmb: 10.7,
                valorTempAgua: 13.8,
                valorPrinc: 204,
                valorPerc: 0.18
            },
            {
                nomeI: "Março",
                valorIrr: 14.6,
                valorTempAmb: 12.2,
                valorTempAgua: 14.2,
                valorPrinc: 180,
                valorPerc: 0.16
            },
            {
                nomeI: "Abril",
                valorIrr: 19.4,
                valorTempAmb: 14.2,
                valorTempAgua: 15.2,
                valorPrinc: 114,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 24.1,
                valorTempAmb: 17.6,
                valorTempAgua: 17.7,
                valorPrinc: 12,
                valorPerc: 0.01
            },
            {
                nomeI: "Junho",
                valorIrr: 26.0,
                valorTempAmb: 21.2,
                valorTempAgua: 18.7,
                valorPrinc: 96,
                valorPerc: 0.15
            },
            {
                nomeI: "Julho",
                valorIrr: 27.7,
                valorTempAmb: 24.7,
                valorTempAgua: 20.2,
                valorPrinc: 208,
                valorPerc: 0.32
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.0,
                valorTempAmb: 24.6,
                valorTempAgua: 20.1,
                valorPrinc: 205,
                valorPerc: 0.32
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.8,
                valorTempAmb: 22.5,
                valorTempAgua: 19.1,
                valorPrinc: 135,
                valorPerc: 0.21
            },
            {
                nomeI: "Outubro",
                valorIrr: 13.1,
                valorTempAmb: 18.2,
                valorTempAgua: 17.1,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.2,
                valorTempAmb: 13.2,
                valorTempAgua: 14.6,
                valorPrinc: 144,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.4,
                valorTempAmb: 10.2,
                valorTempAgua: 13.1,
                valorPrinc: 242,
                valorPerc: 0.21
            },
            {
                nome: 'GDv',
                valor: 643
            },
            {
                nome: 'GDi',
                valor: 1148
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Braga",
        latitude: 41,
        go_latitude: 4,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 7.7,
                valorTempAgua: 10.3,
                valorPrinc: 319,
                valorPerc: 0.18
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.7,
                valorTempAmb: 8.5,
                valorTempAgua: 10.8,
                valorPrinc: 266,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 12.3,
                valorTempAmb: 10.3,
                valorTempAgua: 11.8,
                valorPrinc: 239,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 17.2,
                valorTempAmb: 12.1,
                valorTempAgua: 11.8,
                valorPrinc: 177,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 20.3,
                valorTempAmb: 15.0,
                valorTempAgua: 14.3,
                valorPrinc: 93,
                valorPerc: 0.05
            },
            {
                nomeI: "Junho",
                valorIrr: 22.6,
                valorTempAmb: 18.2,
                valorTempAgua: 15.8,
                valorPrinc: 6,
                valorPerc: 0.04
            },
            {
                nomeI: "Julho",
                valorIrr: 24.2,
                valorTempAmb: 20.5,
                valorTempAgua: 16.8,
                valorPrinc: 78,
                valorPerc: 0.46
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.7,
                valorTempAmb: 20.2,
                valorTempAgua: 16.7,
                valorPrinc: 68,
                valorPerc: 0.41
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.6,
                valorTempAmb: 18.5,
                valorTempAgua: 15.7,
                valorPrinc: 15,
                valorPerc: 0.09
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.0,
                valorTempAmb: 15.1,
                valorTempAgua: 14.2,
                valorPrinc: 90,
                valorPerc: 0.05
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.2,
                valorTempAmb: 10.3,
                valorTempAgua: 11.7,
                valorPrinc: 231,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.5,
                valorTempAmb: 7.9,
                valorTempAgua: 10.2,
                valorPrinc: 313,
                valorPerc: 0.18
            },
            {
                nome: 'GDv',
                valor: 167
            },
            {
                nome: 'GDi',
                valor: 1728
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Bragança",
        latitude: 41,
        go_latitude: 4,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 5.0,
                valorTempAgua: 8.8,
                valorPrinc: 403,
                valorPerc: 0.19
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.1,
                valorTempAmb: 6.3,
                valorTempAgua: 9.3,
                valorPrinc: 328,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 13.2,
                valorTempAmb: 8.8,
                valorTempAgua: 10.2,
                valorPrinc: 285,
                valorPerc: 0.13
            },
            {
                nomeI: "Abril",
                valorIrr: 17.1,
                valorTempAmb: 10.8,
                valorTempAgua: 11.2,
                valorPrinc: 216,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 20.9,
                valorTempAmb: 14.4,
                valorTempAgua: 13.2,
                valorPrinc: 112,
                valorPerc: 0.05
            },
            {
                nomeI: "Junho",
                valorIrr: 24.2,
                valorTempAmb: 18.1,
                valorTempAgua: 15.2,
                valorPrinc: 3,
                valorPerc: 0.02
            },
            {
                nomeI: "Julho",
                valorIrr: 25.6,
                valorTempAmb: 21.1,
                valorTempAgua: 16.7,
                valorPrinc: 96,
                valorPerc: 0.53
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.9,
                valorTempAmb: 20.7,
                valorTempAgua: 16.1,
                valorPrinc: 84,
                valorPerc: 0.46
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.3,
                valorTempAmb: 17.9,
                valorTempAgua: 14.6,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Outubro",
                valorIrr: 10.9,
                valorTempAmb: 13.3,
                valorTempAgua: 12.6,
                valorPrinc: 146,
                valorPerc: 0.07
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.1,
                valorTempAmb: 8.4,
                valorTempAgua: 10.1,
                valorPrinc: 288,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.1,
                valorTempAmb: 5.5,
                valorTempAgua: 8.5,
                valorPrinc: 388,
                valorPerc: 0.18
            },
            {
                nome: 'GDv',
                valor: 183
            },
            {
                nome: 'GDi',
                valor: 2165
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Castelo Branco",
        latitude: 40,
        go_latitude: 3,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.1,
                valorTempAmb: 7.7,
                valorTempAgua: 10.8,
                valorPrinc: 319,
                valorPerc: 0.19
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.9,
                valorTempAmb: 8.5,
                valorTempAgua: 11.3,
                valorPrinc: 266,
                valorPerc: 0.16
            },
            {
                nomeI: "Março",
                valorIrr: 13.6,
                valorTempAmb: 10.4,
                valorTempAgua: 12.3,
                valorPrinc: 236,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 18.5,
                valorTempAmb: 12.2,
                valorTempAgua: 13.2,
                valorPrinc: 174,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 22.4,
                valorTempAmb: 16.0,
                valorTempAgua: 15.2,
                valorPrinc: 62,
                valorPerc: 0.04
            },
            {
                nomeI: "Junho",
                valorIrr: 25.0,
                valorTempAmb: 20.0,
                valorTempAgua: 17.2,
                valorPrinc: 60,
                valorPerc: 0.14
            },
            {
                nomeI: "Julho",
                valorIrr: 27.0,
                valorTempAmb: 23.1,
                valorTempAgua: 18.7,
                valorPrinc: 158,
                valorPerc: 0.37
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.4,
                valorTempAmb: 22.7,
                valorTempAgua: 18.2,
                valorPrinc: 146,
                valorPerc: 0.34
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.4,
                valorTempAmb: 20.3,
                valorTempAgua: 17.2,
                valorPrinc: 69,
                valorPerc: 0.16
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.3,
                valorTempAmb: 15.4,
                valorTempAgua: 14.7,
                valorPrinc: 81,
                valorPerc: 0.05
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.3,
                valorTempAmb: 10.8,
                valorTempAgua: 12.1,
                valorPrinc: 216,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.5,
                valorTempAmb: 8.0,
                valorTempAgua: 11.1,
                valorPrinc: 310,
                valorPerc: 0.19
            },
            {
                nome: 'GDv',
                valor: 433
            },
            {
                nome: 'GDi',
                valor: 1664
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Coimbra",
        latitude: 40,
        go_latitude: 3,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.5,
                valorTempAmb: 8.9,
                valorTempAgua: 11.2,
                valorPrinc: 282,
                valorPerc: 0.18
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.5,
                valorTempAmb: 9.5,
                valorTempAgua: 11.7,
                valorPrinc: 238,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 12.6,
                valorTempAmb: 10.5,
                valorTempAgua: 12.2,
                valorPrinc: 233,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 18.0,
                valorTempAmb: 12.2,
                valorTempAgua: 13.1,
                valorPrinc: 174,
                valorPerc: 0.11
            },
            {
                nomeI: "Maio",
                valorIrr: 21.3,
                valorTempAmb: 15.5,
                valorTempAgua: 14.6,
                valorPrinc: 78,
                valorPerc: 0.05
            },
            {
                nomeI: "Junho",
                valorIrr: 23.0,
                valorTempAmb: 18.5,
                valorTempAgua: 16.1,
                valorPrinc: 15,
                valorPerc: 0.06
            },
            {
                nomeI: "Julho",
                valorIrr: 24.7,
                valorTempAmb: 21.0,
                valorTempAgua: 17.6,
                valorPrinc: 93,
                valorPerc: 0.38
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.6,
                valorTempAmb: 21.0,
                valorTempAgua: 17.6,
                valorPrinc: 93,
                valorPerc: 0.38
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.4,
                valorTempAmb: 19.5,
                valorTempAgua: 16.6,
                valorPrinc: 45,
                valorPerc: 0.18
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.8,
                valorTempAmb: 16.0,
                valorTempAgua: 15.1,
                valorPrinc: 62,
                valorPerc: 0.04
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.9,
                valorTempAmb: 11.5,
                valorTempAgua: 12.5,
                valorPrinc: 195,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.2,
                valorTempAmb: 9.0,
                valorTempAgua: 11.5,
                valorPrinc: 279,
                valorPerc: 0.18
            },
            {
                nome: 'GDv',
                valor: 246
            },
            {
                nome: 'GDi',
                valor: 1540
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Évora",
        latitude: 39,
        go_latitude: 2,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.9,
                valorTempAmb: 9.5,
                valorTempAgua: 12.5,
                valorPrinc: 264,
                valorPerc: 0.21
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.8,
                valorTempAmb: 10.3,
                valorTempAgua: 13.0,
                valorPrinc: 216,
                valorPerc: 0.17
            },
            {
                nomeI: "Março",
                valorIrr: 14.6,
                valorTempAmb: 12.0,
                valorTempAgua: 14.0,
                valorPrinc: 186,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 19.2,
                valorTempAmb: 13.9,
                valorTempAgua: 14.5,
                valorPrinc: 123,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 23.8,
                valorTempAmb: 17.2,
                valorTempAgua: 16.5,
                valorPrinc: 25,
                valorPerc: 0.02
            },
            {
                nomeI: "Junho",
                valorIrr: 26.3,
                valorTempAmb: 20.8,
                valorTempAgua: 18.0,
                valorPrinc: 84,
                valorPerc: 0.15
            },
            {
                nomeI: "Julho",
                valorIrr: 27.9,
                valorTempAmb: 23.9,
                valorTempAgua: 19.4,
                valorPrinc: 183,
                valorPerc: 0.32
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.2,
                valorTempAmb: 23.9,
                valorTempAgua: 18.4,
                valorPrinc: 183,
                valorPerc: 0.32
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.6,
                valorTempAmb: 21.9,
                valorTempAgua: 18.3,
                valorPrinc: 117,
                valorPerc: 0.21
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.9,
                valorTempAmb: 17.5,
                valorTempAgua: 16.3,
                valorPrinc: 16,
                valorPerc: 0.01
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.0,
                valorTempAmb: 12.8,
                valorTempAgua: 13.8,
                valorPrinc: 156,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.2,
                valorTempAmb: 9.8,
                valorTempAgua: 12.3,
                valorPrinc: 254,
                valorPerc: 0.21
            },
            {
                nome: 'GDv',
                valor: 567
            },
            {
                nome: 'GDi',
                valor: 1239
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Faro",
        latitude: 38,
        go_latitude: 1,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 8.0,
                valorTempAmb: 12.0,
                valorTempAgua: 14.7,
                valorPrinc: 186,
                valorPerc: 0.32
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.7,
                valorTempAmb: 12.5,
                valorTempAgua: 14.7,
                valorPrinc: 154,
                valorPerc: 0.19
            },
            {
                nomeI: "Março",
                valorIrr: 14.2,
                valorTempAmb: 13.6,
                valorTempAgua: 15.2,
                valorPrinc: 136,
                valorPerc: 0.17
            },
            {
                nomeI: "Abril",
                valorIrr: 19.7,
                valorTempAmb: 15.7,
                valorTempAgua: 16.2,
                valorPrinc: 69,
                valorPerc: 0.09
            },
            {
                nomeI: "Maio",
                valorIrr: 24.0,
                valorTempAmb: 18.4,
                valorTempAgua: 17.6,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Junho",
                valorIrr: 26.7,
                valorTempAmb: 21.2,
                valorTempAgua: 19.1,
                valorPrinc: 96,
                valorPerc: 0.16
            },
            {
                nomeI: "Julho",
                valorIrr: 27.6,
                valorTempAmb: 23.9,
                valorTempAgua: 20.7,
                valorPrinc: 183,
                valorPerc: 0.31
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.6,
                valorTempAmb: 24.0,
                valorTempAgua: 20.6,
                valorPrinc: 186,
                valorPerc: 0.32
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.6,
                valorTempAmb: 22.0,
                valorTempAgua: 19.6,
                valorPrinc: 120,
                valorPerc: 0.21
            },
            {
                nomeI: "Outubro",
                valorIrr: 13.3,
                valorTempAmb: 18.8,
                valorTempAgua: 17.6,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.4,
                valorTempAmb: 14.9,
                valorTempAgua: 15.6,
                valorPrinc: 93,
                valorPerc: 0.11
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.8,
                valorTempAmb: 12.5,
                valorTempAgua: 14.5,
                valorPrinc: 171,
                valorPerc: 0.21
            },
            {
                nome: 'GDv',
                valor: 585
            },
            {
                nome: 'GDi',
                valor: 809
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Guarda",
        latitude: 40,
        go_latitude: 3,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.9,
                valorTempAmb: 4.7,
                valorTempAgua: 7.8,
                valorPrinc: 412,
                valorPerc: 0.17
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.8,
                valorTempAmb: 5.4,
                valorTempAgua: 8.3,
                valorPrinc: 353,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 14.6,
                valorTempAmb: 7.5,
                valorTempAgua: 9.3,
                valorPrinc: 326,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 19.2,
                valorTempAmb: 9.4,
                valorTempAgua: 10.3,
                valorPrinc: 258,
                valorPerc: 0.11
            },
            {
                nomeI: "Maio",
                valorIrr: 23.8,
                valorTempAmb: 13.0,
                valorTempAgua: 12.3,
                valorPrinc: 155,
                valorPerc: 0.07
            },
            {
                nomeI: "Junho",
                valorIrr: 26.3,
                valorTempAmb: 16.9,
                valorTempAgua: 13.7,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Julho",
                valorIrr: 27.9,
                valorTempAmb: 20.4,
                valorTempAgua: 15.7,
                valorPrinc: 74,
                valorPerc: 0.55
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.2,
                valorTempAmb: 20.0,
                valorTempAgua: 15.7,
                valorPrinc: 62,
                valorPerc: 0.45
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.6,
                valorTempAmb: 17.6,
                valorTempAgua: 14.2,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.9,
                valorTempAmb: 12.9,
                valorTempAgua: 11.7,
                valorPrinc: 158,
                valorPerc: 0.07
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.0,
                valorTempAmb: 7.8,
                valorTempAgua: 9.1,
                valorPrinc: 306,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.2,
                valorTempAmb: 5.1,
                valorTempAgua: 8.1,
                valorPrinc: 400,
                valorPerc: 0.17
            },
            {
                nome: 'GDv',
                valor: 136
            },
            {
                nome: 'GDi',
                valor: 2368
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Leiria",
        latitude: 40,
        go_latitude: 3,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.8,
                valorTempAmb: 10.1,
                valorTempAgua: 12.7,
                valorPrinc: 245,
                valorPerc: 0.20
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.8,
                valorTempAmb: 10.8,
                valorTempAgua: 12.7,
                valorPrinc: 202,
                valorPerc: 0.16
            },
            {
                nomeI: "Março",
                valorIrr: 13.0,
                valorTempAmb: 12.2,
                valorTempAgua: 13.6,
                valorPrinc: 180,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 18.2,
                valorTempAmb: 14.0,
                valorTempAgua: 14.6,
                valorPrinc: 120,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 21.8,
                valorTempAmb: 16.4,
                valorTempAgua: 15.6,
                valorPrinc: 50,
                valorPerc: 0.04
            },
            {
                nomeI: "Junho",
                valorIrr: 23.5,
                valorTempAmb: 19.0,
                valorTempAgua: 17.1,
                valorPrinc: 30,
                valorPerc: 0.11
            },
            {
                nomeI: "Julho",
                valorIrr: 24.6,
                valorTempAmb: 21.0,
                valorTempAgua: 18.1,
                valorPrinc: 93,
                valorPerc: 0.33
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.6,
                valorTempAmb: 21.1,
                valorTempAgua: 18.1,
                valorPrinc: 96,
                valorPerc: 0.34
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.7,
                valorTempAmb: 20.0,
                valorTempAgua: 17.6,
                valorPrinc: 60,
                valorPerc: 0.21
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.0,
                valorTempAmb: 17.2,
                valorTempAgua: 16.1,
                valorPrinc: 25,
                valorPerc: 0.02
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.2,
                valorTempAmb: 12.7,
                valorTempAgua: 13.6,
                valorPrinc: 159,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.5,
                valorTempAmb: 10.0,
                valorTempAgua: 12.6,
                valorPrinc: 248,
                valorPerc: 0.20
            },
            {
                nome: 'GDv',
                valor: 279
            },
            {
                nome: 'GDi',
                valor: 1228
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Lisboa",
        latitude: 39,
        go_latitude: 2,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.3,
                valorTempAmb: 11.0,
                valorTempAgua: 13.8,
                valorPrinc: 217,
                valorPerc: 0.22
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.3,
                valorTempAmb: 11.9,
                valorTempAgua: 13.7,
                valorPrinc: 171,
                valorPerc: 0.18
            },
            {
                nomeI: "Março",
                valorIrr: 13.7,
                valorTempAmb: 13.2,
                valorTempAgua: 14.7,
                valorPrinc: 149,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 18.8,
                valorTempAmb: 15.0,
                valorTempAgua: 15.7,
                valorPrinc: 90,
                valorPerc: 0.09
            },
            {
                nomeI: "Maio",
                valorIrr: 23.0,
                valorTempAmb: 17.3,
                valorTempAgua: 16.7,
                valorPrinc: 22,
                valorPerc: 0.02
            },
            {
                nomeI: "Junho",
                valorIrr: 24.9,
                valorTempAmb: 20.1,
                valorTempAgua: 18.2,
                valorPrinc: 63,
                valorPerc: 0.14
            },
            {
                nomeI: "Julho",
                valorIrr: 26.5,
                valorTempAmb: 22.3,
                valorTempAgua: 19.2,
                valorPrinc: 133,
                valorPerc: 0.31
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.4,
                valorTempAmb: 22.5,
                valorTempAgua: 19.2,
                valorPrinc: 140,
                valorPerc: 0.32
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.7,
                valorTempAmb: 21.3,
                valorTempAgua: 18.6,
                valorPrinc: 99,
                valorPerc: 0.23
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.5,
                valorTempAmb: 18.1,
                valorTempAgua: 17.1,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.7,
                valorTempAmb: 14.0,
                valorTempAgua: 15.1,
                valorPrinc: 120,
                valorPerc: 0.12
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.0,
                valorTempAmb: 11.4,
                valorTempAgua: 13.6,
                valorPrinc: 205,
                valorPerc: 0.21
            },
            {
                nome: 'GDv',
                valor: 435
            },
            {
                nome: 'GDi',
                valor: 973
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Madeira",
        latitude: 32,
        go_latitude: 0,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 9.4,
                valorTempAmb: 15.8,
                valorTempAgua: 16.6,
                valorPrinc: 68,
                valorPerc: 0.22
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 11.0,
                valorTempAmb: 15.6,
                valorTempAgua: 16.6,
                valorPrinc: 67,
                valorPerc: 0.21
            },
            {
                nomeI: "Março",
                valorIrr: 17.0,
                valorTempAmb: 15.9,
                valorTempAgua: 16.6,
                valorPrinc: 65,
                valorPerc: 0.21
            },
            {
                nomeI: "Abril",
                valorIrr: 18.9,
                valorTempAmb: 16.3,
                valorTempAgua: 17.1,
                valorPrinc: 51,
                valorPerc: 0.16
            },
            {
                nomeI: "Maio",
                valorIrr: 21.3,
                valorTempAmb: 17.6,
                valorTempAgua: 17.5,
                valorPrinc: 12,
                valorPerc: 0.04
            },
            {
                nomeI: "Junho",
                valorIrr: 21.4,
                valorTempAmb: 19.3,
                valorTempAgua: 18.5,
                valorPrinc: 39,
                valorPerc: 0.11
            },
            {
                nomeI: "Julho",
                valorIrr: 22.3,
                valorTempAmb: 20.9,
                valorTempAgua: 19.0,
                valorPrinc: 90,
                valorPerc: 0.25
            },
            {
                nomeI: "Agosto",
                valorIrr: 20.9,
                valorTempAmb: 21.9,
                valorTempAgua: 19.5,
                valorPrinc: 121,
                valorPerc: 0.34
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.8,
                valorTempAmb: 21.7,
                valorTempAgua: 19.4,
                valorPrinc: 111,
                valorPerc: 0.31
            },
            {
                nomeI: "Outubro",
                valorIrr: 14.0,
                valorTempAmb: 21.5,
                valorTempAgua: 18.9,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Novembro",
                valorIrr: 10.0,
                valorTempAmb: 18.3,
                valorTempAgua: 17.9,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Dezembro",
                valorIrr: 8.1,
                valorTempAmb: 16.4,
                valorTempAgua: 16.9,
                valorPrinc: 50,
                valorPerc: 0.16
            },
            {
                nome: 'GDv',
                valor: 361
            },
            {
                nome: 'GDi',
                valor: 314
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Portalegre",
        latitude: 39,
        go_latitude: 2,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.6,
                valorTempAmb: 8.2,
                valorTempAgua: 11.4,
                valorPrinc: 304,
                valorPerc: 0.19
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.4,
                valorTempAmb: 8.9,
                valorTempAgua: 11.4,
                valorPrinc: 255,
                valorPerc: 0.16
            },
            {
                nomeI: "Março",
                valorIrr: 14.4,
                valorTempAmb: 10.6,
                valorTempAgua: 12.4,
                valorPrinc: 229,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 18.9,
                valorTempAmb: 12.7,
                valorTempAgua: 13.3,
                valorPrinc: 159,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 23.2,
                valorTempAmb: 16.2,
                valorTempAgua: 15.3,
                valorPrinc: 56,
                valorPerc: 0.04
            },
            {
                nomeI: "Junho",
                valorIrr: 25.8,
                valorTempAmb: 19.9,
                valorTempAgua: 16.8,
                valorPrinc: 57,
                valorPerc: 0.13
            },
            {
                nomeI: "Julho",
                valorIrr: 25.8,
                valorTempAmb: 23.0,
                valorTempAgua: 18.8,
                valorPrinc: 155,
                valorPerc: 0.36
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.8,
                valorTempAmb: 22.6,
                valorTempAgua: 18.2,
                valorPrinc: 143,
                valorPerc: 0.33
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.1,
                valorTempAmb: 20.4,
                valorTempAgua: 17.3,
                valorPrinc: 72,
                valorPerc: 0.17
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.7,
                valorTempAmb: 15.8,
                valorTempAgua: 14.7,
                valorPrinc: 68,
                valorPerc: 0.04
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.7,
                valorTempAmb: 11.4,
                valorTempAgua: 12.7,
                valorPrinc: 198,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.8,
                valorTempAmb: 8.5,
                valorTempAgua: 11.2,
                valorPrinc: 295,
                valorPerc: 0.19
            },
            {
                nome: 'GDv',
                valor: 427
            },
            {
                nome: 'GDi',
                valor: 1564
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Porto",
        latitude: 41,
        go_latitude: 4,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.0,
                valorTempAmb: 8.1,
                valorTempAgua: 10.8,
                valorPrinc: 307,
                valorPerc: 0.18
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.8,
                valorTempAmb: 8.7,
                valorTempAgua: 10.8,
                valorPrinc: 260,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 12.2,
                valorTempAmb: 10.4,
                valorTempAgua: 11.8,
                valorPrinc: 236,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 17.3,
                valorTempAmb: 12.1,
                valorTempAgua: 12.8,
                valorPrinc: 177,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 20.3,
                valorTempAmb: 14.8,
                valorTempAgua: 13.7,
                valorPrinc: 99,
                valorPerc: 0.06
            },
            {
                nomeI: "Junho",
                valorIrr: 22.3,
                valorTempAmb: 17.7,
                valorTempAgua: 15.2,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Julho",
                valorIrr: 24.1,
                valorTempAmb: 19.8,
                valorTempAgua: 16.2,
                valorPrinc: 56,
                valorPerc: 0.52
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.6,
                valorTempAmb: 19.5,
                valorTempAgua: 16.1,
                valorPrinc: 47,
                valorPerc: 0.43
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.5,
                valorTempAmb: 18.2,
                valorTempAgua: 15.6,
                valorPrinc: 6,
                valorPerc: 0.06
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.0,
                valorTempAmb: 15.1,
                valorTempAgua: 14.1,
                valorPrinc: 90,
                valorPerc: 0.05
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.3,
                valorTempAmb: 10.7,
                valorTempAgua: 11.6,
                valorPrinc: 219,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.6,
                valorTempAmb: 8.3,
                valorTempAgua: 10.6,
                valorPrinc: 301,
                valorPerc: 0.18
            },
            {
                nome: 'GDv',
                valor: 108
            },
            {
                nome: 'GDi',
                valor: 1689
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Santarém",
        latitude: 39,
        go_latitude: 2,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.2,
                valorTempAmb: 10.7,
                valorTempAgua: 13.1,
                valorPrinc: 242,
                valorPerc: 0.22
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.2,
                valorTempAmb: 11.7,
                valorTempAgua: 13.6,
                valorPrinc: 193,
                valorPerc: 0.17
            },
            {
                nomeI: "Março",
                valorIrr: 13.5,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1,
                valorPrinc: 164,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 18.6,
                valorTempAmb: 14.7,
                valorTempAgua: 15.1,
                valorPrinc: 99,
                valorPerc: 0.09
            },
            {
                nomeI: "Maio",
                valorIrr: 22.6,
                valorTempAmb: 17.4,
                valorTempAgua: 16.5,
                valorPrinc: 16,
                valorPerc: 0.01
            },
            {
                nomeI: "Junho",
                valorIrr: 25.2,
                valorTempAmb: 19.8,
                valorTempAgua: 18.0,
                valorPrinc: 72,
                valorPerc: 0.15
            },
            {
                nomeI: "Julho",
                valorIrr: 27.0,
                valorTempAmb: 22.4,
                valorTempAgua: 19.0,
                valorPrinc: 152,
                valorPerc: 0.32
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.8,
                valorTempAmb: 22.6,
                valorTempAgua: 19.5,
                valorPrinc: 155,
                valorPerc: 0.32
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.5,
                valorTempAmb: 21.2,
                valorTempAgua: 18.5,
                valorPrinc: 102,
                valorPerc: 0.21
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.4,
                valorTempAmb: 18.0,
                valorTempAgua: 16.4,
                valorPrinc: 6,
                valorPerc: 0.01
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.5,
                valorTempAmb: 13.6,
                valorTempAgua: 14.4,
                valorPrinc: 150,
                valorPerc: 0.14
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.8,
                valorTempAmb: 10.8,
                valorTempAgua: 12.9,
                valorPrinc: 239,
                valorPerc: 0.22
            },
            {
                nome: 'GDv',
                valor: 481
            },
            {
                nome: 'GDi',
                valor: 1109
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Setúbal",
        latitude: 39,
        go_latitude: 2,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.4,
                valorTempAmb: 10.7,
                valorTempAgua: 13.1,
                valorPrinc: 226,
                valorPerc: 0.22
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.4,
                valorTempAmb: 11.7,
                valorTempAgua: 13.6,
                valorPrinc: 176,
                valorPerc: 0.17
            },
            {
                nomeI: "Março",
                valorIrr: 13.8,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1,
                valorPrinc: 158,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 19.0,
                valorTempAmb: 14.7,
                valorTempAgua: 15.5,
                valorPrinc: 99,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 23.3,
                valorTempAmb: 17.4,
                valorTempAgua: 16.5,
                valorPrinc: 19,
                valorPerc: 0.02
            },
            {
                nomeI: "Junho",
                valorIrr: 26.0,
                valorTempAmb: 19.8,
                valorTempAgua: 17.5,
                valorPrinc: 54,
                valorPerc: 0.13
            },
            {
                nomeI: "Julho",
                valorIrr: 27.3,
                valorTempAmb: 22.4,
                valorTempAgua: 19.0,
                valorPrinc: 136,
                valorPerc: 0.32
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.9,
                valorTempAmb: 22.6,
                valorTempAgua: 19.0,
                valorPrinc: 143,
                valorPerc: 0.33
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.0,
                valorTempAmb: 21.2,
                valorTempAgua: 18.5,
                valorPrinc: 96,
                valorPerc: 0.22
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.7,
                valorTempAmb: 18.0,
                valorTempAgua: 17.0,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.8,
                valorTempAmb: 13.6,
                valorTempAgua: 14.4,
                valorPrinc: 132,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.1,
                valorTempAmb: 10.8,
                valorTempAgua: 12.9,
                valorPrinc: 223,
                valorPerc: 0.22
            },
            {
                nome: 'GDv',
                valor: 429
            },
            {
                nome: 'GDi',
                valor: 1034
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Viana do Castelo",
        latitude: 41,
        go_latitude: 4,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 9.6,
                valorTempAgua: 11.8,
                valorPrinc: 260,
                valorPerc: 0.19
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.5,
                valorTempAmb: 10.3,
                valorTempAgua: 12.3,
                valorPrinc: 216,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 12.6,
                valorTempAmb: 12.3,
                valorTempAgua: 12.8,
                valorPrinc: 208,
                valorPerc: 0.15
            },
            {
                nomeI: "Abril",
                valorIrr: 17.0,
                valorTempAmb: 13.2,
                valorTempAgua: 13.8,
                valorPrinc: 144,
                valorPerc: 0.10
            },
            {
                nomeI: "Maio",
                valorIrr: 19.9,
                valorTempAmb: 15.4,
                valorTempAgua: 14.8,
                valorPrinc: 81,
                valorPerc: 0.06
            },
            {
                nomeI: "Junho",
                valorIrr: 22.8,
                valorTempAmb: 18.6,
                valorTempAgua: 16.2,
                valorPrinc: 18,
                valorPerc: 0.09
            },
            {
                nomeI: "Julho",
                valorIrr: 23.6,
                valorTempAmb: 20.6,
                valorTempAgua: 17.2,
                valorPrinc: 81,
                valorPerc: 0.41
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.2,
                valorTempAmb: 20.2,
                valorTempAgua: 17.2,
                valorPrinc: 68,
                valorPerc: 0.35
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.3,
                valorTempAmb: 19.0,
                valorTempAgua: 16.7,
                valorPrinc: 30,
                valorPerc: 0.15
            },
            {
                nomeI: "Outubro",
                valorIrr: 10.7,
                valorTempAmb: 15.9,
                valorTempAgua: 14.7,
                valorPrinc: 65,
                valorPerc: 0.05
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.0,
                valorTempAmb: 12.1,
                valorTempAgua: 13.2,
                valorPrinc: 177,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.3,
                valorTempAmb: 10.0,
                valorTempAgua: 12.2,
                valorPrinc: 248,
                valorPerc: 0.18
            },
            {
                nome: 'GDv',
                valor: 197
            },
            {
                nome: 'GDi',
                valor: 1398
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Vila Real",
        latitude: 41,
        go_latitude: 4,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 6.9,
                valorTempAgua: 9.9,
                valorPrinc: 344,
                valorPerc: 0.19
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.9,
                valorTempAmb: 8.0,
                valorTempAgua: 10.9,
                valorPrinc: 280,
                valorPerc: 0.16
            },
            {
                nomeI: "Março",
                valorIrr: 12.4,
                valorTempAmb: 10.2,
                valorTempAgua: 11.9,
                valorPrinc: 242,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 17.4,
                valorTempAmb: 12.4,
                valorTempAgua: 12.9,
                valorPrinc: 168,
                valorPerc: 0.09
            },
            {
                nomeI: "Maio",
                valorIrr: 20.7,
                valorTempAmb: 15.6,
                valorTempAgua: 14.4,
                valorPrinc: 74,
                valorPerc: 0.04
            },
            {
                nomeI: "Junho",
                valorIrr: 23.3,
                valorTempAmb: 19.3,
                valorTempAgua: 16.4,
                valorPrinc: 39,
                valorPerc: 0.12
            },
            {
                nomeI: "Julho",
                valorIrr: 24.6,
                valorTempAmb: 22.0,
                valorTempAgua: 17.9,
                valorPrinc: 124,
                valorPerc: 0.40
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.2,
                valorTempAmb: 21.6,
                valorTempAgua: 17.3,
                valorPrinc: 112,
                valorPerc: 0.40
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.0,
                valorTempAmb: 19.3,
                valorTempAgua: 16.3,
                valorPrinc: 39,
                valorPerc: 0.12
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.1,
                valorTempAmb: 14.9,
                valorTempAgua: 13.8,
                valorPrinc: 96,
                valorPerc: 0.05
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.3,
                valorTempAmb: 9.8,
                valorTempAgua: 11.3,
                valorPrinc: 246,
                valorPerc: 0.14
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.5,
                valorTempAmb: 7.1,
                valorTempAgua: 10.3,
                valorPrinc: 338,
                valorPerc: 0.19
            },
            {
                nome: 'GDv',
                valor: 314
            },
            {
                nome: 'GDi',
                valor: 1788
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Viseu",
        latitude: 40,
        go_latitude: 3,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.3,
                valorTempAmb: 5.9,
                valorTempAgua: 8.6,
                valorPrinc: 375,
                valorPerc: 0.17
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.2,
                valorTempAmb: 6.5,
                valorTempAgua: 9.1,
                valorPrinc: 322,
                valorPerc: 0.15
            },
            {
                nomeI: "Março",
                valorIrr: 12.5,
                valorTempAmb: 8.3,
                valorTempAgua: 10.1,
                valorPrinc: 301,
                valorPerc: 0.14
            },
            {
                nomeI: "Abril",
                valorIrr: 17.8,
                valorTempAmb: 10.2,
                valorTempAgua: 11.1,
                valorPrinc: 234,
                valorPerc: 0.11
            },
            {
                nomeI: "Maio",
                valorIrr: 21.1,
                valorTempAmb: 13.4,
                valorTempAgua: 12.6,
                valorPrinc: 143,
                valorPerc: 0.07
            },
            {
                nomeI: "Junho",
                valorIrr: 23.1,
                valorTempAmb: 17.0,
                valorTempAgua: 14.6,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Julho",
                valorIrr: 25.4,
                valorTempAmb: 20.3,
                valorTempAgua: 16.1,
                valorPrinc: 71,
                valorPerc: 0.52
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.9,
                valorTempAmb: 20.1,
                valorTempAgua: 16.1,
                valorPrinc: 65,
                valorPerc: 0.48
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.2,
                valorTempAmb: 17.9,
                valorTempAgua: 14.5,
                valorPrinc: 0,
                valorPerc: 0
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.5,
                valorTempAmb: 13.8,
                valorTempAgua: 12.5,
                valorPrinc: 130,
                valorPerc: 0.06
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.6,
                valorTempAmb: 8.6,
                valorTempAgua: 10.0,
                valorPrinc: 282,
                valorPerc: 0.13
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.9,
                valorTempAmb: 6.2,
                valorTempAgua: 9.0,
                valorPrinc: 366,
                valorPerc: 0.17
            },
            {
                nome: 'GDv',
                valor: 136
            },
            {
                nome: 'GDi',
                valor: 2152
            }
        ]
    }
];

var correcao_inclinacao = [
    {
        latitude: 32,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.26
            },
            {
                nome: "Fevereiro",
                valor: 1.19
            },
            {
                nome: "Março",
                valor: 1.10
            },
            {
                nome: "Abril",
                valor: 1.01
            },
            {
                nome: "Maio",
                valor: 0.95
            },
            {
                nome: "Junho",
                valor: 0.92
            },
            {
                nome: "Julho",
                valor: 0.95
            },
            {
                nome: "Agosto",
                valor: 1.02
            },
            {
                nome: "Setembro",
                valor: 1.13
            },
            {
                nome: "Outubro",
                valor: 1.24
            },
            {
                nome: "Novembro",
                valor: 1.32
            },
            {
                nome: "Dezembro",
                valor: 1.31
            }
        ]
    },
    {
        latitude: 38,
        go_latitude: 1,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.34
            },
            {
                nome: "Fevereiro",
                valor: 1.25
            },
            {
                nome: "Março",
                valor: 1.15
            },
            {
                nome: "Abril",
                valor: 1.04
            },
            {
                nome: "Maio",
                valor: 0.96
            },
            {
                nome: "Junho",
                valor: 0.94
            },
            {
                nome: "Julho",
                valor: 0.97
            },
            {
                nome: "Agosto",
                valor: 1.05
            },
            {
                nome: "Setembro",
                valor: 1.19
            },
            {
                nome: "Outubro",
                valor: 1.34
            },
            {
                nome: "Novembro",
                valor: 1.43
            },
            {
                nome: "Dezembro",
                valor: 1.42
            }
        ]
    },
    {
        latitude: 39,
        go_latitude: 2,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.35
            },
            {
                nome: "Fevereiro",
                valor: 1.27
            },
            {
                nome: "Março",
                valor: 1.16
            },
            {
                nome: "Abril",
                valor: 1.05
            },
            {
                nome: "Maio",
                valor: 0.97
            },
            {
                nome: "Junho",
                valor: 0.94
            },
            {
                nome: "Julho",
                valor: 0.98
            },
            {
                nome: "Agosto",
                valor: 1.06
            },
            {
                nome: "Setembro",
                valor: 1.20
            },
            {
                nome: "Outubro",
                valor: 1.35
            },
            {
                nome: "Novembro",
                valor: 1.45
            },
            {
                nome: "Dezembro",
                valor: 1.43
            }
        ]
    },
    {
        latitude: 40,
        go_latitude: 3,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.37
            },
            {
                nome: "Fevereiro",
                valor: 1.28
            },
            {
                nome: "Março",
                valor: 1.17
            },
            {
                nome: "Abril",
                valor: 1.06
            },
            {
                nome: "Maio",
                valor: 0.98
            },
            {
                nome: "Junho",
                valor: 0.95
            },
            {
                nome: "Julho",
                valor: 0.98
            },
            {
                nome: "Agosto",
                valor: 1.07
            },
            {
                nome: "Setembro",
                valor: 1.21
            },
            {
                nome: "Outubro",
                valor: 1.37
            },
            {
                nome: "Novembro",
                valor: 1.47
            },
            {
                nome: "Dezembro",
                valor: 1.45
            }
        ]
    },
    {
        latitude: 41,
        go_latitude: 4,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.38
            },
            {
                nome: "Fevereiro",
                valor: 1.29
            },
            {
                nome: "Março",
                valor: 1.18
            },
            {
                nome: "Abril",
                valor: 1.07
            },
            {
                nome: "Maio",
                valor: 0.99
            },
            {
                nome: "Junho",
                valor: 0.96
            },
            {
                nome: "Julho",
                valor: 0.99
            },
            {
                nome: "Agosto",
                valor: 1.08
            },
            {
                nome: "Setembro",
                valor: 1.22
            },
            {
                nome: "Outubro",
                valor: 1.38
            },
            {
                nome: "Novembro",
                valor: 1.49
            },
            {
                nome: "Dezembro",
                valor: 1.47
            }
        ]
    }
];

var idades = [
    {
        nome: "< 10 anos",
        valorMax: 10
    },
    {
        nome: "> 20 anos",
        valorMin: 20
    },
    {
        nome: "10 a 20 anos",
        valorMin: 10,
        valorMax: 20
    }
];