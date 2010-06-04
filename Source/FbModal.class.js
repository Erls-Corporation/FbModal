var FbModal = new Class({
	Implements: [Options],
	options:{
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
		// create surounding divs
		var ModalElement = new Element('div',{
			'class' : 'generic_dialog', 
			'id' : 'fb-modal'
		}).inject($('Content'),'bottom');
		
		new Element('div',{
			'class' : 'generic_dialog_popup', 
			'id' : 'fb-modal2'
		}).inject($('fb-modal'),'top');
		
		// create table
		new Element('table',{
			'class' : 'pop_dialog_table', 
			'id' : 'fb-pop_dialog_table'
		}).inject($('fb-modal2'),'top');
		
		
		$('fb-modal').setStyles({
			opacity:0,
			display:'block'
		});
		
		// third row
		new Element('tr',{
			'class' : '', 
			'id' : 'fb-tr3'
		}).inject($('fb-pop_dialog_table'),'top');
		
		new Element('td',{
			'class' : 'pop_bottomright'
		}).inject($('fb-tr3'),'top');
		
		new Element('td',{
			'class' : 'pop_border pop_bottom'
		}).inject($('fb-tr3'),'top');
		
		new Element('td',{
			'class' : 'pop_bottomleft'
		}).inject($('fb-tr3'),'top');
		
		// second row
		new Element('tr',{
			'class' : '', 
			'id' : 'fb-tr2'
		}).inject($('fb-pop_dialog_table'),'top');
		
		new Element('td',{
			'class' : 'pop_border pop_side'
		}).inject($('fb-tr2'),'top');
		
		new Element('td',{
			'class' : 'pop_content',
			'id' : 'pop_content'
		}).inject($('fb-tr2'),'top');
		
		// title	
		new Element('h2',{
			'class' : 'dialog_title',
			'id' : 'pop_content',
			'text' : this.options.title 
		}).inject($('pop_content'),'top');
		
		// modal body
		new Element('div',{
			'class' : 'dialog_content',
			'id' : 'dialog_content' 
		}).inject($('pop_content'),'bottom');
		
		// sub title	
		new Element('div',{
			'class' : 'dialog_summary',
			'id' : 'ModalSubTitle',
			'html' : this.options.subTitle 
		}).inject($('dialog_content'),'top');
		
		// modal content wrapper
		new Element('div',{
			'class' : 'dialog_body',
			'id' : 'dialog_content_wrapper'
		}).inject($('dialog_content'),'bottom');
		
		// modal content uber wrapper
		new Element('div',{
			'class' : 'ubersearch search_profile',
			'id' : 'uber_content_wrapper'
		}).inject($('dialog_content_wrapper'),'bottom');
		
		// finally the real content area
		new Element('div',{
			'class' : 'result clearfix',
			'id' : 'ModalContent',
			'html' : this.options.content,
			'styles': 
				{'height' : this.options.height+'px',
				'overflow-y' : 'auto'
				}
		}).inject($('uber_content_wrapper'),'bottom');
		
		// modal footer
		new Element('div',{
			'class' : 'dialog_buttons',
			'id' : 'dialog_buttons',
			'html' : ''
		}).inject($('dialog_content'),'bottom');
		
/*		$(document).addEvent('click',function(e) { 
			try{
				if($('fb-modal').get('opacity') == 1 && !e.target.getParent('.generic_dialog')) { 
					$('fb-modal').fade('out');
					$('fb-modal').destroy();
				}
			}
			catch(err){}
		});*/
		
		new Element('td',{
			'class' : 'pop_border pop_side'
		}).inject($('fb-tr2'),'top');	
		
		// first row
		new Element('tr',{
			'class' : '', 
			'id' : 'fb-tr1'
		}).inject($('fb-pop_dialog_table'),'top');
		
		new Element('td',{
			'class' : 'pop_topright'
		}).inject($('fb-tr1'),'top');
		
		new Element('td',{
			'class' : 'pop_border pop_top'
		}).inject($('fb-tr1'),'top');
		
		new Element('td',{
			'class' : 'pop_topleft'
		}).inject($('fb-tr1'),'top');
		
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
		$('pop_content').innerHTML = str;
	},
	setSubTitle: function(str){
		$('ModalSubTitle').innerHTML = str;
	},
	setContent: function(str){
		$('ModalContent').innerHTML = str;
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