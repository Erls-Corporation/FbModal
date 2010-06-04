FbModal 0.9.1
===============================
This MooTools javascript window modal overlay window is designed to look similar to the modal used by a prominent social networking site.

![Screenshot](http://www.cnizz.com/mootools/fb-modal/fbmodal.png)

How to use
----------------------

This MooTools javascript window modal overlay window is designed to look similar to the modal used by a prominent social networking site. 
I had been using the awesome MochaUI for modals, but I decided to develop my own lightweight solution after reading this blog post by David Walsh. 
I based the CSS and functionality off of his original code, but I enhanced the javascript by making it object oriented and leveraging mootools 
to create the DOM elements on the fly. I also added a few other helpful methods. It uses mootools 1.2.4 and has not been tested with other 
versions of mootools. It works well enough in most browsers (tested in FireFox, Chrome, and IE). Click here to view the demo. Lets get started.</p>

Add in the HTML

			type="text/javascript" src="/js/mootools-1.2.4-core.js"
			link rel="stylesheet" media="screen" href="/mootools/fb-modal/style.css" type="text/css"
			script type="text/javascript" src="/mootools/fb-modal/FbModal.class.js"

Construct the Object

			var modal;
			 
			window.addEvent('domready',function(){
				modal = new FbModal({
					'title': 'My Modal',
					'subTitle': 'This is the FB Modal demo.',
					'content': 'Lorem ipsum dolor sit amet...',
					'height' : 330,
					'width' : 800
				});
			});

The objects constructor automatically creates the modal and displays it. The same modal can subsequently be called like this:

			modal.drawModal();

Changing the title, subtitle, and body

			modal.setTitle('My new title');
			modal.setSubTitle('a new subtitle');
			modal.setContent('Some new content');

Save and Close buttons plus destroy

By default the modal will create a close button. You can override this in the constructors options by setting closeButton: false.


			modal.createCloseButton(); // creates a close button
			modal.createSaveButton('SaveButtonId','Save Button Value'); // creates a save button with id: SaveButtonId and value: Save Button Value
			modal.destroy(); // destroys/hides the modal.

Creating a new modal while one is open


			if(typeof(modal) == 'object'){
				modal.destroy();
			}
 
			modal = new FbModal({
				'title': 'New Email',
				'subTitle': 'Recently retrieved from email server',
				'content': this.response.text,
				'height' : 330,
				'width' : 800
			});

Changing content and what the Save button does

			modal.setContent(this.response.text);
			modal.destroySaveButton();
			modal.createSaveButton('SaveUser','Add User');
 
			// save new user via xhr
			$('SaveUser').addEvent('click',function(){
				new Request({
				    url: location.href,
				    method: 'get',
				    onComplete: function(){
						// blah some code
				    }
				}).send('action=SaveUser');
			})
