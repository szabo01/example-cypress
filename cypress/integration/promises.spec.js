it('sem testes', () => {

})

const getSomething = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(15);

    }, 1000)

  })
}

const system = () => {
  console.log('init');

  getSomething().then(some => {
    console.log(`Something is ${some}`)
  })
  // getSomething(some => console.log(`Something is ${some}`));
  // console.log(`Something is ${something}`);
  // console.log("Something is " + something); //Forma antiga
  console.log('end')
}

// Não é uma boa condura utilizar async await
// const system = async () => {
//   console.log('init');
//   const some = await getSomething()
//   console.log(`Something is ${some}`)
//   console.log('end')
// }

system();