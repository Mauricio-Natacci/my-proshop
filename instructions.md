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
    $$
