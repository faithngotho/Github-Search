export class User {
    constructor(
        public avatar_url: string,
        public login: string,
        public name: string,
        public bio: string,
        public followers: number,
        public following: number,
        public repos: number){}
}
