import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { UserProfile } from "../../models/user.model";
import { BaseService } from "../../services/base.service";
import { ProfileImage } from "../../models/image.model";
import { Board } from "../../models/board.model";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Card } from "primeng/primeng";

@Injectable()
export class MainService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getProfile(): Observable<any> {
    return this.get("/api/account/profile/");
  }

  public updateProfile(id: string, userProfile: UserProfile): Observable<any> {
    return this.post("/api/users/update/" + id, userProfile);
  }

  public getProfileImage(id: string): Observable<ProfileImage> {
    return this.get("/api/photo/" + id);
  }

  public accountChangePassword(accountPassword: any): Observable<any> {
    return this.put(`/api/account/changepassword?userId=${accountPassword.userId}&currentPassword=${accountPassword.currentPassword}&newPassword=${accountPassword.newPassword}`, accountPassword);
  }

  public getCards(): Observable<any> {
    return this.get("/api/card");
  }

  public createBoard(board: Board): Observable<any> {
    return this.post("/api/board", board);
  }

  public getBoards(): Observable<any> {
    return this.get("/api/board?sortBy=Id&sortOrder=Asc");
  }

  public deleteBoard(id: number): any {
    return this.delete(`/api/board/${id}`);
  }

  public searchBoard(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.search(term)))
  }

  private search(searchTerm: string): Observable<any> {
    return this.get(`/api/board?q=${searchTerm}`);
  }

  public getBoard(id: number): Observable<any> {
    return this.get(`/api/board/${id}`);
  }

  public updateBoard(board: Board): Observable<any> {
    return this.put('/api/board', board)
  }

  public createCard(card: Card): Observable<any> {
    return this.post('/api/card', card)
  }

}