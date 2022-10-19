import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import { SpotifyService } from "../../../services/SpotifyService";

export default class Discover extends Component {
  service;
  constructor() {
    super();
    this.service = new SpotifyService();
    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }
  async loadNewReleases() {
    await this.service.getNewReleases().then((data) => {
      this.setState({
        newReleases: data ? data.albums.items : this.state.newReleases,
      });
    });
  }
  async loadPlaylists() {
    await this.service.getFeaturedPlaylists().then((data) => {
      this.setState({
        playlists: data ? data.playlists.items : this.state.playlists,
      });
    });
  }
  async loadCategories() {
    await this.service.geBrowseCategories().then((data) => {
      this.setState({
        categories: data ? data.categories.items : this.state.categories,
      });
    });
  }
  async componentDidMount() {
    const {newReleases, playlists, categories} =this.state
    const [fetchedNewReleases, fetchedPlaylists, fetchedCategories] = await Promise.all([
      this.service.getNewReleases(),
      this.service.getFeaturedPlaylists(),
      this.service.geBrowseCategories(),
    ]);
    this.setState({
      newReleases: fetchedNewReleases ? fetchedNewReleases.albums.items : newReleases,
      playlists: fetchedPlaylists ? fetchedPlaylists.playlists.items : playlists,
      categories: fetchedCategories ? fetchedCategories.categories.items : categories,
    });
  }
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
