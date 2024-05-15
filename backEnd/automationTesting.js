const { Builder, By, Key, until } = require('selenium-webdriver');


async function loginTest1(){
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

loginTest1();