it('Nada', function () { })

// function soma(a, b) {
//   return a + b;
// }

// const soma = function(a, b){
//   return a + b
// }

// Arrow sem retorno não funciona.
// const soma = (a, b)=> {
//   return a + b
// }

//depois do arrow, já é entendido como retorno "=>"
// const soma = (a, b) => a + b


// const soma = (a) => a + a

// const soma = a => a + a

const soma = () => 5 + 5
console.log(soma(5, 7))

it('a function test...', function () {
  console.log('Function', this)
})

it('a function test...', () => {
  console.log('Arrow', this)
})