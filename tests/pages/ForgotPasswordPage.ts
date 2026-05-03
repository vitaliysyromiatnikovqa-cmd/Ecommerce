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
    return this.page.getByTestId('forgot-password-email-input');
  }

  get submitButton(): Locator {
    return this.page.getByTestId('forgot-password-submit-button');
  }

  get openResetPasswordLink(): Locator {
    return this.page.getByTestId('forgot-password-open-reset-link');
  }

  get backToSignInLink(): Locator {
    return this.page.getByTestId('forgot-password-back-to-sign-in-link');
  }

  get errorMessages(): Locator {
    return this.page.locator('.error-text');
  }

  get emailError(): Locator {
    return this.page.getByText('Email is required', { exact: true });
  }

  get invalidEmailFormatError(): Locator {
    return this.page.getByText('Invalid email format', { exact: true });
  }

  get emailMustContainAtError(): Locator {
    return this.page.getByText('Email must contain @', { exact: true });
  }

  get formErrorBanner(): Locator {
    return this.page.getByText('If an account with this email exists, a reset token has been generated');
  }

  get statusBanner(): Locator {
    return this.page.locator('.status-banner');
  }

  get resetTokenValue(): Locator {
    return this.statusBanner.locator('strong');
  }

  async openForgotPasswordPage() {
    await this.goto(this.url);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async requestResetToken(email: string) {
    await this.fillEmail(email);
    await this.submit();
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectPageVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async expectRequiredEmailError() {
    await expect(this.errorMessages).toHaveCount(1);
    await expect(this.errorMessages).toHaveText(['Email is required']);
  }

  async expectInvalidEmailFormatError() {
    await expect(this.errorMessages).toHaveCount(1);
    await expect(this.errorMessages).toHaveText(['Invalid email format']);
  }

  async expectEmailMustContainAtError() {
    await expect(this.errorMessages).toHaveCount(1);
    await expect(this.errorMessages).toHaveText(['Email must contain @']);
  }
}
