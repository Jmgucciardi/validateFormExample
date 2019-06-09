import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import Input from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

// TODO: new text color theme, errors should all be red.


class Login extends Component {
    constructor() {
        super()

        this.state = {
            dialogActive: false,
            isAuthenticating: false,
            formValue: {
                username: '',
                usernameField: '',
                password: '',
                passwordField: ''
            },

            error: {
                username: null,
                password: null,
                unAuthorized: null,
            },
        }
    }

    validateForm = (body) => {
        const { error, formValue } = this.state
        const errors = this.state.error
        const usernameLength = formValue.username.length
        const passwordLength = formValue.password.length

        if (usernameLength === 0) {
            errors.username = 'Username is blank'
        }

        else {
            errors.username = null
        }
        if (passwordLength === 0) {
            errors.password = 'Password is blank'
        }

        else {
            errors.password = null
        }


        this.setState({ error: errors })

        return !error.username && !error.password
    }


    login = (data) => {
        if (this.validateForm(data)) {
            this.setState({ loading: true })

            if (this.props.login(data)) {
                return this.props.login(data)
            }
            else {
                this.state.error.unAuthorized = 'Invalid Username or Password'
                this.setState({
                    dialogActive: true
                })

            }
        }
    }

    handleInput = ({ target: { name, value } }) => {
        const formValue = { ...this.state.formValue, [name]: value }
        this.setState({ formValue })
    }

    handlePost = (e) => {
        return this.login(this.state.formValue)
    }

    handleRequestClose = () => {
        this.setState({
            dialogActive: false
        })
    }


    render({ handleInput, handlePost } = this) {
        const standardActions = (
            <FlatButton
                label='Ok'
                primary={Boolean(true)}
                onTouchTap={this.handleRequestClose}
            />

        )
        return (
            <div>
                <div className="DialogContainer">
                    <div className="Dialog">
                        <Dialog
                            open={this.state.dialogActive}
                            title='Oops!'
                            actions={standardActions}
                            onRequestClose={this.handleRequestClose}
                        >
                            {this.state.error.unAuthorized}

                        </Dialog>
                        <form onSubmit={e => {
                            e.preventDefault()

                        }}>
                            <Input type="text" name="username" className="StandardInput" placeholder="Username..."
                               id='username'
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               errorText={this.state.error.username}
                            /><br />

                            <Input type="password" name="password" className="StandardInput" placeholder="Password..."
                               id='password'
                               onKeyUp={handleInput}
                               onChange={(e) => this.handleInput(e)}
                               errorText={this.state.error.password}
                            /><br />

                            <RaisedButton variant="raised" color="secondary" type="submit" onClick={handlePost}> Login </RaisedButton> <br />

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default (Login)