/*!
 * jQuery Print Previw Plugin v1.0.1
 *
 * Copyright 2011, Tim Connell
 * Licensed under the GPL Version 2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Jan 25 00:00:00 2012 -000
 */
 
(function($) { 
    
	// Initialization
	$.fn.printPreview = function() {
		this.each(function() {
			$(this).on('click', function(e) {
			    e.preventDefault();
		            $.printPreview.loadPrintPreview();
			});
		});
		return this;
	};
    
    // Private functions
    $.printPreview = {
        loadPrintPreview: function() {
            // Declare DOM objects
            
            var printPreviewWindow = window.open("", 'printpreview');
            
            printPreviewWindow.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' + 
                '<head><title>' + window.document.title + '</title></head>' +
                '<body></body>' +
                '</html>');
           
            // Grab contents and apply stylesheet
            var $iframe_head = $('head link').clone(),
                $iframe_body = $('body > :not(script)').clone();
            
            if (!$.browser.msie && !($.browser.version < 7) ) {
                $('head', printPreviewWindow).append($iframe_head);
                $('body', printPreviewWindow).append($iframe_body);
            }
            else {
                $('body > :not(script)').clone().each(function() {
                    $('body', printPreviewWindow).append(this.outerHTML);
                });
                $('head link').each(function() {
                    $('head', printPreviewWindow).append($(this).clone()[0].outerHTML);
                });
            }
            
            // Disable all links
            $('a', printPreviewWindow).bind('click.printPreview', function(e) {
                e.preventDefault();
            });
            
            // Introduce print styles
            $('head').append('<style type="text/css">' +
            	'@import "print.css"' +
		'#preview-message {' +
		' 	display:block !important;' +
		'	border:1px solid #666;' +
		'	background:#FF6;' +
		'	padding:2px 5px;' +
		'}'
                '</style>'
            );

    	}
    }
})(jQuery);