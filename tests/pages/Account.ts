import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly url = '/account';
  readonly emailInput;
  readonly saveProfileButton;
  readonly signOutButton;
  readonly deleteProfileButton;
  readonly deleteModal;
  readonly deleteModalConfirmButton;
  readonly deleteModalCancelButton;

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByTestId('account-email-input');
    this.saveProfileButton = this.page.getByTestId('account-save-button');
    this.signOutButton = this.page.getByTestId('account-sign-out-button');
    this.deleteProfileButton = this.page.getByTestId('account-delete-button');
    this.deleteModal = this.page.getByTestId('account-delete-modal');
    this.deleteModalConfirmButton = this.page.getByTestId('account-delete-confirm-button');
    this.deleteModalCancelButton = this.page.getByTestId('account-delete-cancel-button');
  }

  async openAccountPage() { 
    return this.page.goto(this.url);
  }

  async SaveProfile() {
    return this.saveProfileButton;
  }

  async DeleteProfileButton() {
    await this.deleteProfileButton.click();
  }

  async confirmDeleteAccount() {
    await this.deleteModalConfirmButton.click();
  }

  async cancelDeleteAccount() {
    await this.deleteModalCancelButton.click();
  }

  async expectPageVisible() {
    await expect(this.saveProfileButton).toBeVisible();
  }

  async saveProfileText() {
    await expect(this.saveProfileButton).toBeVisible();
  }

  async deleteButtonText() {
    await expect(this.deleteProfileButton).toBeVisible();
  }
}
