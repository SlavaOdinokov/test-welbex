import React, {Component} from 'react'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import Filter from '../filter'

export default class Table extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dataTable: [],
            allDataTable: [],
            offset: 0,
            perPage: 10,
            currentPage: 0,
            col: '',
            condition: '',
            text: '',
            search: false
        }

        this.onUpdateFilter = this.onUpdateFilter.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.onReset = this.onReset.bind(this)
    }

    handlePageClick(e) {
        const selectedPage = e.selected
        const offset = selectedPage * this.state.perPage

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        })

    }

    loadMoreData() {
		const data = this.state.allDataTable
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			dataTable: slice
		})
    }

    componentDidMount() {
        this.loadDB()
    }

    loadDB() {
        axios.get('./api')
            // .then(res => this.setState({dataTable: res.data}))
            .then(res => {
                const data = res.data
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    allDataTable: res.data,
                    dataTable: slice
                })
            })
            .catch(error => console.log(error))
    }

    filterData(data, col, condition, text) {
        const {dataTable} = this.state

        if (text.length === 0) {
            return dataTable
        }

        if (col === 'Name') {
            if (condition === 'Равно') {
                return data.filter(item => {
                    return item.name === text
                })
            } else if (condition === 'Содержит') {
                return data.filter(item => {
                    return item.name.indexOf(text) > -1
                })
            } else if (condition === 'Больше' || condition === 'Меньше') {
                return dataTable
            }
        }

        if (col === 'Number') {
            switch(condition) {
                case 'Равно': 
                    return data.filter(item => {
                        return +item.number === +text
                    })
                case 'Содержит': 
                    return data.filter(item => {
                        return item.number.indexOf(text) > -1
                    })
                case 'Больше': 
                    return data.filter(item => {
                        return +item.number > +text
                    })
                case 'Меньше': 
                    return data.filter(item => {
                        return +item.number < +text
                    })
            }
        }

        if (col === 'Distance') {
            switch(condition) {
                case 'Равно': 
                    return data.filter(item => {
                        return +item.distance === +text
                    })
                case 'Содержит': 
                    return data.filter(item => {
                        return item.distance.indexOf(text) > -1
                    })
                case 'Больше': 
                    return data.filter(item => {
                        return +item.distance > +text
                    })
                case 'Меньше': 
                    return data.filter(item => {
                        return +item.distance < +text
                    })
            }
        }
    }

    onUpdateFilter(col, condition, text, search) {
        this.setState({col, condition, text, search})
    }

    onReset(col, condition, text, search) {
        this.setState({col, condition, text, search})
    }

    render() {
        const {dataTable, allDataTable, col, condition, text, search} = this.state
        let visibleData = []

        if (search) {
            visibleData = this.filterData(allDataTable, col, condition, text)
        } else {
            visibleData = this.filterData(dataTable, col, condition, text)
        }
        
        const data = visibleData.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}.</td>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.distance}</td>
                </tr>
            )
        })

        return (
            <div className="container">
                <Filter onUpdateFilter={this.onUpdateFilter} onReset={this.onReset}/>
                <div className="wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Number</th>
                                <th>Distance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data}
                        </tbody>
                    </table>
                </div>
                <div className="wrapper">
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </div>
        )
    }
}
