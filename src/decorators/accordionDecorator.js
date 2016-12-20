//decorator === HOC(Higher Order Component)
import React from 'react'

export default function accordionDecorator(Component) {
    return class WrapperComponent extends React.Component {
        state = {
            openArticleId: null,
        }
        render() {
            return <Component {...this.props} {...this.state} toggleOpen = {this.toggleOpen}/>
        }

        toggleOpen = id => ev => {
            if (id == this.state.openArticleId) {
                this.setState({
                    openArticleId: null
                })
            } else {
                this.setState({
                    openArticleId: id
                })
            }
        }
    }
}