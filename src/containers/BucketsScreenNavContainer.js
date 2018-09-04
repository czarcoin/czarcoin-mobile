import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import BucketsScreenNavigator from '../navigators/BucketsScreenNavigator';

class BucketsScreenNavContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <BucketsScreenNavigator
                screenProps = { { 
                    animatedScrollValue: this.props.animatedScrollValue,
                    selectedItemId: this.props.selectedItemId,
                    setSelectionId: this.props.setSelectionId
                } }
                navigation = { 
                    addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav
                    })
                } />
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.bucketsScreenNavReducer
    };
}

export default connect(mapStateToProps)(BucketsScreenNavContainer);