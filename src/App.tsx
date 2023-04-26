import { Routes, Route, Navigate } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { Provider } from "react-redux";
import store from "store";

// graphql uri
const uri = process.env.NODE_ENV === "development" ? 'http://localhost:5000/graphql' : "https://galaxy-backend-production.up.railway.app/graphql";

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Initialize Apollo Client
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Routes>
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={AdminLayout} />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
        <ToastContainer />
      </Provider>
    </ApolloProvider>
  );
};

export default App;
