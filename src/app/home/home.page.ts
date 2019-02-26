import { Component } from '@angular/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  MAX_DISTANCE_TO_MOVE_CARD = 250;
  ROTATION_FACTOR = 13;

  positionX: number;
  positionY: number;

  startPositionX: number;
  startPositionY: number;

  displacementX: number;
  displacementY: number;

  onDragEnded(event: CdkDragEnd, divOverlaySad: HTMLElement
    , divOverlayHappy: HTMLElement, divOverlayIdle: HTMLElement, divOverlay: HTMLElement, ionCard: HTMLElement) {
    event.source.reset();

    this.positionX = 0;
    this.positionY = 0;
    this.displacementX = 0;
    this.displacementY = 0;

    event.source.element.nativeElement.style.opacity = '1';
    divOverlaySad.style.opacity = '0';
    divOverlayHappy.style.opacity = '0';
    divOverlayIdle.style.opacity = '0';
    divOverlay.style.opacity = '0';
    ionCard.style.transform = 'rotateZ(0deg)';
  }

  onCdkDragMove(event: CdkDragMove, divOverlaySad: HTMLElement
    , divOverlayHappy: HTMLElement, divOverlayIdle: HTMLElement
    , divOverlay: HTMLElement, ionCard: HTMLElement) {

    this.positionX = event.source.element.nativeElement.getBoundingClientRect().left;
    this.positionY = event.source.element.nativeElement.getBoundingClientRect().top;

    this.displacementX = this.positionX - this.startPositionX;
    this.displacementY = this.positionY - this.startPositionY;

    if (Math.abs(this.displacementY) > Math.abs(this.displacementX)) { // Esta movendo para cima ou para baixo
      event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementY).toString();
      divOverlayIdle.style.opacity = this.calculeOpacityOverlay(this.displacementY).toString();
      divOverlaySad.style.opacity = '0';
      divOverlayHappy.style.opacity = '0';
      divOverlay.style.opacity = this.calculeOpacityOverlay(this.displacementY).toString();
      divOverlay.style.backgroundColor = '#248CB6';
      ionCard.style.transform = 'rotateZ(0deg)';
    } else if (this.displacementX < 0) { // Esta movendo para esquerda
      event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementX).toString();
      divOverlaySad.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlayHappy.style.opacity = '0';
      divOverlayIdle.style.opacity = '0';
      divOverlay.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlay.style.backgroundColor = '#FF945A';
      ionCard.style.transform = this.calculeTransformRotateLeft(this.displacementX);
    } else if (this.displacementX === 0 && this.displacementY === 0) { // Esta no centro
      event.source.element.nativeElement.style.opacity = '1';
      divOverlaySad.style.opacity = '0';
      divOverlayHappy.style.opacity = '0';
      divOverlayIdle.style.opacity = '0';
      divOverlay.style.opacity = '0';
      ionCard.style.transform = 'rotateZ(0deg)';
    } else if (this.displacementX > 0) { // Esta movendo para direita
      event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementX).toString();
      divOverlayHappy.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlaySad.style.opacity = '0';
      divOverlayIdle.style.opacity = '0';
      divOverlay.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlay.style.backgroundColor = '#B1DA96';
      ionCard.style.transform = this.calculeTransformRotateRight(this.displacementX);
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
    return Math.abs(this._calculeOpacity(distance) + 1) * 2.3;
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
