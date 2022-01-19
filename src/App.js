import React from "react";

import { Grid } from "@material-ui/core";

import youtube from "./api/youtube";
import {SearchBar, VideoDetail, VideoList} from './components'

class App extends React.Component {
  state = {
    videos: [],
    selectedVideos: null
  }
  onVideoSelect = (video) => {
    this.setState({selectedVideos: video})
  }
  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyB3cufxbT2CfjMNCOFbheqkyUoJmM1Vtvg',
        q: searchTerm
    }
    })
    console.log(response)
    this.setState({videos: response.data.items, selectedVideos: response.data.items[0]})
  }
  render() {
    const {selectedVideos, videos} = this.state
    return (
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit}/>
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideos}/>
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
