const person = [
    {
        name:'Vijay',
        age:22
    },
    {
        name:'gopal',
        age:23
    },
    {
        name:'karan',
        age:24
    },
    {
        name:'karan',
        age:24

    }
]

const getName = (person) => person.name 

const mapper = person.map(getName)

// console.log(mapper)

const newName = person.map((item)=>{
    return{
        FirstName : item.name,
        Age : item.age
    }
})
console.log(newName)

const names = person.map((person)=>`<h2>${person.name}</h2>`)

const result = document.getElementById('result')

result.innerHTML = names.join('') 