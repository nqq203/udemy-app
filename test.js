function Person(name,age) {
  this.name = name
  this.age =age 
}
Person.prototype.greet=function(){
  return "Hello "+this.name
}

const p1 = new Person("John",30)
console.log(p1.greet())