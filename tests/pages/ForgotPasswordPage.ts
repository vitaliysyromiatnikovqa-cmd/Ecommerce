import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ForgotPasswordPage extends BasePage {
  readonly url = '/forgot-password';

  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Request a reset token for your GameReason account',
    });
  }

  get emailInput(): Locator {
    return this.page.getByLabel('Email');
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Generate Reset Token' });
  }

  get openResetPasswordLink(): Locator {
    return this.page.getByRole('link', { name: 'Open Reset Password' });
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

  get statusBanner(): Locator {
    return this.page.locator('.status-banner');
  }

  async openForgotPasswordPage() {
    await this.goto(this.url);
  }

  async requestResetToken(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

  async expectPageVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }
}
