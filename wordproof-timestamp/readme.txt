=== WordProof Timestamp ===
Contributors: wordproof
Tags: blockchain, timestamp, eosio, eos, telos, web30, copyright, scatter, decentralisation, proof
Requires at least: 4.6
Tested up to: 5.6
Requires PHP: 5.6
Stable tag: 2.9.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Timestamp your WordPress content on the blockchain for protection and trust. No blockchain knowledge required.

== Description ==

### WordProof: Timestamp your WordPress Content on the Blockchain

With WordProof Timestamp, you can timestamp your WordPress content on any EOSIO blockchain from the comfort of your WordPress site. No prior blockchain experience necessary. After the set-up, everything is taken care of automatically!

### Why do I need to timestamp my content?

WordProof Timestamp does everything in its power to bring the benefits of blockchain to your WordPress website. Here are some reasons why you should timestamp your content:

- Copyright protection
- Transparency: increase trust and claim authenticity
- Next-generation SEO benefits
- Proof of existence at certain moments in time
- Prepare for upcoming EU regulations
- Be your own notary

### Features

- Automatically timestamp your content on the blockchain
- Show the blockchain certificate pop-up on your website
- Let your visitors verify when and how your content changed
- Downloadable blockchain certificate as proof of existence
- Copyright Infringement Claim Tools

### How does WordProof Timestamp work?

Timestamping creates a unique and universal fingerprint (the 'hash') for all your posts, pages and media files. If the input changes, the hash becomes totally different.

This hash is added to the blockchain with a date and time. Because you (the website owner) have the input that results in this specific hash, you can prove that you published the content at that point in time.

### Further Reading on WordProof, WordPress, and Blockchain

For more info on WordProof, WordPress, and Blockchain, check out the following:

