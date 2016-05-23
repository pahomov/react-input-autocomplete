import React, {Component} from 'react'
import AutocompleteStyle from './Autocomplete.scss'
import AutocompleteItem from './AutocompleteItem.jsx'

export default class Autocomplete extends Component{
  constructor(props){
    super(props)
    this.state = {
      items: []
    }
    this.itemsList = []
    this.cursor = -1
    this.props.fetch().then((res) => {
      this.itemsList = res
      if (this.props.valueLink.value) this.setState({items: this.findItems(this.props.valueLink.value)})
    })
  }
  findItems(string) {
    let items = this.itemsList.filter(item => item.name.toLowerCase().indexOf(string.toLowerCase()) === 0).slice(null, 5)
    items = items.map((item, key) => {
      item.setCurrent = () => {
        this.props.valueLink.requestChange(item.name)
      }
      return item
    })
    return items
  }
  handleChange(e){
    let val = e.target.value
    this.props.valueLink.requestChange(val)
    if (val) {
      this.setState({items: this.findItems(val)})
    } else {
      this.setState({items: []})
    }
  }
  handleKeyUp(e){
    let key = e.keyCode
    let keys = {up: 38, down: 40, enter: 13, esc: 27}
    let itemLen = this.state.items.length

    if (itemLen && this.cursor < itemLen-1 && key === keys.down) {
      this.cursor++
      this.setCurrentItem(this.cursor)
    } else if (itemLen && this.cursor > 0 && key === keys.up) {
      this.cursor--
      this.setCurrentItem(this.cursor)
    } else if (itemLen && this.cursor !== itemLen-1) {
      this.cursor = -1
    } else if (key === keys.enter || key === keys.esc) {
      this.hideItems()
    } else if (![38, 40, 13, 27].includes(key)) {
      this.showItems()
    }
  }
  setCurrentItem(cursor){
    let {items} = this.state
    items = items.map(item => {
      item.cursor = false
      return item
    })
    items[cursor].cursor = true
    this.setState({items})
    this.props.valueLink.requestChange(this.state.items[cursor].name)
  }
  hideItems(){
    this.setState({isItemsHidden: true})
  }
  showItems(){
    this.setState({isItemsHidden: false, items: this.findItems(this.props.valueLink.value)})
  }
  handleFocus(){
    this.props.valueLink.value && this.showItems()
  }
  handleBlur(){
    setTimeout(() => {
      this.hideItems()
    }, 200)
  }
  handleClick(){
    this.props.valueLink.value && this.showItems()
  }
  render(){
    return <div className="autocomplete">
      <input
        className="autocomplete__input"
        type='text'
        value={this.props.valueLink.value}
        onChange={this.handleChange.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        onClick={this.handleClick.bind(this)}
      />

      {!this.state.isItemsHidden && (<div className="autocomplete__item-list">{this.state.items.map(this.props.itemRender)}</div>)}
    </div>
  }
}

Autocomplete.propTypes = {
  valueLink: React.PropTypes.object.isRequired,
  fetch: React.PropTypes.func.isRequired,
  itemRender: React.PropTypes.func.isRequired
}
