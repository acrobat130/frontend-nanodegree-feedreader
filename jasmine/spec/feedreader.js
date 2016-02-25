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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         // this test loops through each feed in allFeeds object and ensures it has a URL defined and that the URL is not empty
         it('have a defined URL and URL is not empty', function() {
            // loop through allFeeds
            for(var i = 0; i < allFeeds.length; i++) {
                // console.log("allFeeds[i].url", allFeeds[i].url);
                // url should be defined
                expect(allFeeds[i].url).toBeDefined();
                // url length should not be 0
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });

         // this test loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
         it('have a defined name and name is not empty', function() {
            // loop through allFeeds
            for(var i = 0; i < allFeeds.length; i++) {
                // feed name should be defined
                expect(allFeeds[i].name).toBeDefined();
                // feed name length shouldn't be 0
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    // new test suite that describes the menu
    describe('The menu', function() {

         // this test ensures the menu element is hidden by default
         // menu hidden by giving body tag: class='menu-hidden'
         it('has the menu element hidden by default', function() {
           // expect 'menu-hidden' class to be on body tag
           // expect body classlist to contain menu-hidden
           expect(document.body.classList).toContain('menu-hidden');
         });

          // this test ensures the menu changes visibility when the menu icon is clicked. The test has two expectations: does the menu display when clicked and does it hide when clicked again.
          it('changes visibility when the menu icon is clicked', function() {
            // expect menu to display when clicked
            // simulate click on element with class='menu-icon-link'
            var menuButton = document.getElementsByClassName('menu-icon-link')[0];
            menuButton.click();
            // expect body classList to not contain menu-hidden
            expect(document.body.classList).not.toContain('menu-hidden');

            // expect menu to hide when clicked again
            // simulate click on element with class='menu-icon-link'
            menuButton.click();
            // expect body classList to contain menu-hidden
            expect(document.body.classList).toContain('menu-hidden');
          });

    });

    // new test suite that describes initial entries
    describe('Initial Entries', function() {
        // this test ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
        // loadFeed() is asynchronous so we need to use beforeEach and done()

        // load the default feed, call done() when it's finished so jasmine will continue
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('contains at least one .entry element within the .feed container after calling loadFeed', function() {
            // expect feed container classlist to contain at least one element with class='entry'
            // declare variable to hold .entry elements
            var entryElementsInFeedContainer = document.querySelectorAll('.feed .entry');

            // expect length of .feed .entry elements array > 0
            expect(entryElementsInFeedContainer.length).toBeGreaterThan(0);
         });

    });
    // new test suite that describes new feed selection
    describe('New Feed Selection', function() {
        // this test ensures that when a new feed is loaded by the loadFeed function, the content actually changes.
        // loadFeed() is asynchronous so we need to use beforeEach and done()

        var feedNumber = 0,
            oldHeaderTitle,
            newHeaderTitle;

        // set feed back to what it was initially
        afterAll(function() {
            feedNumber = 0;
            loadFeed(feedNumber);
        });

        it('content changes when loading a new feed', function(done) {
            // call loadFeed again and test it

            // load one feed and save header title
            loadFeed(feedNumber, function() {
                oldHeaderTitle = document.getElementsByClassName('header-title')[0].textContent;
                // increase feed number before loading feed again
                feedNumber += 1;
                // load a different feed
                loadFeed(feedNumber, function() {
                    // save text in new header-title class
                    newHeaderTitle = document.getElementsByClassName('header-title')[0].textContent;
                    done();
                });
            });


            // expect new header to be different from old header
            expect(oldHeaderTitle).not.toEqual(newHeaderTitle);
        });
    });
}());




















