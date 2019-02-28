import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from 'src/app/interfaces/IMovie';

import { Clipboard } from '@ionic-native/clipboard/ngx';
import * as firebase from 'firebase';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
})
export class CardMovieComponent implements OnInit {

  @Input() movie: IMovie;
  @Input() AddFavorite: boolean;
  @Input() RemoveFavorite: boolean;
  @Input() AddWatched: boolean;
  @Input() AddSemInteresse: boolean;
  @Input() showLinksDownload: boolean;

  db = firebase.firestore();

  trustedVideoUrl: SafeResourceUrl;
 
  constructor(private clipboard: Clipboard, private domSanitizer: DomSanitizer, private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.movie.trailer);
  }

  getSinopse(description: string): string {
    try {
      return description.substring(description.lastIndexOf('SINOPSE:'));
    } catch (error) {
      return description;
    }
  }

  openLink(url) {
    this.clipboard.copy(url);
    window.open(url, '_system', 'location=yes');
  }

  openTrailer(url) {
    this.youtube.openVideo(this.getVideoIdFromUrl(url));
  }

  getHeithPercent(percent) {
    /// [width]="imgWidth" [height]="imgHeight"
    return LayoutService.getHeightScreenAreaWithPercentage(percent);
  }

  getVideoIdFromUrl(url): string {
    let video_id = url.split('v=')[1];
    if (!video_id) {
      video_id = url.split('/embed/')[1];
      video_id = video_id.substring(0, video_id.indexOf('/'));
    }
    const ampersandPosition = video_id.indexOf('&');
    if (ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }

    return video_id;
  }

  semInteresse(movie) {
    this.db.collection('movies2').doc(movie.id).set({
      interested: 'false'
    }, { merge: true });
  }

  addToFavority(movie) {
    this.db.collection('movies2').doc(movie.id).set({
      favorite: 'true'
    }, { merge: true });
  }

  addTowatched(movie) {
    this.db.collection('movies2').doc(movie.id).set({
      watched: 'true'
    }, { merge: true });
  }
}
