<?php

$finder = PhpCsFixer\Finder::create()
    ->exclude('somedir')
    ->notPath('resources/Symfony/Component/Translation/Tests/fixtures/resources.php')
    ->in(__DIR__)
;

$config = new PhpCsFixer\Config();
return $config->setRules([
	'@PHP71Migration:risky' => true,
	'@PSR12' => true,
    '@PhpCsFixer:risky' => true,
    'array_syntax' => ['syntax' => 'short'],
])->setFinder($finder);
