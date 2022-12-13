export const enUS = {
  list: {
    createdAt: "Created at",
    incomes: "Incomes",
    expenditures: "Expenditures",
  },
  transaction: {
    type: {
      name: "Type",
      income: "Income",
      expenditure: "Expenditure",
    },
    description: "Description",
    value: "Value",
    status: {
      name: "Status",
      pending: "Pending",
      done: "Done",
    },
    year: "Year",
    month: "Month",
    expirationDay: "Expiration day",
    repeat: "Repeat",
    options: {
      edit: "Edit",
      copy: "Copy",
      delete: "Delete",
      onlyThis: "Only this one",
      thisAndFuture: "This and future ones",
      save: "Save",
      cancel: "Cancel",
      confirmDel: "Confirm to delete",
    },
  },
  totals: {
    lastMonth: "Last Month",
    lastMonthHelp: "This is what was left from last month.",
    estimation: "Estimation",
    estimationHelp: "This is the resulting balance of this month: (INCOMES - EXPENDITURES).",
    balance: "Balance",
    balanceHelp: "This is the ammount of money you shoud have right now.",
  },
  input: {
    repeatFor: "Repeat for",
    months: "month(s)",
    save: "Save",
    cancel: "Calcel",
    newTransaction: "New Transaction",
  },
  months: {
    jan: {abrev: "JAN", full: "January"},
    feb: {abrev: "FEB", full: "February"},
    mar: {abrev: "MAR", full: "March"},
    apr: {abrev: "APR", full: "April"},
    may: {abrev: "MAY", full: "May"},
    jun: {abrev: "JUN", full: "June"},
    jul: {abrev: "JUL", full: "July"},
    aug: {abrev: "AUG", full: "August"},
    sep: {abrev: "SEP", full: "September"},
    oct: {abrev: "OCT", full: "October"},
    nov: {abrev: "NOV", full: "November"},
    dec: {abrev: "DEC", full: "December"},
  },
  auth: {
    login: "Login",
    register: "Register",
    logout: "Logout",
    name: "Name",
    email: "Email",
    password: "Password",
    yourName: "Your Name",
    yourEmail: "your@email.com",
    registerNewUser: "Register new user",
    loginRegisteredUser: "Login registered user",
    invalidNameMessage: "You must enter your name",
    invalidEmailMessage: "You must enter a valid email address.",
    invalidPasswordMessage: "You must enter a valid password.",
    checkFieldsAbove: "Check the fields above and try again.",
    userLoggedIn: "User logged in",
    authFailure: "Authentication failure",
  },
  deleteUser: {
    userDeleted: "User deleted successfully",
    deleteUserAccount: "Delete user account",
    warning: "All of your data will be permanently deleted.",
    instructions: "Enter your email and password below and check the confirmation checkbox to proceed.",
    confirmationConsent: "I confirm this permanent deletion.",
    confirm: "Confirm",
  },
  editUser: {
    userEdited: "User updated.",
    editUserAccount: "Edit user account",
    instructions: "Select what you want to update",
    save: "Save",
  },
  help: {
    help: "Help",
    title: "Help",
    intro: "This app was made to be simple and to make it very easy to have control over financial resources.",
    sub01: {
      title: "Add, remove or edit transactions",
      text: "Click on the plus icon on the left top corner of the list to add a new transaction.\
        For deleting or editing a transaction, click on the arrow on the left side of the item on the list\
        and then select DELETE and confirm the action.\
        By clicking on the arrow on the left of the item, some options are shown and it is also possible to edit\
        or copy a transaction.\
        A transaction with future repetitions will show two options when editing or deleting it:\
        ONLY THIS and THIS AND FUTURE. These options will be applied when the action is confirmed.\
        When a transaction with future repetitions is edited with the ONLY THIS option, it will no longer be\
        considered to have repetitions while the others will remain intact.",
    },
    sub02: {
      title: "Transactions colors",
      text: "These hightlight colors are there to ask for attention.\
        YELLOW: when a transaction's expiration day is 3, 4 or 5 days ahead of the present date.\
        RED: when the transaction is already expired or will expire in 1 or 2 days.",
    },
  },
  downloadData: {
    title: "Download Data",
    text: "All transactions can be downloaded as a single file.",
    download: "Download",
  },
  settings: {
    title: "Settings",
    theme: "Theme",
    auto: "Auto",
    light: "Light",
    dark: "Dark",
    editAccount: "Edit Account",
    deleteAccount: "Delete Account",
    downloadData: "Download Data",
    language: "Language",
    english: "English",
    brazilian: "Português BR",
    currency: "Currency",
    real: "Real",
    dolar: "American Dolar",
  },
  userAccess: {
    help: "Help",
    settings: "Settings",
    logout: "Logout",
  }
};
