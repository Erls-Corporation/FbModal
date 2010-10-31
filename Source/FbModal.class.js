/*
---
script: FbModal.class.js
description: This MooTools based modal overlay window is designed to look similar to the modal used by a prominent social networking site.
license: MIT-style
authors:
- Chris Nizzardini @cnizzdotcom www.cnizz.com
- KJ Ye @kjy112
requires:
- core/1.2.4 or higher
provides: [modal]
...
*/

var FbModal = new Class({
	Implements: [Options],
	options:{
		parentEl: '',
		title: '',
		subTitle: '', 
		content: '',
		height: 600, 
		width: 800,
		closeButton: true
	},
	initialize: function(options){
		this.setOptions(options);
		this.SaveButtonId = '';
		this.drawModal();
	},
	drawModal: function(){
		//creates the inner structure of the FbModal with a table consists of three rows
		var modalInnerTable = new Element('table', {
			'class':'pop_dialog_table',
			'id':'fb-pop_dialog_table'
		});
		var modalTableTop = "<tr id='fb-tr1'><td class='pop_topleft'></td><td class='pop_border pop_top'></td><td class='pop_topright'></td></tr>";
		var modalTableMiddle = "<tr id='fb-tr2'><td class='pop_border pop_side'></td><td class='pop_content' id='pop_content'><h2 class='dialog_title' id='ModalTitle'>My Modal</h2><div class='dialog_content' id='dialog_content'><div class='dialog_summary' id='ModalSubTitle'></div><div class='dialog_body' id='dialog_content_wrapper'><div class='ubersearch search_profile' id='uber_content_wrapper'><div class='result clearfix' id='ModalContent'></div></div></div><div class='dialog_buttons' id='dialog_buttons'></div></div</td><td class='pop_border pop_side'></td></tr>";
		var modalTableBottom = "<tr id='fb-tr3'><td class='pop_bottomleft'></td><td class='pop_border pop_bottom'></td><td class='pop_bottomright'></td></tr>";

		//inject rows into table
		modalInnerTable.set('html', modalTableTop + modalTableMiddle + modalTableBottom);

		var modalInnerWrap = new Element('div',{
			'class' : 'generic_dialog_popup', 
			'id' : 'fb-modal2'
		});

		//injects the inner table into the inner wrapper
		modalInnerTable.inject(modalInnerWrap);

		// create surounding divs
		if(typeof(this.options.parentEl)=='string'){
			var ModalElement = new Element('div',{
				'class' : 'generic_dialog', 
				'id' : 'fb-modal'
			}).inject($(this.options.parentEl),'bottom');
		} else if(typeof(this.options.parentEl)=='object'){
			var ModalElement = new Element('div',{
				'class' : 'generic_dialog', 
				'id' : 'fb-modal'
			}).inject(this.options.parentEl,'bottom');
		}

		//inject modalInnerWrap into ModalElement (outer wrapper)
		modalInnerWrap.inject(ModalElement);

		$('fb-modal').setStyles({
			opacity:0,
			display:'block'
		});

		//setting initial options
		this.setTitle(this.options.title);
		this.setContent(this.options.content);
		$('ModalContent').setStyles({'height':this.options.height+'px', 'overflow-y':'auto'});
		this.setSubTitle(this.options.subTitle);

		$('fb-modal').set({
			'styles': 
				{'margin-top' : window.getScroll().y+25,
				'display' : 'block'
			}
		});
		$('fb-pop_dialog_table').set({
			'styles': 
				{'width' : this.options.width+'px'
			}
		});
		$('fb-modal').fade('in');

		if(this.options.closeButton){
			this.createCloseButton();
		}

		// prevents modal from overflowing the x and y screen
		var winSize = $(document.body).getSize();
		var modalSize = $('fb-pop_dialog_table').getSize();

		var yOffset = (modalSize.y+55) - winSize.y;
		var xOffset = (modalSize.x+55) - winSize.x;
		var uberSize = $('uber_content_wrapper').getSize();

		if(yOffset > 0){
			$('uber_content_wrapper').setStyle('height', uberSize.y-(yOffset+5));
		}
		if(xOffset > 0){
			$('uber_content_wrapper').setStyle('width', uberSize.x-(xOffset+185));
		}
		//alert(xOffset+' '+yOffset);
	},
	createCloseButton: function(){
		// modal footer
		new Element('input',{
			'type' : 'button',
			'id' : 'FbClose',
			'value' : 'Close',
			'events' : {
				'click' : function(){
					$('fb-modal').fade('out');
					$('fb-modal').destroy();
				}
			}
		}).inject($('dialog_buttons'),'top');
	},
	/**
	 * createSaveButton
	 * @param id(str),value(str)
	 * @return void
	 */
	createSaveButton: function(id,value){
		if(value == undefined){
			value = 'Save';
		}

		new Element('input',{
			'type' : 'button',
			'id' : id, 
			'value' : value
		}).inject($('dialog_buttons'),'bottom');

		this.SaveButtonId = id;
	},
	destroySaveButton: function(){
		try{
			$(this.SaveButtonId).destroy();
		}
		catch(err){}
	},
	setTitle: function(str){
		$('ModalTitle').set('html', str);
	},
	setSubTitle: function(str){
		$('ModalSubTitle').set('html', str);
	},
	setContent: function(str){
		$('ModalContent').set('html', str);
	},
	isModalVisible: function(){
		if($('fb-modal')){
			return 1;
		}
		else{
			return 0;
		}
	},
	/**
	 * destroy: destroys this instance of facebook modal
	 * @param void
	 * @return void
	 */
	destroy: function(){
		try{
			$('fb-modal').fade('out');
		}
		catch(err){}

		try{
			$('fb-modal').destroy();
		}
		catch(err){}

		this.isVisible = 0;
	}
});
