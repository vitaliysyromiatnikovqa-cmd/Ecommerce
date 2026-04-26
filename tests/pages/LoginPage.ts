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
    return this.page.getByLabel('Email');
  }

  get passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In' });
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

  get formErrorBanner(): Locator {
    return this.page.locator('.form-error-banner');
  }

  async openLoginPage() {
    await this.goto(this.url);
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.submit();
  }

  async expectPageVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
