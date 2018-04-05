import { Component, ViewChild } from '@angular/core';
import { Tabs, Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { AboutPage } from '../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = FavoritesPage;
  tab3Root = AboutPage;

  tab1Title: string = 'Inicio';
  tab2Title: string = 'Favoritos';

  constructor(
    public events: Events
  ) { }

  scrollToTopHome(event?): void {

    let tab = this.tabRef.getSelected();

    if (tab.isSelected && tab.tabTitle == this.tab1Title ) {

      this.events.publish('scrollToTopHome', {
        tab: tab.tabTitle,
        tabIndex: tab.index
      });


    }

  }

  scrollToTopFav(event?): void {

    let tab = this.tabRef.getSelected();

    if (tab.isSelected && tab.tabTitle == this.tab2Title ) {

      this.events.publish('scrollToTopFav', {
        tab: tab.tabTitle,
        tabIndex: tab.index
      });


    }

  }
}
