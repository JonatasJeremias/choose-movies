import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor() { }

  public static getScreenSize() {
    return document.querySelector('body').offsetHeight;
  }

  public static getHeightScreenAreaWithPercentage(porcentagem: number): string {
    if (porcentagem < 0) {
      porcentagem = 0;
    } else if (porcentagem > 100) {
      porcentagem = 100;
    }

    if (porcentagem === 0) {
      return '0px';
    }

    const valor = Math.round(
      (porcentagem * ( this.getScreenSize())) / 100
    );
    return valor + 'px';
  }
}
