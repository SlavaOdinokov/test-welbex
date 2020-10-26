import React, {Component} from 'react'

export default class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            col: 'Name',
            condition: 'Равно',
            text: '',
            search: false
        }

        this.onUpdateFilter = this.onUpdateFilter.bind(this)
        this.onReset = this.onReset.bind(this)
    }

    onReset() {
        document.querySelector('#col').value = 'Name'
        document.querySelector('#condition').value = 'Равно'
        document.querySelector('#text').value = ''

        const col = document.querySelector('#col').value
        const condition = document.querySelector('#condition').value
        const text = document.querySelector('#text').value
        const search = false

        this.setState({col, condition, text, search})
        this.props.onReset(col, condition, text, search)
    }

    onUpdateFilter() {
        const col = document.querySelector('#col').value
        const condition = document.querySelector('#condition').value
        const text = document.querySelector('#text').value
        const search = true

        this.setState({col, condition, text, search})
        this.props.onUpdateFilter(col, condition, text, search)
    }

    render() {

        return (
            <div className="filter-wrapper">
                <select id="col">
                    <option>Name</option>
                    <option>Number</option>
                    <option>Distance</option>
                </select>
                <select id="condition">
                    <option>Равно</option>
                    <option>Содержит</option>
                    <option>Больше</option>
                    <option>Меньше</option>
                </select>
                <input id="text" type="text"/>
                <button onClick={this.onUpdateFilter} className="btn-search" type="button">Найти</button>
                <button onClick={this.onReset} className="btn-reset" type="button">Сбросить</button>
            </div>
        )
    }
}
