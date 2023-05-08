import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private token: string;

  constructor() {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      this.token = storedToken;
    } else {
      this.token = this.generateRandomToken(64);
      localStorage.setItem('tokenauth', this.token);
    }
  }

  private generateRandomToken(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }

    return result;
  }

  public getToken(): string {
    return this.token;
  }

  public clearToken(): void {
    this.token = 'null';
    localStorage.removeItem('token');
  }
}
