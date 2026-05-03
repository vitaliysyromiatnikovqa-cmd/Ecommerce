import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  readonly url = '/register';

  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.getByTestId('register-email-input');
  }

  get passwordInput(): Locator {
    return this.page.getByTestId('register-password-input');
  }

  get confirmPasswordInput(): Locator {
    return this.page.getByTestId('register-confirm-password-input');
  }

  get submitButton(): Locator {
    return this.page.getByTestId('register-submit-button');
  }

  get toolTip(): Locator {
    return this.page.getByTestId('register-password-rules-trigger');
  }

  get toolTipsSpan(): Locator {
    return this.page.getByTestId('register-password-rules-tooltip');
  }

  get signInButton(): Locator {
    return this.page.getByTestId('register-sign-in-link');
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

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async openPageRegister() {
    return this.page.goto(this.url);
  }

  async expectPageVisible() {
    await expect(this.submitButton).toBeVisible();
  }

  async expectRequiredErrors() {
    await expect(this.errorMessages).toHaveText([
      'Email is required',
      'Password is required',
      'Confirm password is required',
    ]);
  }

  async expectPasswordToolTip() {
    await expect(this.toolTipsSpan).toContainText('Password rules');
    await expect(this.toolTipsSpan).toContainText('At least 8 characters');
    await expect(this.toolTipsSpan).toContainText('At least 1 uppercase English letter');
    await expect(this.toolTipsSpan).toContainText('At least 1 digit');
    await expect(this.toolTipsSpan).toContainText('At least 1 special character');
    await expect(this.toolTipsSpan).toContainText(
      'English letters, digits, and special characters only',
    );
  }
}
