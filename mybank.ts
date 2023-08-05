// mybank.ts
import inquirer from 'inquirer';

class Account {
  private accountNumber: string;
  private balance: number;

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
    } else {
      console.log('Insufficient balance.');
    }
  }

  getBalance(): number {
    return this.balance;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }
}

class MyBankConsoleApp {
  private accounts: Account[] = [];

  private async openAccount(): Promise<void> {
    const { accountNumber, initialBalance } = await inquirer.prompt([
      {
        type: 'input',
        name: 'accountNumber',
        message: 'Enter the account number:',
      },
      {
        type: 'number',
        name: 'initialBalance',
        message: 'Enter the initial balance:',
      },
    ]);

    const account = new Account(accountNumber, initialBalance);
    this.accounts.push(account);

    console.log('Account opened successfully.');
  }

  private async deposit(): Promise<void> {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        type: 'input',
        name: 'accountNumber',
        message: 'Enter the account number:',
      },
      {
        type: 'number',
        name: 'amount',
        message: 'Enter the amount to deposit:',
      },
    ]);

    const account = this.findAccount(accountNumber);
    if (account) {
      account.deposit(amount);
      console.log(`Deposited ${amount} to account ${accountNumber}. New balance: ${account.getBalance()}`);
    } else {
      console.log('Account not found.');
    }
  }

  private async withdraw(): Promise<void> {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        type: 'input',
        name: 'accountNumber',
        message: 'Enter the account number:',
      },
      {
        type: 'number',
        name: 'amount',
        message: 'Enter the amount to withdraw:',
      },
    ]);

    const account = this.findAccount(accountNumber);
    if (account) {
      account.withdraw(amount);
      console.log(`Withdrawn ${amount} from account ${accountNumber}. New balance: ${account.getBalance()}`);
    } else {
      console.log('Account not found.');
    }
  }

  private findAccount(accountNumber: string): Account | undefined {
    return this.accounts.find((account) => account.getAccountNumber() === accountNumber);
  }

  public async startApp(): Promise<void> {
    console.log('Welcome to MyBank Console App!');

    while (true) {
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Open Account', 'Deposit', 'Withdraw', 'Exit'],
      });

      switch (action) {
        case 'Open Account':
          await this.openAccount();
          break;
        case 'Deposit':
          await this.deposit();
          break;
        case 'Withdraw':
          await this.withdraw();
          break;
        case 'Exit':
          console.log('Goodbye!');
          return;
      }
    }
  }
}

// Entry point
const myBankApp = new MyBankConsoleApp();
myBankApp.startApp();
