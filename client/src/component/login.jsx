import { Form, Icon, Input, Button, message } from 'antd'
import styles from './styles'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'
import fetch from '$fetch'
const FormItem = Form.Item

@Form.create()
@withRouter
class Login extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields( async(err, values) => {
      if (!err) {
        await fetch('/api/admin/session', {
          method: 'POST',
          body: values
        })
        this.props.router.push('console')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div  className = { styles.login }>
        <Form className = { styles.login__form } onSubmit = { this.handleSubmit }>
        <h3 className = { styles.login__form__title }>欢迎来聊天</h3>
          <FormItem>
            { getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input placeholder = "Username" prefix = { <Icon style = { { color: 'rgba(0,0,0,.25)' } } type = "user" /> } />
            ) }
          </FormItem>
          <FormItem>
            { getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input placeholder = "Password" prefix = { <Icon style = { { color: 'rgba(0,0,0,.25)' } } type = "lock" /> } type = "password" />
            ) }
          </FormItem>
          <FormItem>
            <Button className = { styles.login__form__submit } htmlType = "submit" type = "primary">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Login