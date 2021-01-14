import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SearchCriteria } from '../search_object';
import { LAMBDA_ENDPOINT} from '../endpoints/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ConnectToSageMakerService {

  constructor(private http: HttpClient) { }

  //private endpointURL = 'https://dzhhs2c812.execute-api.us-east-1.amazonaws.com/Prod/predict-airline-delays';
  private endpointURL = LAMBDA_ENDPOINT;

  createGame(searchCriteria: SearchCriteria): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SearchCriteria>(this.endpointURL, searchCriteria, { headers })
      .pipe(
        tap(data => console.log('csearchFlights: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }

}
