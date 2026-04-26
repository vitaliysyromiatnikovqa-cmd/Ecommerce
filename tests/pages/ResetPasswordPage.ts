import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResetPasswordPage extends BasePage {
  readonly url = '/reset-password';

  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Set a new password and jump back into GameReason',
    });
  }

  get tokenInput(): Locator {
    return this.page.getByLabel('Reset Token');
  }

  get passwordInput(): Locator {
    return this.page.getByLabel('New Password');
  }

  get confirmPasswordInput(): Locator {
    return this.page.getByLabel('Confirm New Password');
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Reset Password' });
  }

  get requestAnotherTokenLink(): Locator {
    return this.page.getByRole('link', { name: 'Request Another Token' });
  }

  get backToSignInLink(): Locator {
    return this.page.getByRole('link', { name: 'Back to Sign In' });
  }

  get errorMessages(): Locator {
    return this.page.locator('.error-text');
  }

  get formErrorBanner(): Locator {
    return this.page.locator('.form-error-banner');
  }

  async openResetPasswordPage() {
    await this.goto(this.url);
  }

  async openResetPasswordPageWithToken(token: string) {
    await this.goto(`${this.url}?token=${encodeURIComponent(token)}`);
  }

  async fillResetForm(token: string, password: string, confirmPassword: string) {
    await this.tokenInput.fill(token);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectPageVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
