<?php
defined('WP_UNINSTALL_PLUGIN') || exit;
delete_option('mcdi_recipient');
delete_option('mcdi_page_id');
// Keep the page and its noindex metadata: deleting a plugin must not delete user content.
