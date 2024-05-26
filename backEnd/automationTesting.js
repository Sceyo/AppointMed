const { Builder, By, Key, until } = require('selenium-webdriver');

//invalid email input
async function loginInvalidEmailTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.xpath("//input[@placeholder='Email']"));
        await emailInput.sendKeys('djKhaled');

        let passwordInput = await driver.findElement(By.xpath("//input[@placeholder='Password']"));
        await passwordInput.sendKeys('Another One');
        let loginButton = await driver.findElement(By.xpath("//button[text()='LOG IN']"));
        await loginButton.click();
        
        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Email is not valid!'), 5000);
    } finally {
        await driver.quit();
    }
}

//user does not exist
async function loginUserDoesNotExistTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.xpath("//input[@placeholder='Email']"));
        await emailInput.sendKeys('metroBoomin@gmail.com');

        let passwordInput = await driver.findElement(By.xpath("//input[@placeholder='Password']"));
        await passwordInput.sendKeys('producerTag');
        let loginButton = await driver.findElement(By.xpath("//button[text()='LOG IN']"));
        await loginButton.click();
        
        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'User does not exist'), 5000);
    } finally {
        await driver.quit();
    }
}

//input invalid email
async function registerInvalidEmailTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys('Kanye West');
        await driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys('YE');
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys('ChiTown');
        await driver.findElement(By.xpath("//input[@placeholder='Confirm Password']")).sendKeys('ChiTown');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Email is not valid!'), 5000);
    } finally {
        await driver.quit();
    }
}

// Missing input fields during registration
async function registerMissingFieldsTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys('Chance');
        await driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys('');
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys('AcidRap');
        await driver.findElement(By.xpath("//input[@placeholder='Confirm Password']")).sendKeys('AcidRap');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Missing inputs on required fields!'), 5000);
    } finally {
        await driver.quit();
    }
}

// Password do not match during registration
async function registerPasswordMismatchTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys('Kendrick Lamar');
        await driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys('Kdot@compton.com');
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys('King Kunta');
        await driver.findElement(By.xpath("//input[@placeholder='Confirm Password']")).sendKeys('To Pimp A Butterfly');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Password and confirm password do not match!'), 5000);
    } finally {
        await driver.quit();
    }
}

// Successful registration test
async function registerSuccessTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
       
        // Kani na part mo register
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys('Jermaine Cole');
        await driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys('JCole@Dreamville.com');
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys('2014ForestHillsDrive');
        await driver.findElement(By.xpath("//input[@placeholder='Confirm Password']")).sendKeys('2014ForestHillsDrive');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        // Kani kay mo redirect to the login page
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

        // Kani mo login with the credentials given ganiha
        await driver.findElement(By.xpath("//input[@placeholder='Email']")).sendKeys('JCole@Dreamville.com');
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys('2014ForestHillsDrive');
        await driver.findElement(By.xpath("//button[text()='LOG IN']")).click();

        // Lord please mo work tawn ni
        await driver.wait(until.urlIs('http://localhost:3000/dashboard'), 5000);
    } finally {
        await driver.quit();
    }
}

//Mga tests
loginInvalidEmailTest();
loginUserDoesNotExistTest();
registerInvalidEmailTest();
registerMissingFieldsTest();
registerPasswordMismatchTest();
registerSuccessTest();
