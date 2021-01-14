import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { SearchCriteria} from './search_object'
import { ConnectToSageMakerService } from './services/connect-to-sage-maker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  ori_Control: FormControl = new FormControl();
  des_Control: FormControl = new FormControl();
  ori_Options: string[] = ['ATL','AUS','BNA','BOS','BWI','CLT','DAL','DCA','DEN','DFW','DTW','EWR','FLL','HNL','HOU','IAD','IAH','JFK','LAS','LAX',
                           'LGA','MCI','MCO','MDW','MIA','MSP','MSY','OAK','ORD','PDX','PHL','PHX','RDU','SAN','SEA','SFO','SJC','SLC','STL','TPA'];
  des_Options: string[] = ['ATL','AUS','BNA','BOS','BWI','CLT','DAL','DCA','DEN','DFW','DTW','EWR','FLL','HNL','HOU','IAD','IAH','JFK','LAS','LAX',
                           'LGA','MCI','MCO','MDW','MIA','MSP','MSY','OAK','ORD','PDX','PHL','PHX','RDU','SAN','SEA','SFO','SJC','SLC','STL','TPA'];
  ori_FilteredOptions: Observable<string[]>;
  des_FilteredOptions: Observable<string[]>;
  search_results;
  travelDate = new Date(2019,0,1);
  title = 'airline-delay-predictor';
  sc_flight_search_criteria:string = "Random";
  i_origin: string;
  i_destination: string;
  sc_airline: string;
  sc_dep_time: string;
  i_travelDate: Date = new Date(2019,0,1);
  o_precipitation: number = 0;  o_temperature: number = 80;  o_wind: number=0;  o_snow: number = 0;  o_snowDepth: number=0;
  o_driftSnow: boolean = false;  o_fog: boolean= false;  o_thunder: boolean= false;  o_ice: boolean= false;  o_hail: boolean= false;  o_glaze: boolean= false;  o_smoke: boolean= false;
  d_precipitation: number= 0;  d_temperature: number= 0;  d_wind: number= 0;  d_snow: number= 0;  d_snowDepth: number= 0;
  d_driftSnow: boolean= false;  d_fog: boolean= false;  d_thunder: boolean= false;  d_ice: boolean= false;  d_hail: boolean= false;  d_glaze: boolean= false;  d_smoke: boolean= false;
  ailine_list =  [  {value:'9E',viewValue:'Endeavor Air'},
                    {value:'AA',viewValue:'American Airlines'},
                    {value:'AS',viewValue:'Alaska Airlines'},
                    {value:'B6',viewValue:'Jet Blue'},
                    {value:'DL',viewValue:'Delta Airlines'},
                    {value:'EV',viewValue:'ExpressJet Airlines'},
                    {value:'F9',viewValue:'Frontier Airlines'},
                    {value:'G4',viewValue:'Allegiant Air'},
                    {value:'HA',viewValue:'Hawaiian Airlines'},
                    {value:'MQ',viewValue:'Envoy Air'},
                    {value:'NK',viewValue:'Spirit Airlines'},
                    {value:'OH',viewValue:'US Airways Express'},
                    {value:'OO',viewValue:'SkyWest Airlines'},
                    {value:'UA',viewValue:'United Airlines'},
                    {value:'WN',viewValue:'Southwest Airlines'},
                    {value:'YV',viewValue:'Mesa Airlines'},
                    {value:'YX',viewValue:'Republic Airways'},  ];
  departure_time_list = ["Midnight","1","2","3","4","5","6","7","8","9","10","11","Noon","13","14","15","16","17","18","19","20","21","22","23"]

constructor(private smService: ConnectToSageMakerService) { }

  ngOnInit(): void {
    this.ori_FilteredOptions = this.ori_Control.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter_ori(value))
    );
    this.des_FilteredOptions = this.des_Control.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter_des(value))
    );
  }
  
  searchFlights(travelDate){
    let searchCriteria: SearchCriteria = this.setSearchCriteria()
    console.log(this.i_origin);
    console.log(this.i_destination);
    console.log("-------SEARCH CRITERIA----------");
    console.log(searchCriteria);

    this.smService.createGame(searchCriteria).subscribe({
      next: (results) => this.onSaveComplete(results),
      error: (err) => console.log(err),
      //error: err=> this.errorMessage = err
    });
  }

  private setSearchCriteria(): SearchCriteria {
    return {
      o_times: [],
      d_times: [],
      sc_flight_search_criteria: this.sc_flight_search_criteria,
      sc_airline: this.sc_airline,
      sc_departure_time: this.sc_dep_time,
      i_travelDate: this.i_travelDate,
      i_distance: null,
      i_origin: this.i_origin,
      i_destination: this.i_destination,
      o_wind: this.o_wind,
      o_precipitation: this.o_precipitation,
      o_snow: this.o_snow,
      o_snowDepth: this.o_snowDepth,
      o_temperature: this.o_temperature,
      o_fog: this.o_fog,
      o_thunder: this.o_thunder, 
      o_ice: this.o_ice, 
      o_hail: this.o_hail, 
      o_glaze: this.o_glaze, 
      o_smoke: this.o_smoke, 
      o_driftSnow: this.o_driftSnow,
      d_wind: this.d_wind, 
      d_precipitation: this.d_precipitation, 
      d_snow: this.d_snow, 
      d_snowDepth: this.d_snowDepth, 
      d_temperature: this.d_temperature,
      d_fog: this.d_fog, 
      d_thunder: this.d_thunder, 
      d_ice: this.d_ice, 
      d_hail: this.d_hail, 
      d_glaze: this.d_glaze, 
      d_smoke: this.d_smoke, 
      d_driftSnow: this.d_driftSnow,
      delay_probability: null,
    };
  }

  onSaveComplete(result): void {
    console.log('============Result:===========');
    this.search_results = result.body;
    console.log(this.search_results);
    //this.playersForm.reset();
    //this.router.navigate(["/codes"]);
    //this.router.navigate(["/game/" + resGame.adminGameId]);
  }

  updateOrigin(ori:string){
    console.log('Update Origin Called');
    this.i_origin = ori;
  }

  updateDestination(des:string){
    console.log('Update Destination Called');
    this.i_destination = des;
  }

  private _filter_ori(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ori_Options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter_des(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.des_Options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
