import { calculator } from "../main.js";
import { displayOperation, displayResult } from "./display.mjs"

export let operationResult = '';
export let completeOperation = '';
export let ans = '';

export const copyLastResultToCompleteOperation = (lastResult) => {
    completeOperation = lastResult.toString();

}

export const updateCompleteOperation = (updatedValue) => {
    completeOperation = updatedValue;

}

export const copyCompleteOperation = (updatedValue) => {
    completeOperation += updatedValue;

}

export const getOperation = (key, value) => {
    if (('^*/+-'.lastIndexOf(completeOperation.charAt((completeOperation.length-1))) && (value === '(' || value === ')')) || ((completeOperation.charAt((completeOperation.length-1)) == '(' || completeOperation.charAt((completeOperation.length-1)) == ')') && key.classList.contains('operator'))) {
        completeOperation += value;
        displayOperation();

    } else if ('^*/+-'.lastIndexOf(completeOperation.charAt((completeOperation.length-1))) && value === '√') {
        completeOperation += value;
        displayOperation();

    } else if ('^*/+-'.lastIndexOf(completeOperation.charAt((completeOperation.length-1))) && value === 'log') {
        completeOperation += value;
        displayOperation();

    } else if (isNaN(completeOperation.charAt((completeOperation.length-1))) && key.classList.contains('operator')) {
        let lastOperator = completeOperation.substring((completeOperation.length-1))
        let operation = completeOperation.substring(0, (completeOperation.length-1));

        lastOperator = value;
        completeOperation = operation + lastOperator;
        displayOperation();

    } else {
        completeOperation += value;
        displayOperation();
    }
}

export const computePercent = () => {
    completeOperation += '/100';
    displayOperation();
}

export const computeSquareRoot = (value) => {
    let index = completeOperation.search(value);
    let copiedAfterSqrt = completeOperation.substring(index+1, completeOperation.length);
    let regexSearch = /[*^/+-]/;
    let indexNextOperator = copiedAfterSqrt.search(regexSearch);

    if (indexNextOperator == (-1)) {
        indexNextOperator = copiedAfterSqrt.length;
    }

    let numInsideSqrt = copiedAfterSqrt.substring(0, indexNextOperator);
    let resultSqrt = Math.sqrt(numInsideSqrt);
    let finalResult;

    if (Number(completeOperation.charAt((index-1)))) {
        finalResult = completeOperation.substring(0, index) + '*' + resultSqrt.toString() + copiedAfterSqrt.substring(indexNextOperator, copiedAfterSqrt.length);

    } else {
        finalResult = completeOperation.substring(0, index) + resultSqrt.toString() + copiedAfterSqrt.substring(indexNextOperator, copiedAfterSqrt.length);
    }

    completeOperation = finalResult;
}

export const computeLog = (value) => {
    let indexStart = completeOperation.search('l');
    let indexEnd = completeOperation.search('g');
    let regexSearch = /[*^/+-]/;
    let copyBeforeLog = completeOperation.substring(0, indexStart);
    let copyAfterLog = completeOperation.substring((indexEnd+1), completeOperation.length);
    let firstOperationAfterLogNum = copyAfterLog.search(regexSearch);

    if (firstOperationAfterLogNum == (-1)) {
        firstOperationAfterLogNum = copyAfterLog.length;
    }

    let logNum = copyAfterLog.substring(0, firstOperationAfterLogNum);
    let logResult = Math.log(logNum)/Math.log(10)
    let expressionWithoutLogNum = copyBeforeLog + logResult + copyAfterLog;

    completeOperation = expressionWithoutLogNum;
}

export const computePower = (startPoint) => {
    let index;

    for(const character of completeOperation) {

        if (character == '^') {
            index = startPoint;
            break;
        }

        startPoint++;
    }

    let copyBeforePower = completeOperation.substring(0, index);
    let copyAfterPower = completeOperation.substring((index+1), completeOperation.length);
    let regexSearchFinalOperator = /[*^/+-]/g;
    let regexSearch = /[*^/+-]/;
    let lastOperatorBeforeBase = copyBeforePower.search(regexSearchFinalOperator);
    let firstOperatorAfterExponent = copyAfterPower.search(regexSearch);
    let base = copyBeforePower.substring((lastOperatorBeforeBase+1), index);

    if (firstOperatorAfterExponent == (-1)) {
        firstOperatorAfterExponent = copyAfterPower.length;
    }

    let exponent = copyAfterPower.substring(0, firstOperatorAfterExponent);
    let resultPower = Math.pow(base, exponent);
    let finalResult = copyBeforePower.substring(0, lastOperatorBeforeBase+1) + resultPower.toString() + copyAfterPower.substring(firstOperatorAfterExponent, copyAfterPower.length);
    
    completeOperation = finalResult;
}

function showResult(key) {
    operationResult = eval(completeOperation.toString());

    if (operationResult.toString().length > 14) {
        let result = Number(operationResult).toFixed(14);
        ans = Number(operationResult);
        displayResult(result, key);

    } else {
        ans = Number(operationResult);
        displayResult(operationResult, key);

    }
}

export const compute = (key) => {
    if (completeOperation.search('√') > -1) {

        for(const character of completeOperation) {
            if (character === '√') {
                computeSquareRoot('√');
            }
        }
        
        showResult(key);

    } else if (completeOperation.includes('^')) {
        let startPoint = 0;

        for(const character of completeOperation) {
            if (character == '^') {
                computePower(startPoint);
            }
        }
        
        showResult(key);

    } else if (completeOperation.includes('log')) {
        computeLog;

        for(const character of completeOperation) {
            if (character == 'l') {
                computeLog();
            }
        }
        
        showResult(key);
    } else {
        showResult(key);
    }
    
}