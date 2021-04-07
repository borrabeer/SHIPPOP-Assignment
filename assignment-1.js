const helloShippop = (firstName, lastName) => {
    console.log(firstName.toLowerCase() == "shippop" ? "Best Online Shipping Platform" : `Hello Shippop, My name is ${firstName} ${lastName}`)
}

helloShippop("Worapath", "Pakkavesa")

helloShippop("Shippop", "Test")

