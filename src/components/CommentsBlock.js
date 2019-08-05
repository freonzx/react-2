import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import commentsService from './../services/commentsService'
import { withRouter } from 'react-router-dom'
import { throws } from 'assert'
import { getUser, isLogged } from './../services/loginService'

class CommentsBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            comment: '',
            user: null
        }
    }

    componentDidMount() {
        const recipeSlug = this.props.match.params.recipe
        this.setState({
            comments: commentsService.get(recipeSlug)
        })
        if (isLogged()) {
            this.setState({ user: getUser().username })
        }
    }

    handleDelete = comment => {
        const recipeSlug = this.props.match.params.recipe
        commentsService.delete(recipeSlug, comment)

        const { comments } = this.state
        const newComments = comments.filter(e => {
            return comment.comment !== e.comment
        })
        this.setState({ comments: newComments })
    }

    renderComment = (comment, key) => (
        <div key={key} className='Comment media text-muted pt-3'>
            <FontAwesomeIcon className='mr-2' size='3x' icon='user-circle' />
            <p className='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'>
                <strong className='d-block text-gray-dark'>
                    @{comment.author}
                </strong>
                {comment.comment}
            </p>
            {/* Icone deve aparecer somente quando o comentario for do usuario logado */}
            {comment.author === this.state.user ? (
                <FontAwesomeIcon
                    icon='trash'
                    onClick={() => this.handleDelete(comment)}
                />
            ) : null}
        </div>
    )

    handleSubmit = e => {
        //e.preventDefault()
        const recipeSlug = this.props.match.params.recipe
        const { comment } = this.state
        commentsService.insert(recipeSlug, { comment })
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        const { comments } = this.state
        return (
            <div className='text-left'>
                <div className='my-3 p-3 bg-white rounded shadow-sm'>
                    <h6 className='border-bottom border-gray pb-2 mb-0'>
                        Comments
                    </h6>
                    {comments.map((e, key) => {
                        return this.renderComment(e, key)
                    })}
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='exampleInputEmail1'>Comment</label>
                        <textarea
                            disabled={!isLogged()}
                            value={this.state.comment}
                            onChange={this.handleChange}
                            required='required'
                            className='form-control'
                            id='comment'
                            placeholder='Insert your comment here'
                        />
                    </div>
                    <button
                        disabled={!isLogged()}
                        type='submit'
                        className='btn btn-primary'
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(CommentsBlock)
