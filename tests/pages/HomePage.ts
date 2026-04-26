import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly url = '/';

  constructor(page: Page) {
    super(page);
  }

  get mainHeading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Buy your next favorite game, deluxe edition, or soundtrack in one place.',
    });
  }

  get signInLink(): Locator {
    return this.page.getByRole('link', { name: 'Sign In' });
  }

  get createAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Create Account' });
  }

  get openAccountLink(): Locator {
    return this.page.getByRole('link', { name: 'Open Account' });
  }

  get statusBanner(): Locator {
    return this.page.locator('.status-banner');
  }

  async openHomePage() {
    await this.goto(this.url);
  }

  async expectGuestHomeVisible() {
    await expect(this.mainHeading).toBeVisible();
    await expect(this.signInLink).toBeVisible();
    await expect(this.createAccountLink).toBeVisible();
  }

  async expectSignedInHomeVisible() {
    await expect(this.mainHeading).toBeVisible();
    await expect(this.openAccountLink).toBeVisible();
  }
}
