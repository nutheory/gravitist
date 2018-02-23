// @flow
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { css } from 'aphrodite'
import { propOr } from 'ramda'
import jwtDecode from 'jwt-decode'
import Avatar from '../assets/avatar'
import GetNotes from '../../queries/note_collections'
import CreateNote from '../../mutations/create_note'
import note from './styles/notes'

type Props = {
  model: string,
  modelId: number,
  placeholderText?: string,
  createdNote: Function,
  submitNote: Function
}

type State = {
  body: string
}

class NoteForm extends Component<Props, State> {

  handleInputChange: Function
  handleSubmit: Function

  constructor(props: Object){
    super(props)

    this.state = {
      body: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e: SyntheticInputEvent<HTMLInputElement>){
    this.setState({ body: e.currentTarget.value })
  }

  async handleSubmit(){
    if( this.state.body.length > 2 ){
      const resolved = await this.props.submitNote({
        model: this.props.model,
        modelId: this.props.modelId,
        note: { body: this.state.body } })
      this.setState({ body: "" })
    }
  }

  render(){
    const user = jwtDecode(localStorage.getItem('hf_auth_header_token'))
    return(
      <div className={`columns`}>
        <div className={`column`}>
          <div className="field">
            <div className="control">
              <textarea
                className={`textarea ${css(note.textbox)}`}
                onChange={ this.handleInputChange }
                value={ this.state.body }
                placeholder={ this.props.placeholderText ? this.props.placeholderText : 'Add a note.'}>
              </textarea>
            </div>
          </div>
        </div>
        <div className={`column is-narrow`}>
          <button
            className={`button ${css(note.submitButton)}`}
            onClick={ this.handleSubmit }>
            <i className="far fa-comment-alt fa-2x" />
          </button>
        </div>
      </div>
    )
  }
}

export default graphql(CreateNote, {
  props: ({ ownProps, mutate }) => ({
    submitNote: (props) => mutate({
      variables: { input: props },
      refetchQueries: [{
        query: GetNotes,
        variables: { input: {
          model: props.model,
          modelId: props.modelId } } }]
    }) })
})(NoteForm)
