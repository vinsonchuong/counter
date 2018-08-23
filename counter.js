import * as React from 'react'
import fetch from 'cross-fetch'

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0
        };
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:9090');
        const initialCount = await response.json();

        this.setState({
            count: initialCount
        })
    }

    increment(x) {
        this.setState({
            count: this.state.count + x
        });
    }

    render() {
        return (
            <div>
                <div className="counter">{this.state.count}</div>
                <button
                    className="increment"
                    onClick={() => this.increment(1)}
                >
                    Increment
                </button>
                <button
                    className="decrement"
                    onClick={() => this.increment(-1)}
                >
                    Decrement
                </button>
            </div>
        );
    }
}