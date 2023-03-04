import React from 'react'
import ReactDOM from 'react-dom/client'
import './bootstrap.min.css'
import { App } from './App'
import { reportWebVitals } from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './store'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql/service'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)

reportWebVitals()
