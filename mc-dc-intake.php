<?php
/**
 * Plugin Name: Mining Cluster — Исходные данные ЦОДа
 * Description: Адаптивная анкета проекта ЦОДа. Шорткод [mc_dc_intake].
 * Version: 1.1.9
 * Author: Артём
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Text Domain: mc-dc-intake
 */
defined('ABSPATH') || exit;
define('MCDCI_DIR', plugin_dir_path(__FILE__));
define('MCDCI_URL', plugin_dir_url(__FILE__));
require_once MCDCI_DIR . 'includes/shortcode.php';
require_once MCDCI_DIR . 'includes/translation.php';
function mcdi_schema() {
    return json_decode(file_get_contents(MCDCI_DIR . 'config/fields.json'), true);
}
register_activation_hook(__FILE__, function () {
    if (get_post((int) get_option('mcdi_page_id'))) return;
    $id = wp_insert_post(array('post_title' => 'Запрос на проектирование и строительство ЦОД', 'post_name' => 'dc-project', 'post_content' => '[mc_dc_intake]', 'post_type' => 'page', 'post_status' => 'publish'), true);
    if (!is_wp_error($id)) { update_option('mcdi_page_id', $id); update_post_meta($id, '_mcdi_noindex', 'yes'); }
});
function mcdi_is_form_page() {
    if (!is_singular()) return false;
    $post = get_queried_object();
    return (int) get_option('mcdi_page_id') === (int) $post->ID || get_post_meta($post->ID, '_mcdi_noindex', true) === 'yes' || has_shortcode($post->post_content, 'mc_dc_intake') || strpos((string) get_post_meta($post->ID, '_elementor_data', true), '[mc_dc_intake') !== false;
}
add_filter('wp_robots', function ($robots) {
    if (mcdi_is_form_page()) { $robots['noindex'] = true; $robots['nofollow'] = true; unset($robots['index'], $robots['follow']); }
    return $robots;
}, 99);
add_action('template_redirect', function () { if (mcdi_is_form_page()) header('X-Robots-Tag: noindex, nofollow, noarchive', true); });
