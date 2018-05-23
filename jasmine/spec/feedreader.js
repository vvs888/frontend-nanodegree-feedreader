/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* "RSS Feeds" test suite */
    describe('RSS Feeds', () => {
        /* to make sure that the allFeeds variable has been defined
         * and that it is not empty.
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Looping through each feed in the allFeeds object
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have a defined and have not empty URL', () => {
            let allFeedsUrls = [];

            allFeeds.forEach(feed => {
                let url = feed.url;
                // url must not be undefined, number, ''
                if (url !== undefined &&
                    typeof url !== 'number' &&
                    url !== '') {
                    allFeedsUrls.push(url);
                }
            });
            // check if there are all Urls
            if (allFeedsUrls.length < allFeeds.length) {
                allFeedsUrls = [];
            }

            expect(allFeedsUrls).toBeDefined();
            expect(allFeedsUrls.length).not.toBe(0);
         });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have a defined and have not empty name', () => {
            let allFeedsNames = [];

            allFeeds.forEach(feed => {
                let name = feed.name;
                // name must not be undefined, number, ''
                if (name !== undefined &&
                    typeof name !== 'number' &&
                    name !== '') {
                    allFeedsNames.push(name);
                }
            });
            // check if there are all names
            if (allFeedsNames.length < allFeeds.length) {
                allFeedsNames = [];
            }

            expect(allFeedsNames).toBeDefined();
            expect(allFeedsNames.length).not.toBe(0);
         });

    });

    /* "The menu" test suite */
    describe('The menu', () => {
        const menu = $('body');
        const menuIcon = $('.menu-icon-link');

        /* To make sure that the menu element is
         * hidden by default.
         */
         it('is hidden by default', () => {
            expect((menu).hasClass('menu-hidden')).toEqual(true);
         });

         /* to make sure that the menu changes
          * visibility when the menu icon is clicked.
          */
          it('changes visibility when the menu icon is clicked', () => {
            menuIcon.click();
            expect((menu).hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect((menu).hasClass('menu-hidden')).toEqual(true);
          });
    });


    /* "Initial Entries" test suite */
    describe('Initial Entries', () => {
        let initEntries;

        // getting initial entries
        beforeEach(done => {
            loadFeed(0, () => {
                initEntries = $('.feed .entry-link');
                done();
            });
        });

        /* to make sure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('have at least a single entry', done => {
            expect(initEntries.length).toBeGreaterThan(0);
            done();
         });

    });

    /* "New Feed Selection" test suite */
    describe('New Feed Selection', () => {
        let initContent;
        let newContent;

        // loading first and second feeds to compare their content
        beforeEach(done => {
            loadFeed(0, () => {
                initContent = $('.feed').html();
                loadFeed(1, () => {
                    newContent = $('.feed').html();
                    done();
                });
            });
        });

        // loading initial feed again
        afterEach(done => {
            loadFeed(0, () => done());
        });

        // To make sure when a new feed is loaded the content actually changes
         it('changes content', () => {
            expect(newContent).not.toEqual(initContent);
         });
    });

}());
