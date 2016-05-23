import React, {Component} from 'react'
import AutocompleteItemStyle from './AutocompleteItem.scss'

export default class AutocompleteItem extends Component{
  handleClick(){
    this.props.item.setCurrent()
  }
  render(){
    return <div
      key={this.props.item.key}
      className={this.props.item.name === this.props.currentValue ? 'autocomplete-item --current' : 'autocomplete-item'}
      onClick={this.handleClick.bind(this)}>
        {this.props.item.name}
    </div>
  }
}

AutocompleteItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  currentValue: React.PropTypes.string.isRequired
}
