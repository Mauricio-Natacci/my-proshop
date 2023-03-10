export type User = {
  _id: string
  name: string
  email: string
  isAdmin: boolean
}

export type StateUserInfo = {
  userLogin: {
    loading: boolean
    error: string
    userInfo: {
      login: User
    }
  }
}

export type LoginScreenProps = {
  location: {
    search: string
  }
  history: {
    push: (url: string) => void
  }
}
