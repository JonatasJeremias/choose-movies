import { Component, OnInit } from '@angular/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { IMovie } from '../interfaces/IMovie';
import * as firebase from 'firebase';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  movies: IMovie[];
  firstMovie: IMovie;
  secondMovie: IMovie;
  thirdMovie: IMovie;
  moviesImdbError: IMovie[];
  allMovies: IMovie[];
  infos = [];
  // ref = firebase.database().ref('movies2/');
  db = firebase.firestore();
  loading = false;

  queryFirst: any;
  lastResultQuery: QuerySnapshot;

  constructor(private clipboard: Clipboard,
    public loadingController: LoadingController,
    public alertController: AlertController) {
  }

  ngOnInit(): void {
    this.queryFirst = this.db.collection('movies2')
    .where('interested', '==', 'true')
    .where('watched', '==', 'false')
    .where('favorite', '==', 'false')
    .where('timestamp', '>', 0)
    .orderBy('timestamp', 'desc').limit(3);

    this.getMoviesFirestore(this.queryFirst);
  }


  getQueryNext(lastReturnedQuery) {
    return this.db.collection('movies2')
    .where('interested', '==', 'true')
    .where('watched', '==', 'false')
    .where('favorite', '==', 'false')
    .where('timestamp', '>', 0)
    .orderBy('timestamp', 'desc')
    .startAfter(lastReturnedQuery)
    .limit(3);
  }

  getSecondMovie() {
    return this.movies[1];
  }

  onDismissed(event) {
    console.log(event);
    this.firstMovie = this.secondMovie;
    this.secondMovie = this.thirdMovie;
    event.resetCdkDragEnd();
    this.getMoviesFirestore(this.getQueryNext(this.lastResultQuery.docs[0]));
  }

  filter() {
    // this.movies = this.allMovies.slice();
    // this.movies = this.movies.filter(x => x.interested === 'true');
    // this.movies = this.movies.filter(x => x.watched !== 'true');
    // this.movies = this.movies.filter(x => x.favorite !== 'true');
    // this.movies = this.movies.filter(x => {
    //   if (x.tags.includes('BluRay') || x.tags.includes('DVDRip')
    //     || x.tags.includes('WebDL') || x.tags.includes('Qualidade desconhecida')) {
    //     return true;
    //   } return false;
    // });
  }

  getLinksDownload(links_download) {
    try {
      const links = [];

      Object.keys(links_download).forEach(element => {
        const magnet = require('magnet-uri');
        const parsed = magnet.decode(links_download[element]);
        links.push({ id: element, descricao: parsed.dn, link: links_download[element] });
      });

      return links;
    } catch (error) {
      return [];
    }

  }

  semInteresse(movie) {
    // const update = {};
    // update[movie.id + '/interested'] = 'false';
    // this.ref.update(update);
    // this.filter();

    this.db.collection('movies2').doc(movie.id).set({
      interested: 'false'
    }, { merge: true });
    this.movies.filter(x => x.id === movie.id)[0].interested = 'false';
    this.filter();
  }

  addToFavority(movie) {
    this.db.collection('movies2').doc(movie.id).set({
      favorite: 'true'
    }, { merge: true });
    this.movies.filter(x => x.id === movie.id)[0].favorite = 'true';
    this.filter();
  }

  addTowatched(movie) {
    this.db.collection('movies2').doc(movie.id).set({
      watched: 'true'
    }, { merge: true });
    this.movies.filter(x => x.id === movie.id)[0].watched = 'true';
    this.filter();
  }

  getMoviesFirestore(query) {
    try {
      this.loading = true;
    this.movies = [];
    this.allMovies = [];
    query.get().then(
      data => {
        this.lastResultQuery = data;
        if (data.size > 0) {
          this.firstMovie = {
            id: data.docs[0].id,
            interested: data.docs[0].data().interested,
            descriptions: data.docs[0].data().descriptions,
            downloadLinks: this.getLinksDownload(data.docs[0].data().download_links),
            imageUrl: data.docs[0].data().image_url,
            imdbInfo: data.docs[0].data().imdb_info,
            linkPage: data.docs[0].data().link_page,
            trailer: data.docs[0].data().trailer,
            timestamp: data.docs[0].data().timestamp,
            originalTitle: data.docs[0].data().original_title,
            title: data.docs[0].data().title,
            tags: this.getTagsInTitle(data.docs[0].data().title)
          };
        }

        if (data.size > 1) {
          this.secondMovie = {
            id: data.docs[1].id,
            interested: data.docs[1].data().interested,
            descriptions: data.docs[1].data().descriptions,
            downloadLinks: this.getLinksDownload(data.docs[1].data().download_links),
            imageUrl: data.docs[1].data().image_url,
            imdbInfo: data.docs[1].data().imdb_info,
            linkPage: data.docs[1].data().link_page,
            trailer: data.docs[1].data().trailer,
            timestamp: data.docs[1].data().timestamp,
            originalTitle: data.docs[1].data().original_title,
            title: data.docs[1].data().title,
            tags: this.getTagsInTitle(data.docs[1].data().title)
          };
        }

        if (data.size > 2) {
          this.thirdMovie = {
            id: data.docs[2].id,
            interested: data.docs[2].data().interested,
            descriptions: data.docs[2].data().descriptions,
            downloadLinks: this.getLinksDownload(data.docs[2].data().download_links),
            imageUrl: data.docs[2].data().image_url,
            imdbInfo: data.docs[2].data().imdb_info,
            linkPage: data.docs[2].data().link_page,
            trailer: data.docs[2].data().trailer,
            timestamp: data.docs[2].data().timestamp,
            originalTitle: data.docs[2].data().original_title,
            title: data.docs[2].data().title,
            tags: this.getTagsInTitle(data.docs[2].data().title)
          };
        }
      }, error => {
        console.error(error);
        this.presentAlert(error, 'Algo deu errado');
      });
    } catch (error) {
      this.loading = false;
      console.error(error);
      this.presentAlert(error, 'Algo deu errado');
    }
  }

  async presentAlert(message, title) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  openLink(url) {
    console.log(url);
    this.clipboard.copy(url);
    // window.open(url, '_system', 'location=yes'); return false;
  }

  getTagsInTitle(title: string): string[] {
    const tags = [];

    // Qualidade
    if (title.toLowerCase().includes('bluray') || title.toLowerCase().includes('blu-ray')) {
      tags.push('BluRay');
    } else if (title.toLowerCase().includes('hdrip') || title.toLowerCase().includes('hd-rip')
    || title.toLowerCase().includes('hd rip')) {
      tags.push('HDRip');
    } else if (title.toLowerCase().includes('dvdrip') || title.toLowerCase().includes('dvd-rip')) {
      tags.push('DVDRip');
    } else if (title.toLowerCase().includes('webdl') || title.toLowerCase().includes('web-dl')) {
      tags.push('WebDL');
    } else if (title.toLowerCase().includes('hdrip') || title.toLowerCase().includes('hd-rip')) {
      tags.push('HDRip');
    } else {
      tags.push('Qualidade desconhecida');
    }

    // Idioma
    if (title.toLowerCase().includes('legendado')) {
      tags.push('Legendado');
    } else if (title.toLowerCase().includes('dublado') || title.toLowerCase().includes('nacional')) {
      tags.push('Dublado');
    } else if (title.toLowerCase().includes('dualaudio') || title.toLowerCase().includes('dual-audio')
    || title.toLowerCase().includes('dual audio')  || title.toLowerCase().includes('dual áudio')) {
      tags.push('DualAudio');
    } else if (title.toLowerCase().includes(' hd ') || title.toLowerCase().includes(' hd\r\n')
    || title.toLowerCase().includes(' hd\n')) {
      tags.push('HD Cinema');
    } else {
      tags.push('Idioma desconhecida');
    }

    // Ano
    if (title.toLowerCase().includes('2019')) {
      tags.push('2019');
    } else if (title.toLowerCase().includes('2018')) {
      tags.push('2018');
    } else if (title.toLowerCase().includes('2017')) {
      tags.push('2017');
    } else if (title.toLowerCase().includes('2016')) {
      tags.push('2016');
    } else if (title.toLowerCase().includes('2015')) {
      tags.push('2015');
    } else if (title.toLowerCase().includes('2014')) {
      tags.push('2014');
    } else if (title.toLowerCase().includes('2013')) {
      tags.push('2013');
    } else if (title.toLowerCase().includes('2012')) {
      tags.push('2012');
    }

    return tags;
  }
}

