import * as $ from 'jquery';

// The three different ways to import.
// import * as WhateverYouWant from 'library';
// import Library from 'library';
// import { Library } from 'library';

export class Nav {
    constructor() {
        this.submenuOpen = true;
        this.mobilemenuOpen = true;
        this.setup();
    }

    setup() {
        let products = $('#products');
        products.on('click', this.toggleSubmenu);
        this.toggleSubmenu();

        let mobileMenu = $('#mobileMenu');
        mobileMenu.on('click', this.toggleMobileMenu);
        
        // De-expand menu for small screens (< 40em)
        if (window.innerWidth < 640) {
            this.toggleMobileMenu();
        }
    }

    toggleSubmenu() {
        let submenu = $('#productsSubmenu');

        if (this.submenuOpen) {
            this.submenuOpen = false;
            submenu.hide();
        } else {
            this.submenuOpen = true;
            submenu.show();
        }
    }

    toggleMobileMenu() {
        let navitems = $('li').not('.mobile-only');
        let menuIcon = $('.menu-icon');

        if (this.mobilemenuOpen) {
            this.mobilemenuOpen = false;
            navitems.hide();

            // Toggle icon
            menuIcon.removeClass('open');
        } else {
            this.mobilemenuOpen = true;
            navitems.show();

            // Toggle icon
            menuIcon.addClass('open');
        }
    }

}