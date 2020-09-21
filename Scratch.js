
let foo = (a = 'hello', b = 'world') => {
    console.log(a);
    console.log(b);
}

let bar = ({a = "Hello", b = "World"} = {}) => {
    console.log(a + ", " + b);
}