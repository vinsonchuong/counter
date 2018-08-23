import * as React from 'react'
import test from 'ava'
import { promisify } from 'util'
import { render } from 'react-dom'
import { Simulate } from 'react-dom/test-utils'
import { JSDOM } from 'jsdom'
import Counter from './counter'

const sleep = promisify(setTimeout);

test('having a default count of 42', async t => {
    const { window } = new JSDOM('<!doctype html>');
    const container = window.document.createElement('div');
    render(<Counter />, container);

    await sleep(100);

    t.is(container.querySelector('.counter').textContent, '42')
});

test('incrementing by 1', async t => {
    const { window } = new JSDOM('<!doctype html>');
    const container = window.document.createElement('div');
    render(<Counter />, container);

    await sleep(100);

    Simulate.click(container.querySelector('.increment'));
    t.is(container.querySelector('.counter').textContent, '43')
});

test('decrementing by 1', async t => {
    const { window } = new JSDOM('<!doctype html>');
    const container = window.document.createElement('div');
    render(<Counter />, container);

    await sleep(100);

    Simulate.click(container.querySelector('.decrement'));
    t.is(container.querySelector('.counter').textContent, '41')
});