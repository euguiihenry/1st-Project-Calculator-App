import { calculator } from "../main.js";
import { ans, compute, computeLog, computePercent, getOperation } from "./compute.mjs";
import { cleanDisplay, deleteLastInserted, isDotInserted } from "./display.mjs";

const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', event => {
    if(!event.target.closest('button')) return

    const key = event.target;
    const keyValue = key.textContent;

    if (keyValue === 'C') {
        cleanDisplay();

        return;
    }

    if (keyValue === 'Del') {
        deleteLastInserted();

        return;
    }

    if (keyValue === '×') {
        let value = '*';

        getOperation(key, value);

        return;
    }

    if (keyValue === '÷') {
        let value = '/';

        getOperation(key, value);

        return;
    }

    if (keyValue === '%') {
        computePercent();

        return;
    }

    if (keyValue === 'log') {
        //let value = 'log ';

        getOperation(key, keyValue);

        return;
    }

    if (keyValue === 'xⁿ') {
        let value = '^';

        getOperation(key, value);

        return;
    }

    if (keyValue === 'Ans') {
        getOperation(key, ans);

        return;
    }

    if (keyValue !== '.' && keyValue !== '=') {
        getOperation(key, keyValue);

        return;
    }

    if (keyValue === '.') {
        isDotInserted(keyValue);

        return;
    }

    if (keyValue === '=') {
        compute(key);

        return;
    }
})