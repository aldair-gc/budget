export const ptBR = {
  list: {
    createdAt: "Criação",
    incomes: "Rendimentos",
    expenditures: "Despesas",
  },
  transaction: {
    type: {
      name: "Tipo",
      income: "Rendimento",
      expenditure: "Despesa",
    },
    description: "Descrição",
    value: "Valor",
    status: {
      name: "Situação",
      pending: "Pendente",
      done: "Concluído",
    },
    year: "Ano",
    month: "Mês",
    expirationDay: "Vencimento",
    repeat: "Repetição",
    options: {
      edit: "Editar",
      copy: "Copiar",
      delete: "Excluir",
      onlyThis: "Somente este",
      thisAndFuture: "Este e os próximos",
      save: "Salvar",
      cancel: "Cancelar",
      confirmDel: "Excluir",
    },
  },
  totals: {
    balance: "Saldo atual",
    balanceHelp: "Este é o valor que você deve ter neste momento.",
    estimation: "Total do mês",
    estimationHelp: "Este é o resultado deste mês (RENDIMENTOS - DESPESAS).",
    lastMonth: "Resultado final",
    lastMonthHelp: "Soma dos resultados do mês anterior e do atual.",
  },
  input: {
    repeatFor: "Repetir por",
    months: "mês(es)",
    save: "Salvar",
    cancel: "Calcelar",
    newTransaction: "Nova Transação",
  },
  months: {
    jan: {abrev: "JAN", full: "Janeiro"},
    feb: {abrev: "FEV", full: "Fevereiro"},
    mar: {abrev: "MAR", full: "Março"},
    apr: {abrev: "ABR", full: "Abril"},
    may: {abrev: "MAI", full: "Maio"},
    jun: {abrev: "JUN", full: "Junho"},
    jul: {abrev: "JUL", full: "Julho"},
    aug: {abrev: "AGO", full: "Agosto"},
    sep: {abrev: "SET", full: "Setembro"},
    oct: {abrev: "OUT", full: "Outubro"},
    nov: {abrev: "NOV", full: "Novembro"},
    dec: {abrev: "DEZ", full: "Dezembro"},
  },
  auth: {
    login: "Entrar",
    register: "Registrar",
    logout: "Sair",
    name: "Nome",
    email: "Email",
    password: "Senha",
    yourName: "Seu Nome",
    yourEmail: "seu@email.com",
    registerNewUser: "Registrar novo usuário",
    loginRegisteredUser: "Entrar com usuário registrado",
    invalidNameMessage: "Você deve digitar seu nome.",
    invalidEmailMessage: "Você deve digitar um endereço de email válido.",
    invalidPasswordMessage: "Você deve digitar uma senha válida.",
    checkFieldsAbove: "Verifique os campos acima e tente novamente.",
    userLoggedIn: "Usuário entrou.",
    authFailure: "Falha de autenticação.",
  },
  deleteUser: {
    userDeleted: "Usuário excluído com sucesso.",
    deleteUserAccount: "Excluir conta de usuário.",
    warning: "Todos os seus dados serão permanentemente excluídos.",
    instructions: "Confirme com seu email e senha abaixo e marque a caixa de confirmação para proceder.",
    confirmationConsent: "Eu confirmo esta exclusão permanente.",
    confirm: "Confirmar",
  },
  editUser: {
    userEdited: "Usuário atualizado.",
    editUserAccount: "Editar conta de usuário",
    instructions: "Selecione o que você deseja atualiar",
    save: "Salvar",
  },
  help: {
    help: "Ajuda",
    title: "Ajuda",
    intro: "Este aplicativo foi feito para ser um jeito simples e fácil de ter controle sobre suas finanças.",
    sub01: {
      title: "Adicionar, remover ou editar transações",
      text: "Clique no + no canto superior esquerdo da lista para adicionar uma trancação nova.\
        Para editar ou excluir uma transação, clique na seta no lado esquerdo do item na lista\
        e então selecione EXCLUIR e confirma em seguida.\
        Ao clicar na seta ao lado em um item, algumas opções são exibidas (editar, copiar e excluir).\
        Uma transação com futuras repetições mostrará duas opções ao ser editada ou excluída:\
        SOMENTE ESTE e ESTE E OS PRÓXIMOS. Esta opção será aplicada quando a ação for confirmada.\
        Quando uma transação com futuras repetições é editada na opção SOMENTE ESTE, ela deixará de ser\
        considerada parte da sequência de repetições da qual fazia parte enquanto os outros permanecerão\
        inalterados.",
    },
    sub02: {
      title: "Cores das transações",
      text: "Estas cores destacam o item para chamar sua atenção.\
        VERMELHO: quando a tracação já está vencida ou vence hoje, em 1 ou 2 dias.\
        AMARELO: quando o dia de vencimento está a 3, 4 ou 5 dias do dia atual.",
    },
  },
  downloadData: {
    title: "Baixar seus dados",
    text: "Todas as suas transações podem ser baixadas em um único arquivo.",
    download: "Baixar",
  },
  settings: {
    title: "Ajustes",
    theme: "Tema",
    auto: "Automático",
    light: "Claro",
    dark: "Escuro",
    editAccount: "Editar Conta",
    deleteAccount: "Delete Conta",
    downloadData: "Baixar Dados",
    language: "Idioma",
    english: "English",
    brazilian: "Português BR",
    currency: "Moeda",
    real: "Real",
    dolar: "Dólar Americano",
  },
  userAccess: {
    help: "Ajuda",
    settings: "Ajustes",
    logout: "Sair",
  }
};
