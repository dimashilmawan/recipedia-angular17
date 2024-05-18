// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   OnDestroy,
//   OnInit,
//   ViewChild,
//   inject,
// } from '@angular/core';
// import { ContainerComponent } from '../../components/container/container.component';
// import { CATEGORIES_OVERVIEW } from '../../constants/categories';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import {
//   faMagnifyingGlass,
//   faCircleChevronDown,
//   faSpinner,
//   faXmark,
// } from '@fortawesome/free-solid-svg-icons';
// import { RecipeService } from '../../services/recipe.service';
// import { HeroComponent } from '../../components/hero/hero.component';
// import { RecipeOverview } from '../../types/recipe';
// import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
// import { CategoryCardComponent } from '../../components/category-card/category-card.component';
// import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
// import { CommonModule } from '@angular/common';
// import { TestService } from '../../services/test.service';
// import {
//   Subscription,
//   debounceTime,
//   distinctUntilChanged,
//   fromEvent,
//   map,
//   of,
//   switchMap,
// } from 'rxjs';
// import { FormsModule, NgForm } from '@angular/forms';
// import { query } from '@angular/animations';
// import { HttpClient } from '@angular/common/http';
// import { PaginationComponent } from '../../components/pagination/pagination.component';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [
//     ContainerComponent,
//     RouterLink,
//     FontAwesomeModule,
//     HeroComponent,
//     RecipeCardComponent,
//     CategoryCardComponent,
//     LoadingSpinnerComponent,
//     CommonModule,
//     PaginationComponent,
//   ],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css',
// })
// // export class HomeComponent implements AfterViewInit, OnDestroy,OnInit {
// export class HomeComponent implements OnInit {
//   @ViewChild('input') private inputElement!: ElementRef<HTMLInputElement>;
//   private inputSubscription!: Subscription;

//   categoriesOverview = CATEGORIES_OVERVIEW;

//   faXmark = faXmark;
//   faCircleChevronDown = faCircleChevronDown;
//   faSpinner = faSpinner;

//   recipeResults: RecipeOverview[] | null = null;
//   loading = false;
//   error: any = null;

//   currentPage: number = this.route.snapshot.queryParamMap.get('page')
//     ? Number(this.route.snapshot.queryParamMap.get('page'))
//     : 1;
//   itemsPerPage: number = 10;

//   query: string = this.route.snapshot.queryParamMap.get('query')
//     ? (this.route.snapshot.queryParamMap.get('query') as string)
//     : '';

//   get totalPages() {
//     return Math.ceil(
//       this.recipeResults ? this.recipeResults.length / this.itemsPerPage : 0,
//     );
//   }

//   get paginatedData(): any[] | undefined {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     return this.recipeResults?.slice(startIndex, endIndex);
//   }

//   constructor(
//     private recipeService: RecipeService,
//     private router: Router,
//     private route: ActivatedRoute,
//   ) {}

//   previousPage() {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.router.navigate([''], {
//         queryParams: { query: this.query, page: this.currentPage },
//       });
//     }
//   }

