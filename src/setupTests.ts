// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const b : {
    [i:number]: number[] 
} = {
    9 :[],
    6: []
}

console.log(b[9].concat())
