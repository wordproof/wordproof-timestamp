<?php

namespace WordProof\includes;

class CertificateHelper {
    private static $default_template = "<p><a target='_blank' href='CERTIFICATE_URL'>View this content's WordProof Blockchain Certificate</a></p>";

    static public function getCertificateTemplate() {
        $template = get_option('wordproof_certificate_template', null) ?: self::$default_template;
        return $template;
    }

    static public function getCertificate($url) {
        $template = self::getCertificateTemplate();
        return str_replace('CERTIFICATE_URL', $url, $template);
    }
}
