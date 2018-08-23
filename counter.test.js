import test from 'ava'
import { increment } from './counter'
import { JSDOM } from 'jsdom'

test('incrementing', t => {
    const { window } = new JSDOM(`
        <!doctype html>
        <div class="counter">0</div>
    `);
    global.window = window;
    global.document = window.document;

    increment(1);

    t.is(document.querySelector('.counter').textContent, '1')
});