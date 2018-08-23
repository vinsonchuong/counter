import test from 'ava'
import { spawn } from 'child_process'
import waitPort from 'wait-port'
import { openChrome, closeBrowser, openTab, findElement, clickElement } from 'puppet-strings'

let server, chrome;
test.before(async () => {
    server = spawn('yarn', ['start']);
    await waitPort({ port: 8080, timeout: 5000 });

    chrome = await openChrome();
});
test.after.always(async () => {
    server.kill();

    await closeBrowser(chrome);
});

test('shows a 0 count by default', async t => {
    const tab = await openTab(chrome, 'http://localhost:8080');

    const countDiv = await findElement(tab, '.counter');
    t.is(countDiv.innerText, '0');
});

test('allows incrementing by 1', async t => {
    const tab = await openTab(chrome, 'http://localhost:8080');

    const incrementButton = await findElement(tab, '.increment', 'Increment');
    await clickElement(incrementButton);

    const updatedCountDiv = await findElement(tab, '.counter');
    t.is(updatedCountDiv.innerText, '1');
});

test('allows decrementing by 1', async t => {
    const tab = await openTab(chrome, 'http://localhost:8080');

    const decrementButton = await findElement(tab, '.decrement', 'Decrement');
    await clickElement(decrementButton);

    const updatedAgainCountDiv = await findElement(tab, '.counter');
    t.is(updatedAgainCountDiv.innerText, '-1');
});