//   nextPage() {
//     console.log(this);
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.router.navigate([''], {
//         queryParams: { query: this.query, page: this.currentPage },
//       });
//     }
//   }

//   clearInput() {
//     this.router.navigate([''], {
//       queryParams: { query: null, page: null },
//     });
//     this.recipeResults = null;
//   }

//   ngOnInit(): void {
//     if (!this.query) return;

//     this.loading = true;
//     this.error = null;
//     this.recipeResults = null;

//     this.recipeService.searchRecipes(this.query).subscribe({
//       next: (value) => {
//         this.inputElement.nativeElement.value = this.query;
//         this.loading = false;
//         this.recipeResults = value;
//       },
//       error: (err) => {
//         console.log('err');
//         this.loading = false;
//         this.error = err.message;
//       },
//       complete: () => {
//         console.log('complete');
//       },
//     });
//   }

//   ngAfterViewInit(): void {
//     this.inputSubscription = fromEvent(this.inputElement.nativeElement, 'input')
//       .pipe(
//         map((e) => (e.target as HTMLInputElement).value),
//         debounceTime(600),
//         distinctUntilChanged(),
//         switchMap((value) => {
//           if (!value) {
//             this.router.navigateByUrl('');
//             return of(null);
//           }
//           this.router.navigate([''], {
//             queryParams: {
//               query: value,
//               page: 1,
//             },
//           });
//           this.currentPage = 1;
//           this.query = value;

//           this.loading = true;
//           this.error = null;
//           this.recipeResults = null;

//           return this.recipeService.searchRecipes(value);
//         }),
//       )
//       .subscribe({
//         next: (value) => {
//           this.loading = false;
//           this.recipeResults = value;
//         },
//         error: (err) => {
//           console.log('err');
//           this.loading = false;
//           this.error = err.message;
//         },
//         complete: () => {
//           console.log('complete');
//         },
//       });
//   }

//   ngOnDestroy(): void {
//     if (this.inputSubscription) return this.inputSubscription.unsubscribe();
//   }
// }
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { CATEGORIES_OVERVIEW } from '../../constants/categories';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMagnifyingGlass,
  faCircleChevronDown,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../services/recipe.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { RecipeOverview } from '../../types/recipe';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { TestService } from '../../services/test.service';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  switchMap,
} from 'rxjs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent,
    FontAwesomeModule,
    HeroComponent,
    RecipeCardComponent,
    CategoryCardComponent,
    LoadingSpinnerComponent,
    CommonModule,
    PaginationComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
// export class HomeComponent implements AfterViewInit, OnDestroy,OnInit {
export class HomeComponent implements OnInit {
  input = new FormControl('');

  private inputSubscription!: Subscription;
  private queryParamsSubscription!: Subscription;

  categoriesOverview = CATEGORIES_OVERVIEW;

  faXmark = faXmark;
  faCircleChevronDown = faCircleChevronDown;
  faSpinner = faSpinner;

  recipeResults: RecipeOverview[] | null = null;
  loading = false;
  error: any = null;

  // currentPage: number = this.route.snapshot.queryParamMap.get('page')
  //   ? Number(this.route.snapshot.queryParamMap.get('page'))
  //   : 1;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // query: string = this.route.snapshot.queryParamMap.get('query')
  //   ? (this.route.snapshot.queryParamMap.get('query') as string)
  //   : '';
  query: string = '';

  get totalPages() {
    return Math.ceil(
      this.recipeResults ? this.recipeResults.length / this.itemsPerPage : 0,
    );
  }

  get paginatedData(): any[] | undefined {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.recipeResults?.slice(startIndex, endIndex);
  }

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate([''], {
        queryParams: { query: this.query, page: this.currentPage },
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.router.navigate([''], {
        queryParams: { query: this.query, page: this.currentPage },
      });
    }
  }

  ngOnInit(): void {
    this.inputSubscription = this.input.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap((value) => {
          if (!value) {
            this.router.navigateByUrl('');
            return of(null);
          }

          this.router.navigate([''], {
            queryParams: {
              query: value,
              page: this.query === value ? this.currentPage : 1,
            },
          });
          // this.currentPage = 1;
          // this.query = value;

          this.loading = true;
          this.error = null;
          this.recipeResults = null;

          return this.recipeService.searchRecipes(value);
        }),
      )
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.recipeResults = value;
        },
        error: (err) => {
          console.log('err');
          this.loading = false;
          this.error = err.message;
        },
        complete: () => {
          console.log('complete');
        },
      });

    this.queryParamsSubscription = this.route.queryParamMap.subscribe(
      (value) => {
        if (value.get('page')) {
          this.currentPage = Number(value.get('page'));
        }
        if (value.get('query')) {
          this.query = value.get('query') as string;
          this.input.setValue(value.get('query'));
        }
      },
    );
  }

  ngOnDestroy(): void {
    if (this.inputSubscription) return this.inputSubscription.unsubscribe();
    if (this.queryParamsSubscription)
      return this.queryParamsSubscription.unsubscribe();
  }
}
