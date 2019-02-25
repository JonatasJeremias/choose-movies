import { Component } from '@angular/core';
import { CdkDragEnd, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  positionX: number;
  positionY: number;

  startPositionX: number;
  startPositionY: number;

  displacementX: number;
  displacementY: number;

  onDragEnded(event: CdkDragEnd, divOverlayEmotion: HTMLElement, divOverlay: HTMLElement) {
    event.source.reset();

    this.positionX = 0;
    this.positionY = 0;
    this.displacementX = 0;
    this.displacementY = 0;

    event.source.element.nativeElement.style.opacity = '1';
    divOverlayEmotion.style.opacity = '0';
    divOverlay.style.opacity = '0';
  }

  onCdkDragMove(event: CdkDragMove, divOverlayEmotion: HTMLElement, divOverlay: HTMLElement) {
    this.positionX = event.source.element.nativeElement.getBoundingClientRect().left;
    this.positionY = event.source.element.nativeElement.getBoundingClientRect().top;

    this.displacementX = this.positionX - this.startPositionX;
    this.displacementY = this.positionY - this.startPositionY;

    if (Math.abs(this.displacementY) > Math.abs(this.displacementX)) { // Esta movendo para cima ou para baixo
      event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementY).toString();
      divOverlayEmotion.style.opacity = this.calculeOpacityOverlay(this.displacementY).toString();
      divOverlay.style.opacity = this.calculeOpacityOverlay(this.displacementY).toString();
      divOverlay.style.backgroundColor = '#248CB6';
    } else if (this.displacementX < 0) { // Esta movendo para esquerda
      event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementX).toString();
      divOverlayEmotion.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlay.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlay.style.backgroundColor = '#FF945A';
    } else if (this.displacementX === 0 && this.displacementY === 0) { // Esta no centro
      event.source.element.nativeElement.style.opacity = '1';
      divOverlayEmotion.style.opacity = '0';
      divOverlay.style.opacity = '0';
    } else if (this.displacementX > 0) { // Esta movendo para direita
      event.source.element.nativeElement.style.opacity = this.calculeOpacityCard(this.displacementX).toString();
      divOverlayEmotion.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlay.style.opacity = this.calculeOpacityOverlay(this.displacementX).toString();
      divOverlay.style.backgroundColor = '#B1DA96';
    }
  }

  calculeOpacityOverlay(distance) {
    return Math.abs(this._calculeOpacity(distance) + 1) * 2.3;
  }

  calculeOpacityCard(distance) {
    return Math.abs(this._calculeOpacity(distance));
  }

  _calculeOpacity(distance) {
    const maxDistanceToMovo = 250;

    if (Math.abs(distance) > maxDistanceToMovo) {
      return 0;
    }
    return (Math.abs(distance) / maxDistanceToMovo) - 1;
  }

  onCdkDragStarted(event: CdkDragStart) {
    this.startPositionX = event.source.element.nativeElement.getBoundingClientRect().left;
    this.startPositionY = event.source.element.nativeElement.getBoundingClientRect().top;
  }

}
