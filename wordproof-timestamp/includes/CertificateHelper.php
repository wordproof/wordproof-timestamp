<?php

namespace WordProof\includes;

class CertificateHelper {
    private static $default_template = "<p><a class='wordproof-certificate-helper' data-post-id='3' href='CERTIFICATE_URL'>View this content's WordProof Timestamp certificate</a></p>";
    private static $default_url = '#wordproof';

    static public function getCertificateTemplate() {
        $template = self::$default_template;
//        $template = get_option('wordproof_certificate_template', null) ?: self::$default_template;
        return $template;
    }

    static public function getCertificateHtml($postId) {
        $template = self::getCertificateTemplate();
        $html = str_replace('CERTIFICATE_URL', self::$default_url, $template);
        $html = str_replace('POST_ID', $postId, $html);
        return $html;
    }
}
