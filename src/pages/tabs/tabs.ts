import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs, Events } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = HomePage;
  tab2Root = AboutPage;

  constructor(
    public events: Events
  ) { }

  scrollToTop(event?): void {

    let tab = this.tabRef.getSelected();

    if (tab.isSelected && tab.tabTitle == 'Inicio') {

      this.events.publish('scrollToTopHome', {
        tab: tab.tabTitle,
        tabIndex: tab.index
      });


    }

  }
}
