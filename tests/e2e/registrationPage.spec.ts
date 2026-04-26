import { expect, test } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { randomEmail, randomPassword } from '../utils';
import { ProfilePage } from '../pages/Profile';


test.describe('Registration Page @regression', () => {
  let registerPage: RegisterPage;
  let profilePage: ProfilePage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    profilePage = new ProfilePage (page);
    await registerPage.openPageRegister()
  });

 test('Create user with valid data', async () => {
  const email = randomEmail();       
  const password = randomPassword()
    await registerPage.fullNameInput.fill('Test User')
    await registerPage.emailInput.fill(email)
    await registerPage.passwordInput.fill(password)
    await registerPage.confirmPasswordInput.fill(password)
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    // Дописуєш перевірки для успішної реєстрації
    await profilePage.securityTab.click()
    await profilePage.securityTabDeleteButton.click()
    await profilePage.yesDeleteButton.click()
  });


 test('Cannot create user with existing email', async () => {      
  const password = randomPassword()
    await registerPage.fullNameInput.fill('Test User')
    await registerPage.emailInput.fill('exist@email.com')
    await registerPage.passwordInput.fill(password)
    await registerPage.confirmPasswordInput.fill(password)
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'This email is already registered',
    ]);
    await registerPage.emailInput.fill('Exist@email.com')
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'This email is already registered',
    ]);
  });


  test('Cannot create user without filled required fields', async () => {
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(5)
    await registerPage.expectRequiredErrors()
});


test('Cannot create user without filled Full Name field', async ()  => {
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.confirmPasswordInput.fill('Asdcdfghj1*')
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Full Name is required',
    ]);
  });

test('Cannot create user without filled email field', async ()  => {
    await registerPage.fullNameInput.fill('Test User')
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.confirmPasswordInput.fill('Asdcdfghj1*')
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Email is required',
    ]);
  });


  test('Cannot create user without filled password field', async ()  => {
    await registerPage.fullNameInput.fill('Test User')
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.confirmPasswordInput.fill('Asdcdfghj1*')
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(2)
    await expect(registerPage.errorMessages).toHaveText([
      'Password is required',
      'Passwords do not match'
    ]); ``
  });

   test('Cannot create user without filled confirm password field', async ()  => {
    await registerPage.fullNameInput.fill('Test User')
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Confirm password is required',
    ]);
  });

test('Confirm password do not match', async ()  => {
    await registerPage.fullNameInput.fill('Test User')
    await registerPage.emailInput.fill('abc@random.com')
    await registerPage.passwordInput.fill('Asdcdfghj1*')
    await registerPage.confirmPasswordInput.fill('WrongPassword1*')
    await registerPage.agreeCheckbox.check()
    await registerPage.submitButton.click()
    await expect(registerPage.errorMessages).toHaveCount(1)
    await expect(registerPage.errorMessages).toHaveText([
      'Passwords do not match',
    ]);
  });

  test('Cannot create user with email without @', async () => {
  await registerPage.fullNameInput.fill('Test User')
  await registerPage.emailInput.fill('testmail.com');
  await registerPage.passwordInput.fill('Asdcdfghj1*');
  await registerPage.confirmPasswordInput.fill('Asdcdfghj1*');
  await registerPage.agreeCheckbox.check()
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Email must contain @',
  ]);
});

test('Cannot create user with invalid email format', async () => {
  await registerPage.fullNameInput.fill('Test User')
  await registerPage.emailInput.fill('test@domain');
  await registerPage.passwordInput.fill('Asdcdfghj1*');
  await registerPage.confirmPasswordInput.fill('Asdcdfghj1*');
  await registerPage.agreeCheckbox.check()
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Invalid email format',
  ]);
});

test('Cannot create user with forbidden .ru domain', async () => {
  await registerPage.fullNameInput.fill('Test User')
  await registerPage.emailInput.fill('test@site.ru');
  await registerPage.passwordInput.fill('Asdcdfghj1*');
  await registerPage.confirmPasswordInput.fill('Asdcdfghj1*');
  await registerPage.agreeCheckbox.check()    
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Registration with this domain is not allowed',
  ]);
});

test('Cannot create user with forbidden listed domain', async () => {
  await registerPage.fullNameInput.fill('Test User');
  await registerPage.emailInput.fill('test@mail.ru');
  await registerPage.passwordInput.fill('Asdcdfghj1*');
  await registerPage.confirmPasswordInput.fill('Asdcdfghj1*');
  await registerPage.agreeCheckbox.check();
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Registration with this domain is not allowed',
  ]);
});

test('Cannot create user with password shorter than 8 characters', async () => {
  await registerPage.fullNameInput.fill('Test User');
  await registerPage.emailInput.fill('abc@random.com');
  await registerPage.passwordInput.fill('Ab1!abc');
  await registerPage.confirmPasswordInput.fill('Ab1!abc');
  await registerPage.agreeCheckbox.check();
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Password must be at least 8 characters long',
  ]);
});

test('Cannot create user with password without uppercase letter', async () => {
  await registerPage.fullNameInput.fill('Test User');
  await registerPage.emailInput.fill('abc@random.com');
  await registerPage.passwordInput.fill('asdcdfgh1*');
  await registerPage.confirmPasswordInput.fill('asdcdfgh1*');
  await registerPage.agreeCheckbox.check();
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Password must contain at least one uppercase English letter',
  ]);
});

test('Cannot create user with password without digit', async () => {
  await registerPage.fullNameInput.fill('Test User');
  await registerPage.emailInput.fill('abc@random.com');
  await registerPage.passwordInput.fill('Asdcdfghj*');
  await registerPage.confirmPasswordInput.fill('Asdcdfghj*');
  await registerPage.agreeCheckbox.check();
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Password must contain at least one digit',
  ]);
});

test('Cannot create user with password without special character', async () => {
  await registerPage.fullNameInput.fill('Test User');
  await registerPage.emailInput.fill('abc@random.com');
  await registerPage.passwordInput.fill('Asdcdfghj1');
  await registerPage.confirmPasswordInput.fill('Asdcdfghj1');
  await registerPage.agreeCheckbox.check();
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Password must contain at least one special character',
  ]);
});

test('Cannot create user with password containing non-English characters', async () => {
  await registerPage.fullNameInput.fill('Test User');
  await registerPage.emailInput.fill('abc@random.com');
  await registerPage.passwordInput.fill('Qwerty1!ї');
  await registerPage.confirmPasswordInput.fill('Qwerty1!ї');
  await registerPage.agreeCheckbox.check();
  await registerPage.submitButton.click();

  await expect(registerPage.errorMessages).toHaveCount(1);
  await expect(registerPage.errorMessages).toHaveText([
    'Password can contain only English letters, digits, and special characters',
  ]);
});

  
  test('ToolTip text visible and correct', async ()  => {
    await registerPage.toolTip.hover()
    await registerPage.expectPasswordToolTip()
  });
});
