import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Item } from "../../models/item/item.model";
import { Uitem } from "../../models/user-item/user-item.model";
import { AngularFireAuth } from 'angularfire2/auth';
import { Fitem } from "../../models/favorite-item/favorite-item.model";

@Injectable()
export class BookListService {
    i: number;
    private Booklistref = this.db.list<Item>('kitaplar/')
    private Userlistref = this.db.list<Uitem>('enson/')
    private Favoritelistref = this.db.list<Fitem>('favori/')
    onceki: any;
    userid:any;

    constructor( private auth: AngularFireAuth, private db: AngularFireDatabase){
        this.i = 0
        this.auth.authState.subscribe(data => {
            if(data && data.email && data.uid){
              this.userid = data.uid
            }})
    }
    getBookList(){
        return this.Booklistref
    }
    addItem(item: Item){
        return this.Booklistref.push(item)
    }
    addUser(user: Uitem){
        this.Userlistref.push(user)
        
        if(this.i%2 == 1){
            let ss = this.Userlistref.query.orderByChild("user").equalTo(this.userid)
            console.log(ss)
            this.onceki = user.id
            }
            this.i = this.i + 1
        
    }
    delUser(key){
        this.Userlistref.remove(key)
    }
    addFavorite(fitem: Fitem){
        return this.Favoritelistref.push(fitem)
    }
    delFavorite(fitem: Fitem){
        return this.Favoritelistref.remove()
    }
}