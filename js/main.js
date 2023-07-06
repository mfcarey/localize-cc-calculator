import { MyCalculator } from "../node_modules/cc-my-calculator/MyCalculator.js"

const ERROR = 'ERROR';

var myCalc = new MyCalculator();

console.log('======== INIT TESTING My Calculator ========');
myCalc.one().plus().two().is();
myCalc.cleanSlate().five().times().four().is();
myCalc.cleanSlate().five().plus().three().times().four().is();
myCalc.cleanSlate().zero().minus().times().three().is();
myCalc.cleanSlate();
console.log('======== END TESTING My Calculator ========');

function initUI() {
    let display = document.getElementById('display');
    let buttons = Array.from(document.getElementsByClassName('button'));
    buttons.map( button => {
        button.addEventListener('click', (e) => {
            let evtVal = e.target.innerText;
            switch(evtVal){
                case 'C':
                    myCalc.cleanSlate();
                    showResult('0');
                    break;
                case '÷':
                case 'x':
                case '-':
                case '+':
                case '=':
                    handleOperation(evtVal);
                    break;
                default:
                    // numerical buttons
                    let numberNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
                    let numMethod = numberNames[evtVal];
                    if (!numMethod) {
                        showResult(ERROR);
                    } else {
                        myCalc[numMethod]();
                        display.innerText = evtVal;
                    }
            }

            updateDisplayStates();
        });
    });

    showResult('0');
    updateDisplayStates();
}

function handleOperation(operationEvtVal) {
    let operations = new Map([
        ['÷', 'dividedBy'],
        ['x', 'times'],
        ['-', 'minus'],
        ['+', 'plus']
    ]);
    let opMethod = operations.get(operationEvtVal);
    if (opMethod !== undefined) {
        myCalc[opMethod]();
    }
    let result = myCalc.is();
    showResult(result ?? ERROR);
}

function showResult(displayResult) {
    let formatCapture = displayResult.toString().match(/^-?\d+(?:\.\d{0,4})?/); // handle graceful display of long decimal values
    display.innerText = formatCapture?.length ? formatCapture[0] : displayResult;
}

function updateDisplayStates() {
    updateEqualsBtnState();
    updateExpressionDisplay();
}

function updateEqualsBtnState() {
    // attempt to mitigate a user clicking around in ways that will build a malformed expression
    let currentExpressionIsValid = myCalc.isValidExpression();
    let equalsBtn = document.getElementById('equals');
    if (currentExpressionIsValid && equalsBtn.hasAttribute('disabled')){
        equalsBtn.removeAttribute('disabled');
    } else if (!currentExpressionIsValid && !equalsBtn.hasAttribute('disabled')){
        equalsBtn.setAttribute('disabled', '');
    }
}

function updateExpressionDisplay() {
    document.getElementById('expression').innerText = myCalc.expressionMembers.join(' ');
}

initUI();
