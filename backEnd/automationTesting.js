const { Builder, By, Key, until } = require('selenium-webdriver');

//invalid email input
async function loginInvalidEmailTest(){
    let driver = await new Builder().forBrowser('chrome').build();
    try{
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('djKhaled');

        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('Another One');
        let loginButton = await driver.findElement(By.id("//button[text()='LOG IN']")); 
        await loginButton.click();
    }finally{
        await driver.quit();
    }
}

//user does not exist
async function loginUserDoesNotExistTest(){
    let driver = await new Builder().forBrowser('chrome').build();
    try{
        await driver.get('http://localhost:3000/');
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('metroBoomin@gmail.com');

        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('producerTag');
        let loginButton = await driver.findElement(By.id("//button[text()='LOG IN']")); 
        await loginButton.click();
    }finally{
        await driver.quit();
    }
}

//input invalid email
async function registerInvalidEmailTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.placeholder('Name')).sendKeys('Kanye West');
        await driver.findElement(By.placeholder('Email')).sendKeys('YE');
        await driver.findElement(By.placeholder('Password')).sendKeys('ChiTown');
        await driver.findElement(By.placeholder('Confirm Password')).sendKeys('ChiTown');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Email is not valid!'), 5000);
    } finally {
        await driver.quit();
    }
}

//Missing input register field
async function registerMissingFieldsTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.placeholder('Name')).sendKeys('Chance');
        await driver.findElement(By.placeholder('Email')).sendKeys('');
        await driver.findElement(By.placeholder('Password')).sendKeys('AcidRap');
        await driver.findElement(By.placeholder('Confirm Password')).sendKeys('AcidRap');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        let errorMessage = await driver.findElement(By.className('ErrorMessage'));
        await driver.wait(until.elementTextIs(errorMessage, 'Missing inputs on required fields!'), 5000);
    } finally {
        await driver.quit();
    }
}

//Password mismatch 
async function registerPasswordMismatchTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/register');
        await driver.findElement(By.placeholder('Name')).sendKeys('Kendrick Lamar');
        await driver.findElement(By.placeholder('Email')).sendKeys('Kdot@compton.com');
        await driver.findElement(By.placeholder('Password')).sendKeys('King Kunta');
        await driver.findElement(By.placeholder('Confirm Password')).sendKeys('To Pimp A Butterfly');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

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
        await driver.findElement(By.placeholder('Name')).sendKeys('Jermaine Cole');
        await driver.findElement(By.placeholder('Email')).sendKeys('JCole@Dreamville.com');
        await driver.findElement(By.placeholder('Password')).sendKeys('2014ForestHillsDrive');
        await driver.findElement(By.placeholder('Confirm Password')).sendKeys('2014ForestHillsDrive');
        await driver.findElement(By.xpath("//button[text()='SIGN UP']")).click();

        
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
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