import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly url = '/login';

  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Access your GameReason account' });
  }

  get emailInput(): Locator {
    return this.page.getByTestId('login-email-input');
  }

  get passwordInput(): Locator {
    return this.page.getByTestId('login-password-input')
  }

  get submitButton(): Locator {
    return this.page.getByTestId('login-submit-button');
  }

  get forgotPasswordLink(): Locator {
    return this.page.getByRole('link', { name: 'Forgot Password' });
  }

  get createAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Create Account' });
  }

  get errorMessages(): Locator {
    return this.page.locator('.error-text');
  }
get emailError(): Locator {
  return this.page.getByText('Email is required');
}
get emailErrorDomain(): Locator {
  return this.page.getByText('Invalid email format');
}
get emailSymbolError(): Locator {
  return this.page.getByText('Email must contain @');
}

get passwordError(): Locator {
  return this.page.getByText('Password is required');
}
  get formErrorBanner(): Locator {
    return this.page.locator('.form-error-banner');
  }

  get seePasswordButton(): Locator {
    return this.page.getByTestId('login-password-toggle');
  }

  async openLoginPage() {
    await this.goto(this.url);
  }


  async submit() {
    await this.submitButton.click();
  }

 
async expectRequiredErrors() {
  await expect(this.errorMessages).toHaveText([
    'Email is required',
    'Password is required',
  ]);
}
}
