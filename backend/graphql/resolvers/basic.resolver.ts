import { Query, Resolver } from 'type-graphql'

@Resolver()
export default class BasicResolver {
  @Query(() => String)
  hello() {
    return 'Hello World!'
  }
}
