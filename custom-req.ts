declare module 'express-serve-static-core' {
  interface Request {
    user: { _id: string }
    file: { path: string; location: string }
  }
}

export {}
