import Taro from '@tarojs/taro'
import { testApi } from '@/network/test.ts'
import { Button, Text, View } from '@tarojs/components'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import './index.scss'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}

@inject('store')
@observer
class Index extends Component {
  state = {
    date: '',
    show: false
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  increment = () => {
    const { counterStore } = this.props.store
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props.store
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props.store
    testApi('当前等级： ' + counterStore.counter).then(res => {
      console.log(res)
    })
    setTimeout(() => {
      Taro.navigateTo({
        url: '/pages/login/index'
      })
    }, 1500);
    counterStore.incrementAsync()
  }

  private onDisplay = () => {
    this.setState({ show: true })
  }

  private onClose = () => {
    this.setState({ show: false })
  }

  formatDate(date: Date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  private onConfirm = (event: any) => {
    this.setState({
      show: false,
      date: this.formatDate(event.detail),
    });
  }

  render () {
    const { counterStore: { counter } } = this.props.store
    const { date, show } = this.state
    const { onDisplay, onClose, onConfirm } = this

    return (
      <View className='index'>
        <van-notify id='van-notify'></van-notify>

        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>

        <van-cell title='选择单个日期' value={{ date }} onClick={onDisplay} />
        <van-calendar show={show} onClose={onClose} onConfirm={onConfirm}>
        </van-calendar>
      </View>
    )
  }
}

export default Index
