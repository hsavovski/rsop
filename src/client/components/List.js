import React, { Component } from 'react';

export default class List extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            searchString: "",
            option: props.option
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleList = this.handleList.bind(this);

        this.entityName = props.entityName;
        this.model = props.model;

        if(this.props.filter == null)
        {
            this.filter = () => {return true};
        }
        else
        {
            this.filter = this.props.filter;
        }
    }

    componentDidMount()
    {
        this.model.on(this.entityName, this.handleList);
    }

    componentWillUnmount()
    {
        this.model.removeListener(this.entityName, this.handleList);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleList()
    {
        this.forceUpdate();
    }

    rowRenderer(entity)
    {
        var line = "";

        for (var name in entity) {
            line += name + "  :  " + entity[name] + "  ,";
        }
        return <div>
            {line}
        </div>
    }

    get list()
    {
        var option = this.state.option,
            searchString = this.state.searchString,
            entity = this.model[this.entityName];

        let list = [];

        for (var i in entity) {
            if(this.filter(entity[i]))
            {
                var searchIndex = "" + entity[i][option];
                if(searchIndex.indexOf(searchString) >= 0)
                {
                    if (this.props.renderRow != null) {
                        var row = React.createElement(this.props.renderRow, {element:entity[i]});
                        row.key = i;
                        list.push(row);
                    }
                    else {
                        list.push(this.rowRenderer(entity[i]));
                    }
                }
            }
        }

        if(this.props.sort != null)
        {
            list = list.sort(this.props.sort);
        }

        return list
    }

    updateOptionList(){

        if(this.state.option == null)
        {
            var entity = this.model[this.entityName];
            this.options = [];

            for (var i in entity[Object.keys(entity)[0]])
            {
                this.options.push(<option value={i}>{i}</option>)
            }
            if(this.options.length > 0) {
                this.setState({option: this.options[0].props.value})
            }
        }
    }
    
    render() {
        if (this.model[this.entityName] == null) {
            return (
				<div>
					Loading {this.entityName} data
				</div>
            );
        }

        this.updateOptionList();
        return (
			<div>
                {this.props.search && (
                    <section >
                    <form>
                        <label>
                            <input
                                name="searchString"
                                type="text"
                                placeholder="Търсене..."
                                value={this.state.searchString}
                                onChange={this.handleInputChange}/>
                        </label>

                        {this.props.option == null &&
                        (<select
                            name="option"
                            value={this.state.option}
                            onChange={this.handleInputChange}>
                            {this.options}
                        </select>)}
                    </form>
                </section>)}

                {this.list}

			</div>
        );
    }
}
