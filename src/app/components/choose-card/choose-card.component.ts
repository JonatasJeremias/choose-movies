import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { IMovie } from 'src/app/interfaces/IMovie';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.scss'],
})
export class ChooseCardComponent implements OnInit {

  @Output() dismissed = new EventEmitter();

  @Input() movie: IMovie;
  @Input() index: number;

  @ViewChild('div_overlay_sad') divOverlaySad: ElementRef;
  @ViewChild('div_overlay_happy') divOverlayHappy: ElementRef;
  @ViewChild('div_overlay_idle') divOverlayIdle: ElementRef;
  @ViewChild('div_overlay') divOverlay: ElementRef;
  @ViewChild('ion_card') ionCard: ElementRef;

  INDEX_ELEVATION = 10;
  SIDE_LEFT = 'left';
  SIDE_RIGHT = 'right';
  SIDE_UP = 'up';
  SIDE_DOWN = 'down';
  SIDE_MIDDLE = 'middle';

  lastSide: string;

  MAX_DISTANCE_TO_MOVE_CARD = 250;
  DISTANCE_TO_DISMISS_CARD = 165;
  ROTATION_FACTOR = 13;

  positionX: number;
  positionY: number;

  startPositionX: number;
  startPositionY: number;

  displacementX: number;
  displacementY: number;

  lastCdkDragEnd: CdkDragEnd;

  constructor() { }

  getIndex() {
    return { 'z-index' : this.index * this.INDEX_ELEVATION};
  }

  ngOnInit() {
    this.lastSide = this.SIDE_MIDDLE;
  }

  onDragEnded(event: CdkDragEnd) {
    this.lastCdkDragEnd = event;
      if (Math.abs(this.displacementX) > this.DISTANCE_TO_DISMISS_CARD
      || Math.abs(this.displacementY) > this.DISTANCE_TO_DISMISS_CARD) {
        // event.source.element.nativeElement.style.transition = 'all 0.05s ease-in';
        event.source.element.nativeElement.style.opacity = '0';
        this.dismissed.emit(this);
      } else {
        this.resetCdkDragEnd();
      }
  }

  resetCdkDragEnd() {
    console.log('reset');
    console.log(this.lastCdkDragEnd);

    this.lastCdkDragEnd.source.reset();
    // this.lastCdkDragEnd.source.element.nativeElement.style.transition = 'none';
    this.lastCdkDragEnd.source.element.nativeElement.style.opacity = '1';
    this.positionX = 0;
    this.positionY = 0;
    this.displacementX = 0;
    this.displacementY = 0;
    // event.source.element.nativeElement.style.opacity = '1';
    this.divOverlaySad.nativeElement.style.display = 'none';
    this.divOverlayHappy.nativeElement.style.display = 'none';
    this.divOverlayIdle.nativeElement.style.display = 'none';
    this.divOverlay.nativeElement.style.opacity = '0';
    this.ionCard.nativeElement.style.transform = 'rotateZ(0deg)';
  }

  onCdkDragMove(event: CdkDragMove) {

    this.positionX = event.source.element.nativeElement.getBoundingClientRect().left;
    this.positionY = event.source.element.nativeElement.getBoundingClientRect().top;

    this.displacementX = this.positionX - this.startPositionX;
    this.displacementY = this.positionY - this.startPositionY;

    if (Math.abs(this.displacementY) > Math.abs(this.displacementX)) { // Esta movendo para cima ou para baixo

      if (this.displacementY > 0) {
        this.lastSide = this.SIDE_DOWN;
      } else {
        this.lastSide = this.SIDE_UP;
      }

      // event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementY).toString();
      this.divOverlayIdle.nativeElement.style.display = 'block';
      this.divOverlaySad.nativeElement.style.display = 'none';
      this.divOverlayHappy.nativeElement.display = 'none';
      this.divOverlay.nativeElement.style.opacity = this.calculeOpacityOverlay(this.displacementY).toString();
      this.divOverlay.nativeElement.style.backgroundColor = '#248CB6';
      this.ionCard.nativeElement.style.transform = 'rotateZ(0deg)';
    } else if (this.displacementX < 0) { // Esta movendo para esquerda
      this.lastSide = this.SIDE_LEFT;
      // event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementX).toString();
      this.divOverlaySad.nativeElement.style.display = 'block';
      this.divOverlayHappy.nativeElement.style.display = 'none';
      this.divOverlayIdle.nativeElement.style.display = 'none';
      this.divOverlay.nativeElement.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      this.divOverlay.nativeElement.style.backgroundColor = '#FF945A';
      this.ionCard.nativeElement.style.transform = this.calculeTransformRotateLeft(this.displacementX);
    } else if (this.displacementX === 0 && this.displacementY === 0) { // Esta no centro
      this.lastSide = this.SIDE_MIDDLE;
      // event.source.element.nativeElement.style.opacity = '1';
      this.divOverlaySad.nativeElement.style.display = 'none';
      this.divOverlayHappy.nativeElement.style.display = 'none';
      this.divOverlayIdle.nativeElement.style.display = 'none';
      this.divOverlay.nativeElement.style.opacity = '0';
      this.ionCard.nativeElement.style.transform = 'rotateZ(0deg)';
    } else if (this.displacementX > 0) { // Esta movendo para direita
      this.lastSide = this.SIDE_RIGHT;
      // event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementX).toString();
      this.divOverlayHappy.nativeElement.style.display = 'block';
      this.divOverlaySad.nativeElement.style.display = 'none';
      this.divOverlayIdle.nativeElement.style.display = 'none';
      this.divOverlay.nativeElement.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      this.divOverlay.nativeElement.style.backgroundColor = '#B1DA96';
      this.ionCard.nativeElement.style.transform = this.calculeTransformRotateRight(this.displacementX);
    }
  }

  calculeTransformRotateLeft(distance) {
    return `rotateZ(-${Math.abs(this._calculeTransformRotate(distance))}deg)`;
  }

  calculeTransformRotateRight(distance) {
    return `rotateZ(${Math.abs(this._calculeTransformRotate(distance))}deg)`;
  }

  _calculeTransformRotate(distance) {
    if (Math.abs(distance) > this.MAX_DISTANCE_TO_MOVE_CARD) {
      return this.MAX_DISTANCE_TO_MOVE_CARD / this.ROTATION_FACTOR;
    }
    return distance / this.ROTATION_FACTOR;
  }

  calculeOpacityOverlay(distance) {
    return Math.abs(this._calculeOpacity(distance) + 1);
  }

  calculeOpacityCard(distance) {
    return Math.abs(this._calculeOpacity(distance));
  }

  _calculeOpacity(distance) {
    if (Math.abs(distance) > this.MAX_DISTANCE_TO_MOVE_CARD) {
      return 0;
    }
    return (Math.abs(distance) / this.MAX_DISTANCE_TO_MOVE_CARD) - 1;
  }

  onCdkDragStarted(event: CdkDragStart) {
    this.startPositionX = event.source.element.nativeElement.getBoundingClientRect().left;
    this.startPositionY = event.source.element.nativeElement.getBoundingClientRect().top;
  }
}
