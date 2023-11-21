import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import Recipe from './components/Recipe/Recipe.tsx'
import store from './store.ts'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header/Header.tsx'
import CuisineRecipes from './components/CuisineRecipes/CuisineRecipes.tsx'
import Recipes from './components/Recipes/Recipes.tsx'
import Profile from './components/Profile/Profile.tsx'
import "./index.css"
import DietRecipes from './components/DietRecipes/DietRecipes.tsx'
import Favorites from './components/Favorites/Favorites.tsx'
import ShoppingList from './components/ShoppingList'
import ChefProfile from './components/ChefProfile/ChefProfile.tsx'
import Cuisines from './components/Cuisines'
import Diets from './components/Diets'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path:"/",
        element: <App />,
      },
      {
        path: "recipes",
        children: [
          {
            index: true,
            element: <Recipes />
          },
          {
            path: 'cuisines',
            children: [
              {
                index: true,
                element: <Cuisines />,
              },
              {
                path: ':id',
                element: <CuisineRecipes />
              },
            ]
          },
          {
            path:'diets',
            children: [
              {
                index: true,
                element: <Diets />
              },
              {
                path: ':id',
                element: <DietRecipes />
              }
            ]
          },
          {
            path: ":id",
            element: <Recipe />
          },
        ]
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'favorites',
        element: <Favorites />
      },
      {
        path: 'shopping-list',
        element: <ShoppingList />
      },
      {
        path: "users",
        children: [
          {
            path: ":id",
            element: <ChefProfile />
          }
        ]
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
