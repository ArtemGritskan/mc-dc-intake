<?php
defined('ABSPATH') || exit;
add_shortcode('mc_dc_intake', function () {
    wp_enqueue_style('mcdi-form', MCDCI_URL . 'assets/form.css', array(), '1.1.5');
    wp_enqueue_script('mcdi-pdf-lib', MCDCI_URL . 'assets/vendor/pdf-lib.min.js', array(), '1.17.1', true);
    wp_enqueue_script('mcdi-fontkit', MCDCI_URL . 'assets/vendor/fontkit.min.js', array(), '1.1.1', true);
    wp_enqueue_script('mcdi-font', MCDCI_URL . 'assets/vendor/font.js', array(), '1.1.5', true);
    wp_enqueue_script('mcdi-pdf', MCDCI_URL . 'assets/pdf.js', array('mcdi-pdf-lib', 'mcdi-fontkit', 'mcdi-font'), '1.1.5', true);
    wp_enqueue_script('mcdi-form', MCDCI_URL . 'assets/form.js', array('mcdi-pdf'), '1.1.5', true);
    wp_localize_script('mcdi-form', 'MCDCI_CONFIG', array('schema' => mcdi_schema()));
    return '<div class="mcdi" data-mcdi></div><noscript>Для заполнения анкеты включите JavaScript в браузере.</noscript>';
});
