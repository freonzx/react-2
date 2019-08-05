import React, { Component } from 'react'
import { Route, matchPath, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import RecipePage from './RecipePage'
import Login from './Login'
import User from './User'
import { slugify } from '../helpers'
import recipes from '../sample_data/recipes.json'
import { withRouter } from 'react-router'

const HomeRoute = ({ searchString }) => (
    <Home recipes={recipes.results} searchString={searchString} />
)
const LoginRoute = () => <Login />
const ProfileRoute = () => <User />
const RecipePageRoute = ({ recipe }) => {
    return <RecipePage recipe={recipe} />
}

class App extends Component {
    handleChangeSearchBar = e => {
        this.props.history.push(e.target.value)
    }

    searchString = () => {
        const match = matchPath(this.props.location.pathname, {
            path: '/:searchString',
            exact: true
        })
        return match ? match.params.searchString : ''
    }

    filterSingleRecipe = () => {
        const match = matchPath(this.props.location.pathname, {
            path: '/recipe/:searchString',
            exact: true
        })
        const searchString = match ? match.params.searchString : ''

        const recipe = recipes.results.filter(recipe => {
            return slugify(recipe.title) === searchString
        })

        return recipe.shift()
    }

    render() {
        const searchString = this.searchString()
        const singleRecipe = this.filterSingleRecipe()

        return (
            <div className='App'>
                <Navbar
                    searchString={searchString}
                    change={this.handleChangeSearchBar}
                />
                <div className='container mt-10'>
                    <Switch>
                        <Route path='/user/login' component={LoginRoute} />
                        <Route path='/user/profile' component={ProfileRoute} />
                        <Route
                            path='/recipe/:recipe'
                            component={props => {
                                return <RecipePageRoute recipe={singleRecipe} />
                            }}
                        />
                        <Route
                            path='/'
                            component={props => {
                                return <HomeRoute searchString={searchString} />
                            }}
                        />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(App)
