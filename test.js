import test from 'ava'
import { spawn } from 'child_process'
import waitPort from 'wait-port'
import fetch from 'cross-fetch'

test('it works!', async t => {
    const server = spawn('yarn', ['start']);
    await waitPort({ port: 8080, timeout: 5000 });

    const response = await fetch('http://localhost:8080');
    const body = await response.text();

    t.true(body.includes('Hello World!'));

    server.kill();
});