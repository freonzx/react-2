import React from 'react'
import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'
import { withRouter } from 'react-router-dom'

const Home = ({ recipes = [], match }) => {
    const { searchString } = match.params

    if (searchString) {
        const filteredRecipes = recipes.filter(recipe => {
            return (
                recipe.title.toLowerCase().indexOf(searchString) !== -1 ||
                recipe.ingredients.toLowerCase().indexOf(searchString) !== -1
            )
        })

        if (filteredRecipes.length > 0) {
            return (
                <div className='row'>
                    {filteredRecipes.map((recipe, key) => {
                        return (
                            <RecipeItem
                                key={key}
                                item={recipe}
                                mark={searchString}
                            />
                        )
                    })}
                </div>
            )
        }
        return <h1>Recipe not found</h1>
    }
    return (
        <div className='row'>
            {recipes.map((recipe, key) => {
                return (
                    <RecipeItem key={key} item={recipe} mark={searchString} />
                )
            })}
        </div>
    )
}

Home.propTypes = {
    searchString: PropTypes.string,
    recipes: PropTypes.array
}

export default withRouter(Home)
