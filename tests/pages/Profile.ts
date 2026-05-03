import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly url = '/account';
  
  constructor(page: Page) {
    super(page);
    
  }

   async ProfilePage() {
    return this.page.goto(this.url)
  }

  // --- Локатори ---

    get myAccountText(): Locator {
    return this.page.getByText('My Account');
  }
  get summaryTab(): Locator {
    return this.page.getByTestId('account-tab-summary')
  }
  get profileTab(): Locator {
    return this.page.getByTestId('account-tab-profile')
  }

get securityTab(): Locator {
    return this.page.getByTestId('account-tab-security')
  }

  
get securityTabSignOutButton(): Locator {
    return this.page.getByTestId('account-sign-out-button')
  }  

get securityTabDeleteButton(): Locator {
    return this.page.getByTestId('account-delete-button')
  }

get yesDeleteButton(): Locator {
    return this.page.getByTestId('account-delete-confirm-button')
  }
get noDeleteButton(): Locator {
    return this.page.getByTestId('account-delete-cancel-button')
  }

  get adressTab(): Locator {
    return this.page.getByTestId('account-tab-addresses')
  }

  // --- Дії ---
//   async login(email: string, password: string) {
//     // дописуєш сам
//   }

  async openPageRegister() {
    return this.page.goto(this.url)
  }


  // --- Перевірки ---
//   async expectPageVisible() {
//     // дописуєш сам
//   }
  
// async expectRequiredErrors() {
//   await expect(.).toHaveText([
//     'Email is required',
//     'Password is required',
//     'Confirm password is required',
//   ]);
// }

}