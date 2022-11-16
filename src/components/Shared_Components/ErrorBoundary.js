import React, { Component } from 'react'

export class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state={
            hasError:false
        }
    }

    componentDidCatch(error){
        this.setState({hasError:true})
    }

  render() {
    if(this.state.hasError){
        return(
            <h1>Some server error</h1>
        )
    }
    return(
        this.props.children
    )
  }
}

export default ErrorBoundary