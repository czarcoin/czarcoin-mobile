import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Switch,
    Image
} from 'react-native';
import React, { Component } from 'react';
import { getHeight, getWidth } from '../../utils/adaptive';

export default class SettingsComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
            isSyncOn: false,
            isWifiOnly: false,
            isOnlyWhenCharging: false,
            isPhotoSync: false,
            isFilesSync: false
        }
    }

    render() {
        return(
            <View style = { styles.mainContainer } >
                <View style = { styles.topContainer } >
                    <View style = { styles.topContentContainer } >
                        <TouchableOpacity 
                            onPress = { () => { this.props.navigation.goBack(); } }
                            style = { styles.backButtonContainer } >
                            <Image 
                                source = { require('../../images/MyAccount/BlueBackButton.png') }
                                style = { styles.icon } />
                        </TouchableOpacity>
                        <Text style = { [styles.titleText, styles.titleMargin] }>Settings</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator = { false } >
                    <View style = { styles.explanationContainer }>
                        <Text style = { styles.explanationText }>Sync options</Text>
                    </View>
                    <View style = { styles.optionsContainer }>
                        <Text style = { styles.switchText }>Sync on</Text>
                        <Switch 
                            onTintColor = { '#2794FF' } 
                            tintColor = { 'rgba(56, 75, 101, 0.2)' } 
                            thumbTintColor = { '#FFFFFF' }
                            onValueChange = { () => { this.setState({isSyncOn: !this.state.isSyncOn}); } }
                            value = { this.state.isSyncOn } />
                    </View>
                    <View style = { styles.underline }/>
                    <View style = { styles.optionsContainer }>
                        <Text style = { styles.switchText }>Wi-Fi only</Text>
                        <Switch 
                            onTintColor = { '#2794FF' } 
                            tintColor = { 'rgba(56, 75, 101, 0.2)' } 
                            thumbTintColor = { '#FFFFFF' }
                            onValueChange = { () => { this.setState({isWifiOnly: !this.state.isWifiOnly}); } }
                            value = { this.state.isWifiOnly } />
                    </View>
                    <View style = { styles.underline }/>
                    <View style = { styles.optionsContainer }>
                        <Text style = { styles.switchText }>Only when charging</Text>
                        <Switch 
                            onTintColor = { '#2794FF' } 
                            tintColor = { 'rgba(56, 75, 101, 0.2)' } 
                            thumbTintColor = { '#FFFFFF' }
                            onValueChange = { () => { this.setState({isOnlyWhenCharging: !this.state.isOnlyWhenCharging}); } }
                            value = { this.state.isOnlyWhenCharging } />
                    </View>
                    <View style = { styles.underline }/>
                    <View style = { styles.checkboxPhotosContainer }>
                        <TouchableOpacity onPress = { () => { this.setState({isPhotoSync: !this.state.isPhotoSync}); } } >
                            <Image 
                                style = { styles.icon } 
                                source = { 
                                    this.state.isPhotoSync 
                                    ? require('../../images/Icons/ListItemSelected.png')
                                    : require('../../images/Icons/ListItemUnselected.png') } />
                        </TouchableOpacity>
                        <Text style = { [styles.switchText, styles.checkboxTextMargin ] } >Sync photos</Text>
                    </View>
                    <View style = { styles.underline }/>
                    <View style = { styles.checkboxFilesContainer }>
                        <View style = { styles.flexRow }>
                            <TouchableOpacity onPress = { () => { this.setState({isFilesSync: !this.state.isFilesSync}); } } >
                                <Image 
                                    style = { styles.icon } 
                                    source = { 
                                        this.state.isFilesSync 
                                        ? require('../../images/Icons/ListItemSelected.png')
                                        : require('../../images/Icons/ListItemUnselected.png') } />
                            </TouchableOpacity>
                            <Text style = { [styles.switchText, styles.checkboxTextMargin ] } >Sync files</Text>
                        </View>
                        <TouchableOpacity style = { styles.expanderIconContainer }>
                            <Image
                                source = { require('../../images/DashboardScreen/BlueVector.png') }
                                style = { styles.expanderIcon } />
                        </TouchableOpacity>
                    </View>
                    <View style = { styles.explanationContainer }>
                        <Text style = { styles.explanationText }>Security</Text>
                    </View>
                    <TouchableOpacity style = { styles.optionsContainer }>
                        <Text style = { styles.switchText }>Secret phrase</Text>
                        <View style = { styles.expanderIconContainer }>
                            <Image
                                source = { require('../../images/DashboardScreen/BlueVector.png') }
                                style = { styles.expanderIcon } />
                        </View>
                    </TouchableOpacity>
                    <View style = { styles.underline }/>
                    <TouchableOpacity style = { styles.optionsContainer } onPress = { () => { this.props.navigation.navigate('ChangePasswordScreen') } } >
                        <Text style = { styles.switchText }>Change password</Text>
                        <View style = { styles.expanderIconContainer }>
                            <Image
                                source = { require('../../images/DashboardScreen/BlueVector.png') }
                                style = { styles.expanderIcon } />
                        </View>
                    </TouchableOpacity>
                    <View style = { styles.underline }/>
                    <TouchableOpacity style = { styles.optionsContainer }>
                        <Text style = { styles.switchText }>Change PIN</Text>
                        <View style = { styles.expanderIconContainer }>
                            <Image
                                source = { require('../../images/DashboardScreen/BlueVector.png') }
                                style = { styles.expanderIcon } />
                        </View>
                    </TouchableOpacity>
                    <View style = { styles.underline }/>
                    <TouchableOpacity style = { styles.optionsContainer }>
                        <Text style = { styles.switchText }>Change email</Text>
                        <View style = { styles.expanderIconContainer }>
                            <Image
                                source = { require('../../images/DashboardScreen/BlueVector.png') }
                                style = { styles.expanderIcon } />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = { styles.deleteAccountButton }>
                            <Text style = { styles.deleteAccountText }>Delete account</Text>
                        </View>
                    </TouchableOpacity>
                    <View style = { styles.bottomPadding }/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        backgroundColor: '#FFFFFF',
        paddingHorizontal: getWidth(20)
    },
    topContainer: {
        height: getHeight(55)
    },
    topContentContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: getHeight(15)
    },
    backButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: { 
        fontFamily: 'Montserrat-Bold', 
        fontSize: getHeight(30), 
        lineHeight: getHeight(33),
        color: '#384B65' 
    },
    titleMargin: {
        marginLeft: getWidth(20),
    },
    icon: {
        height: getHeight(24),
        width: getWidth(24)
    },
    explanationText: {
        fontFamily: 'Montserrat-Regular', 
        marginTop: getHeight(10),
        fontSize: getHeight(14), 
        lineHeight: getHeight(17),
        color: 'rgba(56, 75, 101, 0.4)',
    },
    explanationContainer: {
        height: getHeight(54),
        justifyContent: 'center'
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: getHeight(55)
    },
    switchText: {
        fontFamily: 'Montserrat-Regular', 
        fontSize: getHeight(16), 
        lineHeight: getHeight(20),
        color: '#384B65' 
    },
    checkboxPhotosContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: getHeight(55)
    },
    checkboxFilesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: getHeight(55)
    },
    checkboxTextMargin: {
       marginLeft: getWidth(15) 
    },
    flexRow: {
        flexDirection: 'row'
    },
    expanderIconContainer: {
        height: getHeight(24),
        width: getWidth(24),
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    expanderIcon: {
        height: getHeight(12),
        width: getWidth(7)
    },
    underline: {
        height: 0.5,
        backgroundColor: 'rgba(56, 75, 101, 0.2)'
    },
    deleteAccountButton: { 
        width: getWidth(335),
        height: getHeight(50),
        borderRadius: 6,
        borderWidth: getWidth(1.5),
        borderColor: '#EB5757',
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteAccountText: { 
        fontFamily: 'Montserrat-SemiBold', 
        fontSize: getHeight(16), 
        color: '#EB5757' 
    },
    bottomPadding: {
        height: getHeight(70)
    }
});