import { testApi } from '@/network/test.ts'
import { Button, Text, View } from '@tarojs/components'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.scss'

type PageStateProps = {
  store: {
  }
}

type PageStates = {
  counter: number
}

interface Login {
  props: PageStateProps;
  state: PageStates
}

@inject('store')
@observer
class Login extends Component<PageStateProps, PageStates> {
  constructor(props: Readonly<PageStateProps>) {
    super(props)
    this.state = {
      counter: 0
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  incrementAsync = () => {
    testApi('当前等级： ' + this.state.counter).then(res => {
      this.setState(prevState => {
        return {
          counter: prevState.counter + 1
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const { counter } = this.state
    const { incrementAsync } = this

    return (
      <View className='login'>
        <van-notify id='van-notify'></van-notify>

        <Button onClick={incrementAsync}>异步添加</Button>
        <Text>{counter}</Text>
      </View>
    )
  }
}

export default Login
