const { Builder, By, until } = require('selenium-webdriver');

async function loginInvalidEmailTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('djKhaled');

        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('Another One');

        let loginButton = await driver.findElement(By.xpath("//button[text()='LOG IN']"));
        await loginButton.click();
    } finally {
        await driver.quit();
    }
}

async function loginUserDoesNotExistTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('metroBoomin@gmail.com');

        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('producerTag');

        let loginButton = await driver.findElement(By.xpath("//button[text()='LOG IN']"));
        await loginButton.click();
    } finally {
        await driver.quit();
    }
}

async function registerInvalidEmailTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');

        await driver.findElement(By.name('name')).sendKeys('Kanye West');
        await driver.findElement(By.name('email')).sendKeys('YE');
        await driver.findElement(By.name('password')).sendKeys('ChiTown');
        await driver.findElement(By.name('confirmPassword')).sendKeys('ChiTown');

        let signUpButton = await driver.findElement(By.xpath("//button[text()='SIGN UP']"));
        await signUpButton.click();
        let errorMessage = await driver.wait(until.elementLocated(By.className('ErrorMessage')), 5000);
        await driver.wait(until.elementIsVisible(errorMessage), 5000);

        let errorMessageText = await errorMessage.getText();
        if (errorMessageText !== 'Email is not valid!') {
            throw new Error('Unexpected error message: ' + errorMessageText);
        }
    } finally {
        await driver.quit();
    }
}



async function registerMissingFieldsTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');

        await driver.findElement(By.name('name')).sendKeys('Chance');
       
        await driver.findElement(By.name('password')).sendKeys('AcidRap');
        await driver.findElement(By.name('confirmPassword')).sendKeys('AcidRap');

        let signUpButton = await driver.findElement(By.xpath("//button[text()='SIGN UP']"));
        await signUpButton.click();

        let errorMessage = await driver.wait(until.elementLocated(By.className('ErrorMessage')), 5000);
        await driver.wait(until.elementIsVisible(errorMessage), 5000);

 
        let errorMessageText = await errorMessage.getText();
        if (errorMessageText !== 'Missing inputs on required fields!') {
            throw new Error('Unexpected error message: ' + errorMessageText);
        }
    } finally {
        await driver.quit();
    }
}

async function registerPasswordMismatchTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');

        await driver.findElement(By.name('name')).sendKeys('Kendrick Lamar');
        await driver.findElement(By.name('email')).sendKeys('Kdot@compton.com');
        await driver.findElement(By.name('password')).sendKeys('King Kunta');
        await driver.findElement(By.name('confirmPassword')).sendKeys('To Pimp A Butterfly');

        let signUpButton = await driver.findElement(By.xpath("//button[text()='SIGN UP']"));
        await signUpButton.click();

        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Password and confirm password do not match!'), 5000);
    } finally {
        await driver.quit();
    }
}


async function registerSuccessTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');

        await driver.findElement(By.name('name')).sendKeys('Jermaine Cole');
        await driver.findElement(By.name('email')).sendKeys('JCole@Dreamville.com');
        await driver.findElement(By.name('password')).sendKeys('2014ForestHillsDrive');
        await driver.findElement(By.name('confirmPassword')).sendKeys('2014ForestHillsDrive');

        let signUpButton = await driver.findElement(By.xpath("//button[text()='SIGN UP']"));
        await signUpButton.click();

        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
    } finally {
        await driver.quit();
    }
}

async function loginSuccessTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('JCole@Dreamville.com');

        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('2014ForestHillsDrive');

        let loginButton = await driver.findElement(By.xpath("//button[text()='LOG IN']"));
        await loginButton.click();

        await driver.wait(until.urlIs('http://localhost:3000/dashboard'), 5000);
    } finally {
        await driver.quit();
    }
}


async function createAppointmentTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/appt/appointment'); 
        await driver.findElement(By.id('open-appointment-modal-button')).click(); 
        await driver.wait(until.elementLocated(By.id('modal-header')), 5000);
        await driver.findElement(By.id('reason-for-appt')).sendKeys('Check-up');
        
        const dateTimeInput = await driver.findElement(By.id('datetime'));
        const dateTimeValue = '2024-12-01T10:30'; 
        await dateTimeInput.sendKeys(dateTimeValue);

        const doctorSelect = await driver.findElement(By.css("select option[value='Dr. Nicholai Oblina']"));
        await doctorSelect.click();
        await driver.findElement(By.xpath("//button[text()='Submit']")).click();

        await driver.wait(until.urlIs('http://localhost:3000/appointments'), 5000); // Adjust as needed

    } finally {
        await driver.quit();
    }
}

loginInvalidEmailTest();
loginUserDoesNotExistTest();
registerInvalidEmailTest();
registerMissingFieldsTest();
registerPasswordMismatchTest();
registerSuccessTest();
loginSuccessTest();
createAppointmentTest();