export interface QuerySnapshot {
  docs: any[];
  empty: any;
  metadata: any;
  query: any;
  size: any;
}

declare var require: any;

/*
backup
getMoviesFirestore() {
    try {
      this.loading = true;
    this.movies = [];
    this.allMovies = [];
    this.db.collection('movies2')
    .where('interested', '==', 'true')
    .where('watched', '==', 'false')
    .where('favorite', '==', 'false')
    .where('timestamp', '>', 0)
    .orderBy('timestamp', 'desc').limit(2)
    .get().then(
      data => {
        console.log(data[0]);
        console.log(data.size);
        this.loading = false;
        data.forEach(element => {
          if (!element.data().watched) {
            this.db.collection('movies2').doc(element.id).set({
              watched: 'false'
            }, { merge: true });
          }
          if (!element.data().timestamp) {
            if (element.data().imdb_info.Response === 'False') {
              this.db.collection('movies2').doc(element.id).set({
                timestamp: 0,
              }, { merge: true });
            } else {
              try {
                const timestamp = new Date(element.data().imdb_info.Released).getTime();
                this.db.collection('movies2').doc(element.id).set({
                  timestamp: timestamp,
                }, { merge: true });
              } catch (error) {
                this.db.collection('movies2').doc(element.id).set({
                timestamp: 0,
              }, { merge: true });
              }
            }
          }
          if (!element.data().favorite) {
            this.db.collection('movies2').doc(element.id).set({
              favorite: 'false'
            }, { merge: true });
          }

            const mov = {
            id: element.id,
            interested: element.data().interested,
            descriptions: element.data().descriptions,
            downloadLinks: this.getLinksDownload(element.data().download_links),
            imageUrl: element.data().image_url,
            imdbInfo: element.data().imdb_info,
            linkPage: element.data().link_page,
            trailer: element.data().trailer,
            timestamp: element.data().timestamp,
            originalTitle: element.data().original_title,
            title: element.data().title,
            tags: this.getTagsInTitle(element.data().title)
          };
          this.movies.push(mov);
          this.allMovies.push(mov);
        });
        this.movies.reverse();
        this.firstMovie = this.movies[0];
        this.secondMovie = this.movies[1];
        //this.filter();
      }, error => {
        console.error(error);
        this.presentAlert(error, 'Algo deu errado');
      });
    } catch (error) {
      this.loading = false;
      console.error(error);
      this.presentAlert(error, 'Algo deu errado');
    }
  }
*/
