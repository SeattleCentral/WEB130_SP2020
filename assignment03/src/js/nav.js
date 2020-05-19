export class Nav {
    constructor() {
        this.submenuOpen = true;
        this.mobilemenuOpen = true;
        this.setup();
    }

    setup() {
        let products = document.getElementById('products');
        products.addEventListener('click', this.toggleSubmenu);
        this.toggleSubmenu();

        let mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.addEventListener('click', this.toggleMobileMenu);
        
        // De-expand menu for small screens (< 40em)
        if (window.innerWidth < 640) {
            this.toggleMobileMenu();
        }
    }

    toggleSubmenu() {
        let submenu = document.getElementById('productsSubmenu');

        if (this.submenuOpen) {
            this.submenuOpen = false;
            submenu.style.display = 'none';
        } else {
            this.submenuOpen = true;
            submenu.style.display = 'flex';
        }
    }

    toggleMobileMenu() {
        let navitems = [...document.getElementsByTagName('li')];
        navitems = navitems.filter(item => !item.classList.contains('mobile-only'));
        let menuIcon = document.getElementsByClassName('menu-icon')[0];

        // [ <li>, <li>, <li>, ... ]
        
        if (this.mobilemenuOpen) {
            this.mobilemenuOpen = false;
            navitems.map(item => item.style.display = 'none');
            // Shorthand for:
            // for (let item of navitems) {
            //     item.style.display = 'none';
            // }

            // Toggle icon
            menuIcon.className = 'menu-icon';
        } else {
            this.mobilemenuOpen = true;
            navitems.map(item => item.style.display = 'block');

            // Toggle icon
            menuIcon.className = 'menu-icon open';
        }
    }

}