import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { randomEmail, randomPassword } from '../utils';
import { ProfilePage } from '../pages/Profile';
import { LoginPage } from '../pages/LoginPage';
import { log } from 'node:console';
;


test.describe('Login  Page @regression', () => {
  let registerPage: RegisterPage;
  let profilePage: ProfilePage;
  let loginPage: LoginPage;
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
    profilePage = new ProfilePage (page);
    loginPage = new LoginPage(page);
    await loginPage.openLoginPage()
  });



 test('Login with valid credentials', async () => {
  await loginPage.emailInput.fill(email);
   await loginPage.passwordInput.fill(password);
   await loginPage.submit();    
  await expect(profilePage.myAccountText).toHaveText('My Account');

});

test('Login with invalid credentials', async () => {
  await loginPage.emailInput.fill('invalid@example.com');
   await loginPage.passwordInput.fill('invalidpassword');
   await loginPage.submit();    
   await loginPage.formErrorBanner.textContent();
   await expect(loginPage.formErrorBanner).toHaveText('Invalid email or password');
});

test('Login with without email', async () => {
   await loginPage.passwordInput.fill('invalidpassword');
   await loginPage.submit();    
   await expect(loginPage.emailError).toHaveText('Email is required');
});  

test('Login with without password', async () => {
   await loginPage.emailInput.fill('test@example.com  ');
   await loginPage.submit();    
   await expect(loginPage.passwordError).toHaveText('Password is required');
}); 

test('Login without @', async () => {
   await loginPage.emailInput.fill('testexample.com');
  await loginPage.passwordInput.fill('invalidpassword');
   await loginPage.submit();    
   await expect(loginPage.emailSymbolError).toHaveText('Email must contain @');
}); 

test('Login without company domain', async () => {
   await loginPage.emailInput.fill('test@example');
   await loginPage.passwordInput.fill('invalidpassword');
   await loginPage.submit();    
   await expect(loginPage.emailErrorDomain).toHaveText('Invalid email format');
}); 

test.only('Use function to see password', async () => {    
   await loginPage.passwordInput.fill(password);
   await expect(loginPage.seePasswordButton).toBeVisible();
   await loginPage.seePasswordButton.click();
   await expect(loginPage.passwordInput).toHaveValue(password);
}); 

});

