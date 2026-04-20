import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly url = '/register';
  
  constructor(page: Page) {
    super(page);
    
  }

  // --- Локатори ---
  get emailInput(): Locator {
    return this.page.getByTestId('register-email-input')
  }

  get passwordInput(): Locator {
    return this.page.getByTestId('register-password-input')

  }
   get confirmPasswordInput(): Locator {
    return this.page.getByTestId('register-confirm-password-input')

  }
 get submitButton(): Locator {
    return this.page.getByTestId('register-submit-button')
              
  }        
  get toolTip(): Locator {
    return this.page.getByTestId('register-password-rules-trigger')
              
  } 
  get toolTipsSpan(): Locator {
    return this.page.getByTestId('register-password-rules-tooltip')
              
  }    
  get signInButton (): Locator {
    return this.page.getByTestId('register-sign-in-link')
              
  }   

  get errorMessages(): Locator {
  return this.page.locator('.error-text');
}

get emailError(): Locator {
  return this.page.getByText('Email is required');
}

get passwordError(): Locator {
  return this.page.getByText('Password is required');
}

get confirmPasswordError(): Locator {
  return this.page.getByText('Confirm password is required');
}
  // --- Дії ---
  async login(email: string, password: string) {
    // дописуєш сам
  }

  async openPageRegister() {
    return this.page.goto(this.url)
  }
  // --- Перевірки ---
  async expectPageVisible() {
    // дописуєш сам
  }
  
async expectRequiredErrors() {
  await expect(this.errorMessages).toHaveText([
    'Email is required',
    'Password is required',
    'Confirm password is required',
  ]);
}
async expectPasswordToolTip() {
  await expect(this.toolTipsSpan).toHaveText([
      "Password rulesAt least 8 charactersAt least 1 uppercase English letterAt least 1 digitAt least 1 special characterEnglish letters, digits, and special characters only"
    ]);
}
}