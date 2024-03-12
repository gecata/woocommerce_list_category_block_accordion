var $j = jQuery.noConflict();

$j( document ).ready( function() {
    "use strict";
    // Woo categories widget
    CCWooCategoriesWidget();
} );

/* ==============================================
WOOCOMMERCE CATEGORIES WIDGET
============================================== */
function CCWooCategoriesWidget() {
    "use strict";
    
    $j( '.wc-block-product-categories-list--depth-0' ).each( function() {
        var IconDown    = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>';
        var IconUp      = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>';
        
        $j( this ).find( 'li' ).has( '.children' ).has( 'ul' ).prepend( '<div class="open-this">'+ IconDown +'</div>' );
        $j( this ).find( '.open-this' ).on( 'click', function(){
            if ( $j( this ).parent().hasClass( 'opened' ) ) {
                $j( this ).html( IconDown ).parent().removeClass( 'opened' ).find( '> ul' ).slideUp( 200 );
            } else {
                $j( this ).html( IconUp ).parent().addClass( 'opened' ).find( '> ul' ).slideDown( 200 );
            }
        } );

        // Add "opened" class to the current category item or its parent
        if ($j(this).find('li.current-cat').length > 0 || $j(this).find('li.current-cat').parents('li.cat-parent').length > 0) {
            $j(this).find('li.current-cat').addClass('opened').find('> ul').show();
            $j(this).find('li.current-cat').parents('li.cat-parent').addClass('opened').find('> ul').show();
        }
    } );
}
