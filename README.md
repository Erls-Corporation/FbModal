FbModal 0.9.3
===============================
This MooTools javascript window modal overlay window is designed to look similar to the modal used by a prominent social networking site.  I like to know who's using my code and if you've encountered any problems, love it, hate it, or want me to add more to it.  So a drop a comment on my <a href="http://blog.cnizz.com/tag/fbmodal/">blog post</a>.

![Screenshot](http://www.cnizz.com/mootools/fb-modal/fbmodal.png)


How to use
----------------------

This MooTools javascript window modal overlay window is designed to look similar to the modal used by a prominent social networking site. 
I had been using the awesome MochaUI for modals, but I decided to develop my own lightweight solution after reading this blog post by David Walsh. 
I based the CSS and functionality off of his original code, but I enhanced the javascript by making it object oriented and leveraging mootools 
to create the DOM elements on the fly. I also added a few other helpful methods. It uses mootools 1.2.4 and has not been tested with other 
versions of mootools. It works well enough in most browsers (tested in FireFox, Chrome, and IE 8).  There are known issues with IE6 and IE7, the 
issues are FbModal does not work.  I'm working on getting an environment for IE6/7 testing, but until then I'd appreciate some help on that.

Add in the HTML

	<script type="text/javascript" src="/js/mootools-1.2.4-core.js"></script>
	<link rel="stylesheet" media="screen" href="/mootools/fb-modal/style.css" type="text/css">
	<script type="text/javascript" src="/mootools/fb-modal/FbModal.class.js"></script>

Construct the Object

	var modal;
			 
	window.addEvent('domready',function(){
		modal = new FbModal({
			'parentEl': 'Content',
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
		'parentEL': 'Content',
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
 
	$('SaveUser').addEvent('click',function(){
		new Request({
		    url: location.href,
		    method: 'get',
		    onComplete: function(){
				// blah some code
		    }
		}).send('action=SaveUser');
	})
		
<<<<<<< HEAD
Additional documentation is available via my blog http://blog.cnizz.com/tag/fbmodal/
=======
Additional documentation is available via my blog <a href="http://blog.cnizz.com/tag/fbmodal/">http://blog.cnizz.com/tag/fbmodal/</a>
>>>>>>> 14f3d61f1650af21a768778127c9657070b55df9
