import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirectToMainScreen, openSelectBucketScreen } from '../reducers/navigation/navigationActions';
import { imageViewerActions } from '../reducers/mainContainer/Files/filesReducerActions';
import ServiceModule from '../utils/ServiceModule';
import TabBarActionModelFactory from '../models/TabBarActionModel';
import ImageViewComponent from "../components/ImageViewerComponent";
import BaseFileViewerContainer from '../containers/BaseFileViewerContainer';

class ImageViewerContainer extends BaseFileViewerContainer {
    constructor(props) {
        super(props);
    }
    //ACTIONS

    tryCopySelectedFile() {
        this.props.openSelectBucketScreen(this.copySelectedFile.bind(this));
    }

    copySelectedFile(params) {
        let bucketId = params.bucketId;

        if(bucketId) {
            ServiceModule.uploadFile(bucketId, this.localPath);
        }
    }

    getActionBarActions() {
        return [
            TabBarActionModelFactory.createNewAction(
                () => { this.setFavourite(); }, 
                this.props.isStarred ?
                    require('../images/ActionBar/UnsetFavourite.png') :
                    require('../images/ActionBar/FavoritesIcon.png')
            ),
            TabBarActionModelFactory.createNewAction(() => { this.tryCopySelectedFile()}, require('../images/ActionBar/CopyBucketIcon.png')),
            TabBarActionModelFactory.createNewAction(() => { this.tryDeleteFile(); }, require('../images/ActionBar/TrashBucketIcon.png'))
        ];
    }
    //ACTIONS END

    cacheLocalPath() {
        if(this.props.localPath) {
            this.localPath = this.props.localPath;
        } 
    }

    render() {
        this.cacheLocalPath();

        if(this.props.isDownloaded) {
            this.showProgress = false;
        }

        return(
            <ImageViewComponent
                showProgress = { this.showProgress }
                onShare = { this.share }
                isLoading = { this.props.isLoading }
                isDownloaded = { this.props.isDownloaded }
                progress = { this.props.progress }
                onBackPress = { this.navigateBack }
                fileUri = { { uri: "file://" + this.props.localPath } }
                showActionBar = { this.state.showActionBar }
                onOptionsPress = { this.toggleActionBar }
                buckets = { this.props.buckets }
                actionBarActions = { this.getActionBarActions() } />
        );   
    }
}

function mapStateToProps(state) {
    let index = state.navReducer.index;
    let fileId = state.navReducer.routes[index].routeName === "ImageViewerScreen" ? state.navReducer.routes[index].params.fileId : null;
    let file = state.filesReducer.fileListModels.find((item) => item.getId() === fileId);
    let isStarred = false;
    let isLoading = false;
    let isDownloaded = false;
    let progress = 0;
    let localPath = null;
    let fileRef = 0;

    if(file) {
        isStarred = file.getStarred();
        isLoading = file.isLoading;
        isDownloaded = file.entity.isDownloaded;
        progress = file.progress;
        localPath = file.entity.localPath;
        fileRef = file.fileRef ? file.fileRef: fileRef;
    }
        
    return {
        isStarred,
        isLoading,
        isDownloaded,
        progress,
        localPath,
        fileRef,
        isGridViewShown: state.mainReducer.isGridViewShown,
        buckets: state.bucketReducer.buckets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ redirectToMainScreen, ...imageViewerActions, openSelectBucketScreen }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewerContainer);