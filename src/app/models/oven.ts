export interface Oven {
  id: number; // sütő azonosító
  ovenTimer: Time; // óra típusú változó ami az adott sütő órája lesz
  availability: boolean; // elérhető-e vagy sem az adott sütő
  order: number; // melyik rendelés pizzáját süti
  pizza: number; // a rendelés hányadik pizzáját süti
  progress: number; // hol tart a sütésben %-ban
  canUse: boolean; // használható sütő/nem használható
}
export class Time {
  private minutes;
  private seconds;

  constructor() {
    this.minutes = 0;
    this.seconds = 0;
  }

  public getMinutes() {
    return this.minutes;
  }

  public getMinutesString() {
    if (this.minutes < 10) {
      return '0' + this.minutes.toString();
    } else {
      return this.minutes.toString();
    }
  }

  public setMinutes(n: number) {
    if (n > 60 || n < 0) {
      throw new Error('Nem jó számot kapott az Ora.setPerc()');
    } else {
      this.minutes = n;
    }
  }

  public getSeconds() {
    return this.seconds;
  }

  public getSecondsString() {
    if (this.seconds < 10) {
      return '0' + this.seconds.toString();
    } else {
      return this.seconds.toString();
    }
  }

  public setSeconds(n: number) {
    if (n > 60 || n < 0) {
      throw new Error('Nem jó számot kapott az Ora.setMPerc()');
    } else {
      this.seconds = n;
    }
  }

  public Reset() {
    this.minutes = 0;
    this.seconds = 0;
  }
}
