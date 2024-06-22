import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { DataTablesModule } from "angular-datatables";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DataTablesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
