/*
* Simple calculator class which supports addition, subtraction, multiplication, and division (per PEMDAS)
* allowing wordy custom method chaining syntax for execution, with minimal basic validation
*/
export class MyCalculator {
    constructor() {
        this.cleanSlate();
    }

    assignExpMember(m) {
        this.expressionMembers.push(m);
        return this;
    }
    zero()  { return this.assignExpMember(0); }
    one()   { return this.assignExpMember(1); }
    two()   { return this.assignExpMember(2); }
    three() { return this.assignExpMember(3); }
    four()  { return this.assignExpMember(4); }
    five()  { return this.assignExpMember(5); }
    six()   { return this.assignExpMember(6); }
    seven() { return this.assignExpMember(7); }
    eight() { return this.assignExpMember(8); }
    nine()  { return this.assignExpMember(9); }
    plus()      { return this.assignExpMember('+'); }
    minus()     { return this.assignExpMember('-'); }
    times()     { return this.assignExpMember('*'); }
    dividedBy() { return this.assignExpMember('/'); }

    is() {
        // to start, set a ref for the stringified expression
        var strExp = this.expressionMembers.join(' ');

        // perform some basic validation
        if (!this.isValidExpression()){
            console.log(`OOPS! (${strExp}) cannot be calculated as provided! Please invoke a valid expression chain!`);
            return;
        }

        // since a UI may allow for this method to be called along the way
        // (eg in a calc UI where chaining operations updates the result display in realtime..)
        // trim any trailing operator
        let end = strExp.length - 1;
        if (this.isOperation(strExp.charAt(end))){
            strExp = strExp.substring(0, end);
        }

        var result = eval(strExp); // javaScript eval respects PEMDAS natively, REVISIT if input not trustworthy
        console.log(`MyCalculator (${strExp}) result: `, result);
        return result;
    }

    isValidExpression() {
        // simple validation to ensure the executed method chain can be eval'd as a proper expression per member ordering
        // expect odd-indexed members to be numbers and even-indexed members to be operators
        // REVISIT if calculator becomes more functionally complex
        for (var m=0; m<this.expressionMembers.length; m++){
            var member = this.expressionMembers[m];
            if ((m % 2 === 0 && !this.isNumber(member)) || (m % 2 !== 0 && !this.isOperation(member))){
                return false;
            }
        }
        return true;
    }

    isNumber(m) {
        return !isNaN(m);
    }

    isOperation(m) {
        return /[\+\-\*\/]/.test(m);
    }

    cleanSlate() {
        this.expressionMembers = [];
        return this;
    }
}