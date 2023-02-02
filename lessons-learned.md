# #TODO 1

## About:

> process.exit(1)

## Description:

> Search why this is needed

## Answer:

>      process.exit() is always used when you want to stop a process in NODEJS.
>
>      You can use process.exit() to stop without error or process.exit(1) to stop with error.

# #TODO 2

## About:

> Object destructuring

## Description:

> Research what is object destructuring

## Answer:

#### SOME USE CASES ABOUT OBJECT DESTRUCTURING:

1.  Extracting a property

    > const { props } = object

        This use case that was used in the code

    >

    >     Before applying:
    >
    >     const conn = await mongoose.connect(mongoURI)
    >     console.log(`MongoDB Connected: ${conn.connection.host}`)

    >     After applying:
    >
    >     const { connection } = await mongoose.connect(mongoURI)
    >     console.log(`MongoDB Connected: ${connection.host}`)

2.  Extracting multiple properties
    > const { prop1, prop2, ..., propN } = object
3.  Default values
    > const { prop = 'Default' } = object
4.  Alias
    > const { prop: myProp } = object
5.  Extracting properties from nested objects
    > const { prop: { deepProp } } = object
6.  Extracting a dynamic name property > const { [propName]: myProp } = object

# #TODO 3

## About:

> Optional chaining operator

## Description:

> Research about the optional chaining operator

## Answer:

>      The ?. operator is like the . chaining operator, except that instead of causing an error if a reference is nullish (null or undefined), the expression short-circuits with a return value of undefined. When used with function calls, it returns undefined if the given function does not exist.

>      There a lot of advantages, one of them would be that your code is more readable.
>      I could say that your code is cleaner as well.

       Like the example below

>     WITHOUT optional chaining operator:
>     (user.address && user.address.street && user.address.street.name);

>     WITH optional chaining operator:
>     (user?.address?.street?.name)