* The [WordProof Plugin official homepage](https://wordproof.io/ "WordProof: The WordPress Timestamp Plugin").
* [WordPress and Blockchain – The Manifest for a 100% Open Source Future](https://medium.com/wordproof "WordProof: WordPress and Blockchain") by Sebastiaan van der Lans.
* Join the [WordProof Telegram](https://t.me/WordProof) for feedback, updates and support.

Special thanks to the Telos Foundation for co-funding a first version WordProof via their [Worker Proposal System](https://medium.com/wordproof "Truly inclusive Open Source funding via Worker Proposal Systems.").

== Installation ==

=== From within WordPress ===

1. Visit 'Plugins > Add New'
1. Search for 'WordProof'
1. Activate WordProof Timestamp from your Plugins page.
1. Go to "after activation" below.

=== Manually ===

1. Upload the `wordproof-timestamp` folder to the `/wp-content/plugins/` directory
1. Activate the WordProof Timestamp plugin through the 'Plugins' menu in WordPress
1. Go to "after activation" below.

=== After activation ===

1. Launch the Setup Wizard
1. Choose which mode you want to use (manual or automatic)
1. Follow the steps for either mode

== Screenshots ==

1. Timestamp your content automatically, verify the status in the bottom right corner.
2. The pop-up your visitors can use to verify your content.
3. Your visitors can compare different versions, and verify the authenticity.
4. Change the settings in the WordProof Timestamp plugin options panel.

== Changelog ==
= 2.9.2 =
*Release date: January 10th, 2021*
* Happy new year!
* The plugin now adheres to the WordPress Coding Standards

= 2.9.1 =
*Release date: December 29th, 2020*
* Automatic callback url selection

= 2.9.0 =
*Release date: December 22th, 2020*
* Added REST endpoint as alternative to the default method of receiving webhooks
* Bumped dependencies
* Added composer for including libraries
* Fixed various bugs

= 2.8.14 =
*Release date: October 28th, 2020*
* Small enhancements to notices

= 2.8.13 =
*Release date: October 28th, 2020*
* Fix bug with the Bulk timestamp module

= 2.8.12 =
*Release date: October 8th, 2020*
* WordProof column is hidden by default for some post types
* Timestamp counter is hidden for users without publishing rights
* Bulk timestamping posts has received some small enhancements
* Various bugfixes and enhancements

= 2.8.11 =
*Release date: September 27th, 2020*
* Support for bulk stamping every post type

= 2.8.10 =
*Release date: September 4th, 2020*
* Support for Custom Post Types
* Fix for Firefox users

= 2.8.9 =
*Release date: September 3rd, 2020*
* Fix for sites running PHP < 7.0

= 2.8.8 =
*Release date: September 3rd, 2020*
* Fix for some urls to wordproof.io

= 2.8.7 =
*Release date: September 2nd, 2020*
* Fix small visual bugs

= 2.8.6 =
*Release date: August 4th, 2020*
* Add support for Ethereum
* Fix user interface bugs

= 2.8.5 =
*Release date: August 4th, 2020*
* Implemented code style ruleset

= 2.8.4 =
*Release date: June 2nd, 2020*
* Added frontend performance enhancements!
* Fixed a Gutenberg related bug

= 2.8.3 =
*Release date: May 28th, 2020*
* Fix for using WordProof Timestamp with Scatter

= 2.8.2 =
*Release date: May 14th, 2020*
* Updated readme and plugin repository assets

= 2.8.1 =
*Release date: May 12th, 2020*
* Fix when using the classic editor

= 2.8.0 =
*Release date: May 8th, 2020*
* Added performance optimizations
* Display background tasks more prominently
* Various small improvements to the user interface
* Fixed minor bugs

= 2.7.3 =
*Release date: May 4th, 2020*
* Show error if something went wrong creating or sending a transaction to the blockchain

= 2.7.2 =
*Release date: May 4th, 2020*
* Fix: In some cases, selecting to use WordProof manually did not save properly. Thanks for reporting Francesco!

= 2.7.1 =
*Release date: April 21st, 2020*
* Various small improvements to the user interface

= 2.7.0 =
*Release date: February 29th, 2020*
* Improvements to the authentication
* Added a log for most recent timestamped items
* Improved error logging

= 2.6.2 =
*Release date: February 18th, 2020*
* Added a logger for errors
* Added information to Site Health
* Updated license to GPL 3.0

= 2.6.1 =
*Release date: February 10th, 2020*
* Small improvements and bug fixes

= 2.6.0 =
*Release date: February 8th, 2020*
* We are now using a new authentication method for a more secure connection
* We now support timestamping WooCommerce products
* Added options to sent timestamps to customers when ordering
* MediaObjectTimestamps are now shown on Attachment pages
* Callbacks are now retrieved successfully out-of-the-box for even more server setups
* Fixed small bugs and made various enhancements

= 2.5.3 =
*Release date: February 1st, 2020*
* A fix for automatic stamping

= 2.5.2 =
*Release date: February 1st, 2020*
* We now include the hash in the link to wordproof.io/check
* Small bugfix in properly returning the raw text.

= 2.5.1 =
*Release date: January 22nd, 2020*
* We added support for Edge and IE browsers
* More visual feedback is to different widgets and buttons

= 2.5.0 =
*Release date: January 13th, 2020*
* Happy new year!
* We are now retrieving revisions using a secured endpoint
* Added many enhancements to the UI

= 2.4.0 =
*Release date: December 16th, 2019*
* We have made it way easier to see what is going on.
* Styling enhancements

= 2.3.3 =
*Release date: November 20th, 2019*
* Small fix for inserting the certificate link when a custom DOM selector is used

= 2.3.2 =
*Release date: November 15th, 2019*
* Add option for additional whitelisted IP's for rare server setups
* Small visual enhancements

= 2.3.1 =
*Release date: November 13th, 2019*
* Fixed small bugs
* Add filter 'wordproof_hash_post_content' before hashing the content of ArticleTimestamp

= 2.3.0 =
*Release date: November 12th, 2019*
* Timestamp Standard 0.2.0 is now supported
* Timestamp your Media using the MediaObjectTimestamp standard
* Callback didn't come through? Retry from your the posts overview
* The auto stamper tool is more accessible
* DOM Selector bug is fixed

= 2.2.0 =
*Release date: October 12th, 2019*
* You are now enjoying our new certificate! We've made it compacter and way easier to digest.

= 2.1.0 =
*Release date: October 12th, 2019*
* Thanks to the Pull Request by Tomoharu, GetShifter.io users can now use WordProof by setting their custom domain.

= 2.0.2 =
*Release date: October 5th, 2019*
* Fixed a bug which caused revisions to not show up

= 2.0.1 =
*Release date: October 3rd, 2019*
* Some visual improvements

= 2.0.0 =
*Release date: October 1st, 2019*
* Automate the creation of your timestamp by using my.wordproof.io!
* Overhaul of the plugin options

= 1.2.16 =
*Release date: September 21st, 2019*
* Prepare migration to upgraded WSFY service

= 1.2.15 =
*Release date: September 3rd, 2019*
* Remove Certificate Text from excerpts in rare cases

= 1.2.14 =
*Release date: August 22nd, 2019*
* Allow timestamps to be removed.
* Remove Post Column notice for posts that are not published yet.

= 1.2.13 =
*Release date: August 22nd, 2019*
* Select the post types that are auto-stamped.

= 1.2.12 =
*Release date: August 21st, 2019*
* Remove certificate link from the REST API and RSS feed
* Ensure content is always encoded

= 1.2.11 =
*Release date: August 21st, 2019*
* Remove certificate link from excerpts

= 1.2.10 =
*Release date: August 16th, 2019*
* Various performance and page load improvements

= 1.2.9 =
*Release date: August 16th, 2019*
* Provide an option to hide the WordProof Post Column for logged in users

= 1.2.8 =
*Release date: August 12th, 2019*
* Text in the certificate modal is now translatable

= 1.2.7 =
*Release date: August 8th, 2019*
* Correctly load JS on the autostamp page

= 1.2.6 =
*Release date: August 8th, 2019*
* Display correct blockchain link for with Telos stamped posts

= 1.2.5 =
*Release date: August 7th, 2019*
* Fix migration for legacy WSFY clients.

= 1.2.4 =
*Release date: August 6th, 2019*
* Fix autostamp for large websites.

= 1.2.3 =
*Release date: August 6th, 2019*
* Fix migration for legacy WSFY clients

= 1.2.2 =
*Release date: August 6th, 2019*
* Show certificate content on mount

= 1.2.1 =
*Release date: August 6th, 2019*
* Bugfix: display the timestamp metabox on edit pages

= 1.2.0 =
*Release date: August 5th, 2019*
* Automate your timestamping using WSFY
* Select output location of the certificate link
* Make use of WebArticleTimestamp 0.1.1
* Optimize and restructure code
* Fix for the posts timestamp column indicator

= 1.1.2 =
*Release date: August 4th, 2019*
* Small bug fix to ensure proper encoding of float types

= 1.1.1 =
*Release date: July 12th, 2019*
* Add customization field

= 1.1.0 =
*Release date: July 12th, 2019*
* Implement Timestamp Standard
* Various performance and page load improvements

= 1.0.3 =
*Release date: July 11th, 2019*
* Improved network selection

= 1.0.2 =
*Release date: July 11th, 2019*
* Improvements to the admin area

= 1.0.1 =
*Release date: June 28th, 2019*
* Code Optimization
* Page load Optimization
* Resolving various bugs

= 1.0.0 =
*Release date: June 22nd, 2019*
* Our biggest release yet! Please share your experience with us!

= 0.6.3 =
*Release date: June 4th, 2019*
* Backwards compatibility fix

= 0.6.2 =
*Release date: June 3rd, 2019*
* Small styling fix

= 0.6.1 =
*Release date: May 31st, 2019*
* Bugfix

= 0.6 =
*Release date: May 30th, 2019*
* Redesigned plugin Options
* WordProof Setup Wizard added
* Front-end blockchain certificate

= 0.1 =
*Release date: April 5th, 2019*
* Initial release.
