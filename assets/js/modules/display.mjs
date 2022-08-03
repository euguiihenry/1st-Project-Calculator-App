import { calculator } from "../main.js";
import { completeOperation, copyCompleteOperation, copyLastResultToCompleteOperation, updateCompleteOperation } from "./compute.mjs";

const semi_historic = document.querySelector('#semi-historic');
const result = document.querySelector('#result');

const displayData = result.textContent;
const outputData = semi_historic.textContent;

let canInsertDot;

let targetKey;

export const displayOperation = () => {
    semi_historic.innerHTML = completeOperation;
    
}

export const displayResult = (endResult, key) => {
    result.textContent = endResult;

    if (result.textContent != '' && key.classList.contains('operator')) {
        copyLastResultToCompleteOperation(endResult);
    }    
}

export const cleanDisplay = () => {
    semi_historic.textContent = '';
    updateCompleteOperation('');
    result.textContent = '0';
}

export const deleteLastInserted = () => {
    let deletedInfoPosition = ((semi_historic.textContent.length)-1);
    let newInfo = semi_historic.textContent.substring(0, deletedInfoPosition);

    updateCompleteOperation(newInfo);
    displayOperation();
}

export const isDotInserted = (value) => {
    let copyHistoric = semi_historic.textContent.substring(0, semi_historic.textContent.length);
    let lastCharacterIndex = copyHistoric.charAt(semi_historic.textContent.length-1);

    if(!isNaN(copyHistoric.charAt(lastCharacterIndex))) {
        copyCompleteOperation(value);
        displayOperation();
    }
}