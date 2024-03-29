<?php
function add_current_cat_class_to_parent($dom, $current_slug) {
    $elements = $dom->getElementsByTagName('a');

    if( $elements->length ){
        foreach ($elements as $node){
            $href = parse_url($node->getAttribute('href'));
            $path = trim($href['path'], '/');

            if( $path === $current_slug ){
                $class = $node->parentNode->getAttribute('class');
                $class .= ' current-cat';
                $node->parentNode->setAttribute('class', $class);
                break;
            }
        }
    }

    return $dom;
}

function custom_render_block_wc_product_categories(string $block_content, array $block): string
{
    if(
        $block['blockName'] !== 'woocommerce/product-categories'
        || is_admin()
        || wp_is_json_request()
    ) {
        return $block_content;
    }

    $html = '';

    global $wp;
    $current_slug = trim($wp->request,'/');

    $dom = new DOMDocument();
    $dom->loadHTML( '<meta http-equiv="content-type" content="text/html; charset=utf-8">' . $block_content);
    $elements = $dom->getElementsByTagName('li');

    if( $elements->length ){
        foreach ($elements as $node){
            $inner_ul = $node->getElementsByTagName('ul');
            if ($inner_ul->length > 0) {
                $node->setAttribute('class', 'cat-parent');
                $inner_ul_item = $inner_ul->item(0);
                $inner_ul_item->setAttribute('class', 'children');
            }
        }
    }

    // Add current-cat class to parent li
    $dom = add_current_cat_class_to_parent($dom, $current_slug);

    $html .= "<div class='block-outer-wrapper'>";
    $html .= "<header><h3 class='widget-title'>" . __('Categories','woocommerce') . "</h3></header>";
    $html .= $dom->saveHTML();
    $html .= "</div>";

    return $html;
}
add_filter('render_block', 'custom_render_block_wc_product_categories', 10, 2);
