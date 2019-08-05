
export class GuestTypes  {
  id: string;
  name: string;
  timeZone: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;    
    this.timeZone = 1;
  }
}
