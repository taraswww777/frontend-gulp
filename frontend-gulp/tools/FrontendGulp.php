<?php

if (!defined('frontendGulpPublicPath')) {
	// Абсолютный путь до публичной дирректории
	define('frontendGulpPublicPath', dirname(dirname(__DIR__)) . '/www');
}

if (!defined('frontendGulpPublicUrl')) {
	// путь от публичной дирректории до сгенерированных файлов
	define('frontendGulpPublicUrl', '/dist');
}


/**
 * Class FrontendGulp
 *
 */
class FrontendGulp
{
	private $manifest = [];
	private static $_instance;

	private function __construct()
	{
	}

	protected function __clone()
	{
	}

	public static function getInstance()
	{
		if (null === self::$_instance) self::$_instance = new self();
		return self::$_instance;
	}

	private function loadManifest($typeManifest = 'css')
	{
		if (empty($this->manifest[$typeManifest])) {

			$path = frontendGulpPublicPath . frontendGulpPublicUrl . '/manifest/' . $typeManifest . '.json';
			if (file_exists($path)) {
				$this->manifest[$typeManifest] = json_decode(file_get_contents($path), true);
			}
		}
	}

	public function urlCss($point = 'index')
	{
		$typeManifest = 'css';
		$this->loadManifest($typeManifest);
		if (!empty($this->manifest[$typeManifest][$point . '.css'])) {
			$file = $this->manifest[$typeManifest][$point . '.css'];
		} else {
			$file = $point . '.css';
		}
		return frontendGulpPublicUrl . '/' . $typeManifest . '/' . $file;
	}

	public function urlJs($point = 'index')
	{
		$typeManifest = 'js';
		$this->loadManifest($typeManifest);
		if (!empty($this->manifest[$typeManifest][$point . '.js'])) {
			$file = $this->manifest[$typeManifest][$point . '.js'];
		} else {
			$file = $point . '.js';
		}
		return frontendGulpPublicUrl . '/' . $typeManifest . '/' . $file;
	}
}
