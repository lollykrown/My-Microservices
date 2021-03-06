// validation script here
// regex pattern must be in 2 slashes /anything/
// [a-zA-Z]// mathes small/capital letter a-z
// [0-9]// matches numbers from 0-9
// [a]ty //adding characters after the array makes the content of the array to refer to the 1st character
// [0-9]+ //matches 0-9 unlimited number of times e.g 6846352627272727
// [0-9]{11} //11 in curly braces denotes the number of times the range in the array can be repeated
// [a-z]{5,8} //repeats the content of the array from/btw 5 - 8 times
// [a-z]{5,} //repeats the content of the array at least 5 chracters long
// [^t] //any letter that is not t
// /hello? hell required, o is optional
// car. car and any char except new line
// p | tyre // matches either p or tyre
// (p|t)yre //pyre or tyre
// (pet|toy|crazy) rabbit //matches any of the first words space rabbit
// abc\* makes abc appears zero or more times, the back slash escapes the default function 
// \d same as [0-9]
// \w // matches any word character (a-z,A-Z, 0-9, _)
// \s //matches whitespace chracter (spaces, tabs, next line etc)
// \t// matches a tab character only
// g // dont end after first match
// i //case insensitive
// \ //escape character removes the default behaviour
// [] //the character set
//[^] //the negate symbolcharacter set
// + one or more quantifier
// ? The zero or one quantifier (makes a preceding char optional)
// . any character except the new line character
// * char before it must appear zero or more times
// | or
// ^[0][7-9][0-1][0-9]{8}$ Nigerian number. the caret before say no char before and $ say no char after the match
// ^[0][7-9][0-1][\d]{8}$ Nigerian number. the caret before say no char before and $ say no char after the match

//Let's get started
const inputs = document.querySelectorAll('input');

const moneyCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const patterns = {
    username: /^[a-z\d]{5,12}$/i,
    phone: /(^[0][7-9][0-1][\d]{8}$)|(^[\+][2][3][4][7-9][0-1][\d]{8}$)|(^[^1-2,9][\d]{8}$)/,
    phoneShortened: /^(\+?234|0)?[789][0-1]\d{8}$/,
    email: /^([a-z\d_\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[\w@-]{8,20}/,
    slug: /^[a-z\d-]{8,20}/,
    website: /^(([\w]{3}\.)|([h][t][t][p][s][:][\/][\/])|([h][t][t][p][:][\/][\/]))([a-z_-]+)\.([a-z]{2,9})(\.[a-z]{2,9})?$/,
    token: /^[\d]{5}$/
}

//|https:\/\/www|https:\/\/
function validate(field, regex){
    console.log(regex.test(field.value))
    if(regex.test(field.value)){
        field.className = 'valid'
    } else {
        field.className= 'invalid'
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        validate(e.target, patterns[e.target.attributes.name.value])
    })
})
