
import { makeAutoObservable } from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = true;
        // console.log(this._isAuth);
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    get isAuth() {
        return this._isAuth
    }
}