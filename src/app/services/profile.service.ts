import { Injectable } from '@angular/core';
import {User} from '../user';
import {Repository} from '../repository';
import {Repoarray} from '../repoarray';
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable() 
export class ProfileService {
  user:User;
  repos: Repository;
  repoArray:Repoarray;
  private username:string;

  constructor(private http:HttpClient) { 
    this.username = "faithngotho";
    this.user = new User ("", "", "", "", 0, 0, 0);
    this.repos = new Repository("", "", "");
    this.repoArray = new Repoarray([]);
   }

getProfileInfo(){
  interface ApiResponse{
      avatar_url: string;
      login:string;
      name:string;
      bio:string;
      followers:number;
      following:number;
      public_repos:number;
  }
  let promise = new Promise((resolve,reject)=>{
    this.http.get<ApiResponse>('https://api.github.com/users/' + this.username +'?access_token=' + environment.apikey).toPromise().then(response=>{
      this.user.avatar_url = response.avatar_url;
      this.user.login = response.login;
      this.user.name = response.name;
      this.user.bio = response.bio;
      this.user.followers = response.followers;
      this.user.following = response.following;
      this.user.repos = response.public_repos;
      resolve()
      
    },
    error=>{
    reject(error);
    }
    )
  })
  return promise;
}

  getRepoInfo(){
    interface Response{
      name: string;
      description:string;
      language:string;
      
  }
  let promise =new Promise((resolve,reject)=>{
    this.http.get<Response>( 'https://api.github.com/repos/' + this.username + '/' + this.username + '?access_token=' + environment.apikey).toPromise().then(response=>{

        this.repos.name=response.name;
        this.repos.description=response.description;
        this.repos.language=response.language;

        resolve()
    },
    error=>{
        reject(error)
        }
    )
})

return promise
}

repoRequest(){
    
  let promise = new Promise((resolve,reject)=>{
    this.http.get('https://api.github.com/users/' + this.username +'/repos?access_token=' + environment.apikey).toPromise().then(response=>{ 
      this.repoArray.myRepoArray=response;
      resolve()
    },
    error=>{
      
      reject(error);
    })
  })
  return promise;
}

  search(username:string) {
    this.username = username;
    this.getProfileInfo();
    this.getRepoInfo();
    this.repoRequest();
  }
}