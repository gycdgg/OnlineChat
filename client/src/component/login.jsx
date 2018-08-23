import { Form, Icon, Input, Button, Radio } from 'antd'
import styles from './styles'
import PropTypes from 'prop-types'
import React from 'react'
const FormItem = Form.Item
import { connect } from 'react-redux'
import * as userAction from '../action/user'

@Form.create()
@connect(({ user }) => ({ user }), (dispatch) => ({
  login: (...args) => dispatch(userAction.login(...args))
} ))

class Login extends React.Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  state = {
    action: 'login'
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const random = Math.ceil(Math.random() * 20)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(Object.assign({}, values, this.state, { avatar: random }))
      }
    })
  }

  handleRadioChange = (e) => {
    this.setState({ action: e.target.value })
    this.props.form.setFieldsValue({
      userName: '',
      password: ''
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    let { action } = this.state
    return (
      <div  className = { styles.login }>
        <Form className = { styles.login__form } onSubmit = { this.handleSubmit }>
        <h3 className = { styles.login__form__title }>欢迎来聊天室</h3>
        <div className = { styles.login__form__img }><img src = { `/avatar/img${18}.jpg` }/></div>
        <FormItem >
            <Radio.Group value = { action } onChange = { this.handleRadioChange } buttonStyle = "solid" style = { { width: '100%' } }>
              <Radio.Button value = "login" style = { { width: '50%', textAlign: 'center' } }>登录</Radio.Button>
              <Radio.Button value = "register"  style = { { width: '50%', textAlign: 'center' } }>注册</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem>
            { getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input placeholder = "用户名" prefix = { <Icon style = { { color: 'rgba(0,0,0,.25)' } } type = "user" /> } />
            ) }
          </FormItem>
          <FormItem>
            { getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input placeholder = "密码" prefix = { <Icon style = { { color: 'rgba(0,0,0,.25)' } } type = "lock" /> } type = "password" />
            ) }
          </FormItem>
          <FormItem>
            <Button className = { styles.login__form__submit } htmlType = "submit" type = "primary">
              { action === 'login' ? '登录' : '注册' } 
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Login