const puppeteer = require('puppeteer')
const dotenv    = require('dotenv')
const path = require('path')
dotenv.config()
const TIMEOUT = 60000
!async function() {
    const selectors = {
        username: '#logonuidfield',
        password: '#logonpassfield',
        btnLogin: '[name=uidPasswordLogon]',
    }
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
        timeout: TIMEOUT,
        ignoreHTTPSErrors: true,
    })

    let page = await browser.newPage()
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.7113.93 Safari/537.36')
    page.goto('https://portal.softtek.com/irj/portal/fiori##EP--1309369188-MyWorkTime')
    await page.waitForSelector(selectors.username, { timeout : TIMEOUT})
    await page.type(selectors.username, process.env['USUARIO_SOFTTEK'])
    await page.type(selectors.password, process.env['PASSWORD_SOFTTEK'])
    await page.click(selectors.btnLogin)

    let newWindowTarget = await browser.waitForTarget(
        target => target.url().includes('myworktime.softtek.com/home'),
        {
            timeout: TIMEOUT,
        }
    );
    page = await newWindowTarget.page()
    let buttonInit = '//ion-button[contains(., "Iniciar jornada")]'
    let button = await page.waitForXPath(buttonInit, {
        visible: true,
        timeout : TIMEOUT,
    })
    let isDisabled = await button.evaluate(b => !b.disabled)
    !isDisabled && await button.click()
    await page.screenshot({ path: path.join("example2.png") })
    await page.waitForTimeout(5000)
    await browser.close()
}()
