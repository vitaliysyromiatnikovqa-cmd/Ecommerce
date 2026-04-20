import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { randomEmail, randomPassword } from '../utils';
import { AccountPage } from '../pages/Account';


test.describe('Registration Page @regression', () => {
  let registerPage: RegisterPage;
  let accountPage: AccountPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    accountPage = new AccountPage(page);
    await registerPage.openPageRegister()
  });

 test('Create user with valid data', async () => {
  const email = randomEmail();       
  const password = randomPassword()
  
    await registerPage.emailInput.fill(email)
    await registerPage.passwordInput.fill(password)
    await registerPage.confirmPasswordInput.fill(password)
    await registerPage.submitButton.click()
    // Дописуєш перевірки для успішної реєстрації
    await accountPage.saveProfileText()
    await accountPage.deleteButtonText()
    await accountPage.DeleteProfileButton()
    await accountPage.confirmDeleteAccount()
    await registerPage.submitButton.isVisible()
  });


  test('Cannot create user without filled required fields', async () => {
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(3)
    await registerPage.expectRequiredErrors()
});

test('Cannot create user without filled email field', async ()  => {
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.confirmPasswordInput.fill('Asdcdfghj1*')
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Email is required',
    ]);
  });


  test('Cannot create user without filled password field', async ()  => {
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.confirmPasswordInput.fill('Asdcdfghj1*')
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(2)
    await expect(registerPage.errorMessages).toHaveText([
      'Password is required',
      'Passwords do not match'
    ]); 
  });

   test('Cannot create user without filled confirm password field', async ()  => {
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Confirm password is required',
    ]);
  });

test('Confirm password do not match', async ()  => {
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.confirmPasswordInput.fill('WrongPassword1*')
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Passwords do not match',
    ]);
  });

  test('ToolTip text visible and correct', async ()  => {
    await registerPage.toolTip.hover()
    await registerPage.expectPasswordToolTip()
  });
});
