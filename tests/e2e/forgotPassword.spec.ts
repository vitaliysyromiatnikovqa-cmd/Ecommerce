import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { randomEmail, randomPassword } from '../utils';
import { ProfilePage } from '../pages/Profile';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages';


test.describe('Registration Page @regression', () => {
  let registerPage: RegisterPage;
  let profilePage: ProfilePage; 
  let forgotPasswordPage: ForgotPasswordPage;    
  let email = randomEmail();
  let password = randomPassword();

  test.beforeAll(async ({ browser }) => {
     const context = await browser.newContext();
    const page = await context.newPage();

    registerPage = new RegisterPage(page);
    await registerPage.openPageRegister();
    await registerPage.register(email, password);

    await context.close();
  });

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    profilePage = new ProfilePage (page);
    forgotPasswordPage = new ForgotPasswordPage(page);
    await forgotPasswordPage.openForgotPasswordPage();
  });

//    test('Create user with valid data', async () => {
   
//     await registerPage.fullNameInput.fill('Test User')
//     await registerPage.emailInput.fill(email)
//     await registerPage.passwordInput.fill(password)
//     await registerPage.confirmPasswordInput.fill(password)
//     await registerPage.agreeCheckbox.check()
//     await registerPage.submitButton.click()
//     // Дописуєш перевірки для успішної реєстрації
//     await profilePage.securityTab.click()
//     await profilePage.securityTabDeleteButton.click()
//     await profilePage.yesDeleteButton.click()
//   });



   test('Cannot generate token for ResetPassword', async () => {
    const email = randomEmail();
    await forgotPasswordPage.emailInput.fill(email);
    await forgotPasswordPage.submit();
    await expect(forgotPasswordPage.formErrorBanner).toHaveText('If an account with this email exists, a reset token has been generated');});
})