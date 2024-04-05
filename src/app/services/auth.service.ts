import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {JwtHelperService} from  '@auth0/angular-jwt'
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    
  }
  getinfo(){
    
  }


  currentUser : BehaviorSubject<any> = new BehaviorSubject(null)
  baseServerUrl = 'http://samirtal-001-site1.ktempurl.com/api/'

  jwtHelperService = new JwtHelperService()

  
  registerUser(user : Array<string>){
     return this.http.post(this.baseServerUrl + "User/CreateUser" ,{
      FirstName: user[0],
      LastName: user[1],
      Email: user[2],
      Mobile: user[3],
      Gender:user[4],
      Pwd : user[5],
      Zaposleni : user[6],
      KupljenaId: user[7]
     },{responseType:'text'})
    }

    loginUser(user : Array<string>){
      return this.http.post(this.baseServerUrl +"User/LoginUser" ,{
        Email: user[0],
        Pwd : user[1]
      },{responseType:'text'})
    }
    setToken(token:string){
      localStorage.setItem("access_token", token)
      this.loadCurrentUser()
    }
    loadCurrentUser(){
      const token = localStorage.getItem("access_token");
      const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
      const data =  userInfo ? {
        id : userInfo.id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email : userInfo.email,
        mobile : userInfo.mobile,
        gender : userInfo.gender,
        zaposleni : userInfo.zaposleni,
        kupljenaid: userInfo?.kupljenaid
      } : null
      this.currentUser.next(data);
      console.log(userInfo);
      
      
    }
    isLoggedIn(): boolean {
      return localStorage.getItem("access_token") ? true : false;
    }
    removeToken(){
      localStorage.removeItem("access_token");
    }
    getAllKarte() {
      return this.http.get(this.baseServerUrl + "Karta");
    }
    createKarta(kartaData: any) {
      return this.http.post(this.baseServerUrl + "Karta/AddKarta", kartaData);
    }
    getAllFilijale() {
      return this.http.get(this.baseServerUrl + "Filijala");
    }
    kupiKartu(kartaId: number, korisnikKupacId: number) {
      const url = `${this.baseServerUrl}Karta/KupiKartu?kartaId=${kartaId}&korisnikKupacId=${korisnikKupacId}`;
      return this.http.post(url, {});
    }
    kupiAranzman(aranzmanId: number, korisnikKupacId: number) {
      const url = `${this.baseServerUrl}Aranzman/KupiAranzman?aranzmanId=${aranzmanId}&korisnikKupacId=${korisnikKupacId}`;
      return this.http.post(url, {});
    }
    kupiUsluga(uslugaId: number, korisnikKupacId: number) {
      const url = `${this.baseServerUrl}Usluga/KupiUsluga?uslugaId=${uslugaId}&korisnikKupacId=${korisnikKupacId}`;
      return this.http.post(url, {});
    }
    getAllUslugaHotela() {
      return this.http.get(this.baseServerUrl + "HotelUslugaHotela/GetAllUslugaHotelaWithHotel");
    }
    getAllHotels() {
      return this.http.get(this.baseServerUrl + "HotelUslugaHotela/GetAllHotelsWithUslugaHotela");
    }
    createHotel(hotelData: any) {
      return this.http.post(this.baseServerUrl + "HotelUslugaHotela/AddHotel", hotelData);
    }
    createUslugaHotela(uslugaHotelaData: any) {
      return this.http.post(this.baseServerUrl + "HotelUslugaHotela/AddUslugaHotela", uslugaHotelaData);
    }
    addUslugaHotelaToHotel(uslugaHotelaId :number , hotelId:number) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/AddHotelToUslugaHotela?uslugaHotelaId=${uslugaHotelaId}&hotelId=${hotelId}`
      return this.http.post(url, {})
     }
     //TODO
     addAranzmanToHotel(aranzmanId :number , hotelId:number) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/AddAranzmanToHotel?aranzmanId=${aranzmanId}&hotelId=${hotelId}`
      return this.http.post(url, {})
     }
     addUslugaToHotel(uslugaId :number , hotelId:number, datumPR: Date, datumZR: Date) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/AddUslugaToHotel?uslugaId=${uslugaId}&hotelId=${hotelId}&datumPR=${datumPR}:00&datumZR=${datumZR}:30`
      return this.http.post(url, {})
     }
  
    deleteHotel(hotelId:number) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/DeleteHotel?hotelId=${hotelId}`
      return this.http.delete(url,{})
    }
    deleteUslugaHotela(uslugaHotelaId:number) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/DeleteUslugaHotela?uslugaHotelaId=${uslugaHotelaId}`
      return this.http.delete(url,{})
    }
    deleteKartica(rezervacijaId: number){
      const url = `${this.baseServerUrl}Karta/DeleteKarta?kartaId=${rezervacijaId}`
      return this.http.delete(url,{})
    }
    getAllUsluga(){
      return this.http.get(this.baseServerUrl + "Usluga/GetAllUslugaWithRezervacija");
    }
    createUsluga(uslugaData: any){
      return this.http.post(this.baseServerUrl + "Usluga/AddUsluga", uslugaData);
    }
    deleteUsluga  (uslugaId: number){
      const url = `${this.baseServerUrl}Usluga/DeleteUsluga?uslugaId=${uslugaId}`
      return this.http.delete(url,{})
    }
    getAllAranzman(){
      return this.http.get(this.baseServerUrl + "Aranzman/GetAllAranzmanWithUsluga");
    }
    createAranzman(uslugaData: any){
      return this.http.post(this.baseServerUrl + "Aranzman/AddAranzman", uslugaData);
    }
    deleteAranzman  (aranzmanId: number){
      const url = `${this.baseServerUrl}Aranzman/DeleteAranzman?aranzmanId=${aranzmanId}`
      return this.http.delete(url,{})
    }
    checkExpiredReservations(hotelId: number) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/CheckExpiredReservations/${hotelId}`;
      return this.http.get<any>(url);
    }
    checkExpiredAranzman(hotelId: number) {
      const url = `${this.baseServerUrl}HotelUslugaHotela/CheckExpiredAranzman/${hotelId}`;
      return this.http.get<any>(url);
    }
}
