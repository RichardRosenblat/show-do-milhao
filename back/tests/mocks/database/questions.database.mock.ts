import { ObjectId } from 'bson';

interface databaseQuestion {
  _id: ObjectId;
  text: string;
  category: string;
  level: number;
  hint: string;
  answers: {
    text: string;
    isCorrect: boolean;
  }[];
}

export let questionsMockDatabase: databaseQuestion[] = [];

resetMockQuestionsDatabase();

export function resetMockQuestionsDatabase() {
  questionsMockDatabase = [
    {
      _id: new ObjectId(),
      text: 'Quem era o homem mais sedutor do mundo?',
      category: 'conhecimentos gerais',
      level: 1,
      hint: 'apareceu pela primeira vez no drama espanhol',
      answers: [
        {
          text: 'DOM JUAN',
          isCorrect: true,
        },
        {
          text: 'DOM ANTÔNIO',
          isCorrect: false,
        },
        {
          text: 'DOM MARCO',
          isCorrect: false,
        },
        {
          text: 'DOM CARLOS',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual é o naipe do baralho que tem o desenho de coração?',
      category: 'jogos',
      level: 1,
      hint: 'formato de coração',
      answers: [
        {
          text: 'OUROS',
          isCorrect: false,
        },
        {
          text: 'PAUS',
          isCorrect: false,
        },
        {
          text: 'COPAS',
          isCorrect: true,
        },
        {
          text: 'ESPADAS',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual atriz estrelou no filme: “A lagoa azul”?',
      category: 'conhecimentos gerais',
      level: 1,
      hint: 'escudos',
      answers: [
        {
          text: 'ALICIA SILVERSTONE',
          isCorrect: false,
        },
        {
          text: 'BROOKE SHIELDS',
          isCorrect: true,
        },
        {
          text: 'JULIA ROBERTS',
          isCorrect: false,
        },
        {
          text: 'JESSICA LANGE',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual casal foi expulso do Paraíso?',
      category: 'conhecimentos gerais',
      level: 1,
      hint: 'casal que comeu a maça',
      answers: [
        {
          text: 'SANSÃO E DALILA',
          isCorrect: false,
        },
        {
          text: 'JOSÉ E MARIA',
          isCorrect: false,
        },
        {
          text: 'SARA E ABRAÃO',
          isCorrect: false,
        },
        {
          text: 'ADÃO E EVA',
          isCorrect: true,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Segundo os contos, qual animal ao ser beijado se transforma em príncipe?',
      category: 'conhecimentos gerais',
      level: 1,
      hint: 'mora proximo a lagoas',
      answers: [
        {
          text: 'CAVALO',
          isCorrect: false,
        },
        {
          text: 'CÃO',
          isCorrect: false,
        },
        {
          text: 'GATO',
          isCorrect: false,
        },
        {
          text: 'SAPO',
          isCorrect: true,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual é o santo que só acreditou vendo?',
      category: 'conhecimentos gerais',
      level: 2,
      hint: 'duvidou que seu Mestre teria ressuscitado',
      answers: [
        {
          text: 'SANTO ANTÔNIO',
          isCorrect: false,
        },
        {
          text: 'SÃO JUDAS TADEU',
          isCorrect: false,
        },
        {
          text: 'SÃO PEDRO',
          isCorrect: false,
        },
        {
          text: 'SÃO TOMÉ',
          isCorrect: true,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Segundo o romance, que animal era “Moby Dick”?',
      category: 'literatura',
      level: 2,
      hint: 'maior mamífero',
      answers: [
        {
          text: 'TUBARÃO',
          isCorrect: false,
        },
        {
          text: 'GOLFINHO',
          isCorrect: false,
        },
        {
          text: 'POLVO',
          isCorrect: false,
        },
        {
          text: 'BALEIA',
          isCorrect: true,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual é o animal que representa o signo de áries?',
      category: 'conhecimentos gerais',
      level: 2,
      hint: 'é o responsável por coordenar o rebanho',
      answers: [
        {
          text: 'TOURO',
          isCorrect: false,
        },
        {
          text: 'LEÃO',
          isCorrect: false,
        },
        {
          text: 'CARNEIRO',
          isCorrect: true,
        },
        {
          text: 'BODE',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Que animal é o Pateta?',
      category: 'conhecimentos gerais',
      level: 2,
      hint: 'familia dos caninos',
      answers: [
        {
          text: 'CAVALO',
          isCorrect: false,
        },
        {
          text: 'BURRO',
          isCorrect: false,
        },
        {
          text: 'CACHORRO',
          isCorrect: true,
        },
        {
          text: 'RAPOSA',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Em qual cidade está o Cristo Redentor do Corcovado?',
      category: 'conhecimentos gerais',
      level: 2,
      hint: 'recebe o título de Cidade Maravilhosa',
      answers: [
        {
          text: 'RIO DE JANEIRO',
          isCorrect: true,
        },
        {
          text: ' SÃO PAULO',
          isCorrect: false,
        },
        {
          text: ' CURITIBA',
          isCorrect: false,
        },
        {
          text: ' BELO HORIZONTE',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual ator imortalizou o personagem “Zé Bonitinho”?',
      category: 'conhecimentos gerais',
      level: 3,
      hint: 'trabalhou em a praça é nossa',
      answers: [
        {
          text: 'RONI CÓCEGAS',
          isCorrect: false,
        },
        {
          text: 'JORGE LOREDO',
          isCorrect: true,
        },
        {
          text: 'DAVI PINHEIRO',
          isCorrect: false,
        },
        {
          text: 'ARNAUD RODRIGUES',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual a cantora conhecida como “A rainha dos caminhoneiros”?',
      category: 'conhecimentos gerais',
      level: 3,
      hint: 'cantora sertanejo',
      answers: [
        {
          text: ' ROBERTA MIRANDA',
          isCorrect: false,
        },
        {
          text: ' MARIA BETHÂNIA',
          isCorrect: false,
        },
        {
          text: ' SULA MIRANDA',
          isCorrect: true,
        },
        {
          text: ' RITA CADILLAC',
          isCorrect: false,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual é o nome da missa rezada no Natal?',
      category: 'conhecimentos gerais',
      level: 3,
      hint: 'deriva da lenda ancestral segundo a qual à meia-noite do dia 24 de dezembro um animal teria cantado fortemente',
      answers: [
        {
          text: 'CAMPAL',
          isCorrect: false,
        },
        {
          text: 'DO GALO',
          isCorrect: true,
        },
        {
          text: 'DO VATICANO',
          isCorrect: false,
        },
        {
          text: 'DE SÉTIMO DIA',
          isCorrect: true,
        },
      ],
    },

    {
      _id: new ObjectId(),
      text: 'Qual é a orixá conhecida como “A rainha do mar”?',
      category: 'conhecimentos gerais',
      level: 3,
      hint: '(divindade africana) feminino das religiões Candomblé e Umbanda.',
      answers: [
        {
          text: 'MAMÃE OXUM',
          isCorrect: false,
        },
        {
          text: 'IEMANJÁ',
          isCorrect: true,
        },
        {
          text: 'AXÉ',
          isCorrect: false,
        },
        {
          text: ' IANSÃ',
          isCorrect: false,
        },
      ],
    },
  ];
}
