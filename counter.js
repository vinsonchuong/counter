export function increment(x) {
    const counter = document.querySelector('.counter');
    const currentCount = Number(counter.textContent);
    counter.textContent = String(currentCount + x);
}